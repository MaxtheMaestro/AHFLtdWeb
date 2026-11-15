import assert from 'node:assert/strict'
import { after, test } from 'node:test'
import { readFile, readdir, mkdtemp, mkdir, rm } from 'node:fs/promises'
import { PassThrough } from 'node:stream'
import { build, createServer } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { renderToPipeableStream, renderToStaticMarkup } from 'react-dom/server'
import { createElement } from 'react'

const expectedSections = [
  ['who-we-are', 'Who We Are'], ['information-collected', 'Personal Information We Collect'],
  ['purposes', 'Why We Use Information'], ['lawful-processing', 'Lawful and Fair Processing'],
  ['service-providers', 'Service Providers and Disclosures'], ['international-processing', 'International Processing'],
  ['retention-deletion', 'Retention and Deletion'], ['security', 'Security'],
  ['sensitive-information-children', 'Sensitive Information and Children'], ['cookies-external-links', 'Cookies and External Links'],
  ['privacy-rights', 'Your Privacy Rights'], ['changes-contact', 'Changes and Contact Details'],
]
const servers = []
const cacheDirs = []
async function modules(formId = '', published = false, development = false) {
  await mkdir('tmp', { recursive: true })
  const cacheDir = await mkdtemp('tmp/ahf-privacy-tests-')
  cacheDirs.push(cacheDir)
  const server = await createServer({
    cacheDir,
    mode: 'production',
    server: { middlewareMode: true, watch: null, hmr: false, ws: false },
    optimizeDeps: { noDiscovery: true, include: [] },
    plugins: [{ name: 'test-config', enforce: 'pre', transform(code, id) {
      if (id.endsWith('.tsx')) return code.replaceAll('import.meta.env.DEV', String(development))
        .replace('false || __PRIVACY_POLICY_RELEASED__', String(published))
      if (id.endsWith('/config/forms.ts')) return code.replace('import.meta.env.VITE_TALLY_CONTACT_FORM_ID', JSON.stringify(formId))
      if (id.endsWith('/config/privacy.ts')) return code.replace(/export const policyPublished = [^\n]+/, `export const policyPublished = ${published}`)
    } }],
  })
  servers.push(server)
  return server
}
after(async () => {
  await Promise.all(servers.map(server => server.close()))
  await Promise.all(cacheDirs.map(path => rm(path, { recursive: true, force: true })))
})
async function renderPage(Component) {
  const output = new PassThrough()
  const rendered = renderToPipeableStream(createElement(Component), {
    onAllReady() { rendered.pipe(output) },
    onError(error) { output.destroy(error) },
  })
  let html = ''
  for await (const chunk of output) html += chunk.toString()
  return html
}
const server = await modules()
const tally = await server.ssrLoadModule('/src/lib/forms/tally.ts')
const config = await server.ssrLoadModule('/src/config/privacy.ts')
const { privacyPolicySections } = await server.ssrLoadModule('/src/content/privacy-policy.ts')
const completePolicy = {...config.privacyPolicy, sections:privacyPolicySections}

test('provider rejects missing, blank and malformed IDs', () => {
  for (const formId of [undefined, '', ' ', '../other', 'a?email=private']) assert.equal(tally.getTallyProvider({ type: 'tally', formId }), null)
  assert.equal(tally.getTallyProvider({ type: 'tally', formId: ' 5BJ8aP ' }).formId, '5BJ8aP')
})
test('embed URL retains configured responsive options without page query data', () => {
  const url = new URL(tally.buildTallyEmbedUrl('5BJ8aP', { dynamicHeight: true, hideTitle: true, alignLeft: true, transparentBackground: true }))
  assert.equal(url.origin, 'https://tally.so')
  assert.equal(url.searchParams.get('dynamicHeight'), '1')
  assert.equal(url.searchParams.size, 4)
})
test('missing provider renders truthful alternatives without a local form or success', async () => {
  const { ContactForm } = await server.ssrLoadModule('/src/components/domain/contact-form.tsx')
  const html = renderToStaticMarkup(createElement(ContactForm))
  assert.match(html, /currently unavailable/)
  assert.match(html, /mailto:agapehopeja@gmail.com/)
  assert.match(html, /https:\/\/tally.so\/r\/5BJ8aP/)
  assert.doesNotMatch(html, /<form|<iframe|<script|information has been received|Privacy Policy<\/a>/)
})
test('configured provider shows Part C notice and load control before any iframe or script', async () => {
  const configured = await modules('5BJ8aP')
  const { ContactForm } = await configured.ssrLoadModule('/src/components/domain/contact-form.tsx')
  const html = renderToStaticMarkup(createElement(ContactForm))
  for (const phrase of ['Load Contact Form', 'processed through Tally', 'transferred to Notion', 'outside Jamaica', 'unrelated marketing']) assert.ok(html.includes(phrase))
  assert.doesNotMatch(html, /type="checkbox"|<iframe|<script|<form/)
})
test('held policy route and navigation expose no policy content in production', async () => {
  const { default: Page } = await server.ssrLoadModule('/src/pages/privacy-policy.tsx')
  const { PrivacyLink } = await server.ssrLoadModule('/src/components/layout/privacy-link.tsx')
  const html = renderToStaticMarkup(createElement(Page))
  assert.match(html, /Page unavailable/)
  assert.doesNotMatch(html, /Who We Are|development preview|DRAFT ONLY/)
  assert.equal(renderToStaticMarkup(createElement(PrivacyLink)), '')
})
test('published policy renders 12 sections, dates and permanent link without internal material', async () => {
  const published = await modules('', true)
  const { default: Page } = await published.ssrLoadModule('/src/pages/privacy-policy.tsx')
  const { PrivacyLink } = await published.ssrLoadModule('/src/components/layout/privacy-link.tsx')
  const html = await renderPage(Page)
  for (const [id, title] of expectedSections) {
    assert.ok(html.includes(title))
    assert.ok(html.includes(`href="#${id}"`))
  }
  assert.match(html, /dateTime="2026-11-16"/)
  assert.match(html, /dateTime="2026-10-25"/)
  assert.match(html, /November 16, 2026|16 November 2026/)
  assert.equal(/\bdraft\b|development preview|Publication blocker|\bINSERT\b|must be confirmed|before publication|2026-11-30/i.test(html), false)
  assert.match(renderToStaticMarkup(createElement(PrivacyLink)), /href="\/privacy-policy"/)
})
test('helper loads once, reports failure, and permits a later retry', async () => {
  const appended = []
  globalThis.window = { setTimeout, clearTimeout }
  globalThis.document = { createElement: () => ({ remove() {} }), body: { appendChild: script => appended.push(script) } }
  const first = tally.loadTallyEmbedScript()
  assert.equal(tally.loadTallyEmbedScript(), first)
  assert.equal(appended.length, 1)
  assert.equal(appended[0].referrerPolicy, 'no-referrer')
  const failed = assert.rejects(first, /Tally helper unavailable/)
  appended[0].onerror()
  await failed
  const retry = tally.loadTallyEmbedScript()
  let loads = 0
  window.Tally = { loadEmbeds: () => loads++ }
  appended[1].onload()
  await retry
  assert.equal(loads, 1)
  delete globalThis.window
  delete globalThis.document
})
test('production output excludes internal text, demonstration and obsolete persistence', async () => {
  const files = await readdir('dist/assets')
  const js = (await Promise.all(files.filter(name => name.endsWith('.js')).map(name => readFile(`dist/assets/${name}`, 'utf8')))).join('\n')
  assert.doesNotMatch(js, /DRAFT ONLY|editorial instructions|Demonstration only|agape-hope-anniversary-confetti-seen-v1|localStorage|Your information has been received|Publication blocker:/)
  const deployment = JSON.parse(await readFile('vercel.json', 'utf8'))
  assert.equal(deployment.rewrites[0].source, '/privacy-policy')
  assert.equal(deployment.rewrites[0].destination, '/privacy-policy.html')
  assert.ok(deployment.headers[0].headers.some(header => header.key === 'Content-Security-Policy-Report-Only'))
})
test('Part B retains 12 sections and substantive commitments with only approved instruction removals', () => {
  assert.deepEqual(privacyPolicySections.map(section => [section.id, section.title]), expectedSections)
  assert.equal(privacyPolicySections[2].bullets.length, 6)
  assert.match(privacyPolicySections[6].paragraphs[0], /Retention periods or documented retention criteria will be adopted/)
  assert.match(privacyPolicySections[10].paragraphs[0], /statutory remedies or controls/)
  assert.doesNotMatch(JSON.stringify(privacyPolicySections), /must be confirmed|before publication|reviewNotes|INSERT/)
  assert.equal(completePolicy.effectiveDate, '2026-11-16')
  assert.equal(completePolicy.lastUpdated, '2026-10-25')
  assert.equal(completePolicy.telephone, null)
})
test('factual and content checks reject missing facts, invalid dates, incomplete sections and draft instructions', () => {
  const { canPublishPolicy, publicationConfirmations } = config
  assert.equal(canPublishPolicy(completePolicy, publicationConfirmations), true)
  assert.equal(canPublishPolicy(completePolicy, {}), false)
  assert.equal('finalWording' in publicationConfirmations, false)
  for (const key of Object.keys(publicationConfirmations)) assert.equal(canPublishPolicy(completePolicy, {...publicationConfirmations, [key]:false}), false, key)
  for (const patch of [{effectiveDate:null}, {lastUpdated:'[Oct.25,2026]'}, {effectiveDate:'2026-02-30'}, {sections:privacyPolicySections.slice(1)}]) assert.equal(canPublishPolicy({...completePolicy,...patch}, publicationConfirmations), false)
  const contaminated = privacyPolicySections.map((section, index) => index === 0 ? {...section, paragraphs:['The legal entity name must be confirmed before publication.']} : section)
  assert.equal(canPublishPolicy({...completePolicy,sections:contaminated},publicationConfirmations),false)
})
test('published footer/form links and policy chrome return to the homepage sections', async () => {
  const published = await modules('5BJ8aP', true)
  const { Footer } = await published.ssrLoadModule('/src/components/layout/footer.tsx')
  const footer = renderToStaticMarkup(createElement(Footer, {homeLinks:true}))
  assert.match(footer, /href="\/privacy-policy"/)
  assert.match(footer, /href="\/#contact"/)
  const { ContactForm } = await published.ssrLoadModule('/src/components/domain/contact-form.tsx')
  assert.match(renderToStaticMarkup(createElement(ContactForm)), /href="\/privacy-policy"/)
  const { default: Page } = await published.ssrLoadModule('/src/pages/privacy-policy.tsx')
  const page = await renderPage(Page)
  assert.match(page, /<header/)
  assert.match(page, /<footer/)
  assert.match(page, /href="\/#programs"/)
})
test('actual production HTML and sitemap agree with the selected build publication mode', async () => {
  const html = await readFile('dist/privacy-policy.html', 'utf8')
  const sitemap = await readFile('dist/sitemap.xml', 'utf8')
  const files = await readdir('dist/assets')
  const js = (await Promise.all(files.filter(name => name.endsWith('.js')).map(name => readFile(`dist/assets/${name}`, 'utf8')))).join('\n')
  assert.match(html, /rel="canonical" href="https:\/\/ahf-ltd-web.vercel.app\/privacy-policy"/)
  if (html.includes('<title>Page unavailable')) {
    assert.match(html, /name="robots" content="noindex, nofollow"/)
    assert.doesNotMatch(sitemap, /privacy-policy/)
    assert.doesNotMatch(js, /Retention periods or documented retention criteria will be adopted|Subject to applicable Jamaican law and relevant exceptions/)
  } else {
    assert.match(html, /<title>Privacy Policy/)
    assert.doesNotMatch(html, /noindex/)
    assert.match(sitemap, /privacy-policy/)
    assert.match(js, /Retention periods or documented retention criteria will be adopted/)
  }
})
test('release is explicit and refused before November 16 in the build date zone', () => {
  const {getReleaseDecision, publicationConfirmations, privacyRelease} = config
  assert.equal(privacyRelease.notBefore, '2026-11-16')
  assert.equal(privacyRelease.timeZone, 'America/Jamaica')
  assert.equal(getReleaseDecision(false,'2026-11-16',completePolicy,publicationConfirmations).published,false)
  assert.equal(getReleaseDecision(true,'2026-11-14',completePolicy,publicationConfirmations).published,false)
  assert.equal(getReleaseDecision(true,'2026-11-15',completePolicy,publicationConfirmations).published,false)
  assert.equal(getReleaseDecision(true,'2026-11-16',completePolicy,publicationConfirmations).published,true)
  assert.equal(getReleaseDecision(true,'2026-11-17',completePolicy,publicationConfirmations).published,true)
  assert.equal(getReleaseDecision(true,'2026-11-16',completePolicy,{}).published,false)
})
test('simulated released build includes policy content and sitemap with no noindex or preview copy', async () => {
  const {createPrivacyBuildPlugin} = await server.ssrLoadModule('/src/lib/privacy-build.ts')
  // In-memory artifact verification only: bypasses no real deployment/date gate.
  const result = await build({configFile:false, logLevel:'silent',
    plugins:[react(),tailwindcss(),createPrivacyBuildPlugin('https://ahf-ltd-web.vercel.app/',true)],
    define:{__PRIVACY_POLICY_RELEASED__:'true','process.env.NODE_ENV':'"production"'},build:{write:false}})
  const assets = result.output
  const html = assets.find(asset => asset.fileName === 'privacy-policy.html').source
  const sitemap = assets.find(asset => asset.fileName === 'sitemap.xml').source
  const js = assets.filter(asset => asset.type === 'chunk').map(asset => asset.code).join('\n')
  assert.match(html, /<title>Privacy Policy/)
  assert.doesNotMatch(html, /noindex/)
  assert.match(sitemap, /https:\/\/ahf-ltd-web.vercel.app\/privacy-policy/)
  assert.match(js, /Retention periods or documented retention criteria will be adopted/)
  assert.equal(/development preview|DRAFT ONLY|Publication blocker:|must be confirmed before publication/.test(js),false)
})
test('canonical origin and policy aliases remain centralized and configurable', async () => {
  const {getSiteUrl} = await server.ssrLoadModule('/src/config/website.ts')
  assert.equal(getSiteUrl(),'https://ahf-ltd-web.vercel.app/')
  assert.equal(getSiteUrl('https://example.org'),'https://example.org/')
  assert.throws(() => getSiteUrl('http://example.org'))
  assert.throws(() => getSiteUrl('https://example.org/path'))
  for (const path of ['/privacy-policy','/privacy-policy/','/privacy-policy.html']) assert.equal(config.isPrivacyPath(path),true)
  assert.equal(config.isPrivacyPath('/'),false)
})
