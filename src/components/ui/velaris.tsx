import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"
import { cn } from "../../lib/utils"
import { usePrefersReducedMotion } from "../../hooks/use-prefers-reduced-motion"

type VelarisProps = {
  bg?: string
  colors?: string[]
  speed?: number
  grain?: boolean
  height?: string
  className?: string
  children?: ReactNode
}

const vertexShader = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const fragmentShader = `
precision mediump float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_color_0;
uniform vec3 u_color_1;
uniform vec3 u_color_2;
uniform vec3 u_color_3;

float blob(vec2 uv, vec2 pos, float radius) {
  float d = length(uv - pos);
  return smoothstep(radius, 0.0, d);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  uv.x *= u_resolution.x / u_resolution.y;
  float t = u_time * 0.18;

  vec3 color = u_color_3;
  float b0 = blob(uv, vec2(0.28 + sin(t) * 0.06, 0.65 + cos(t * 0.8) * 0.07), 0.58);
  float b1 = blob(uv, vec2(0.86 + cos(t * 0.7) * 0.08, 0.38 + sin(t * 0.9) * 0.06), 0.62);
  float b2 = blob(uv, vec2(0.52 + sin(t * 0.55) * 0.1, 0.18 + cos(t * 0.66) * 0.05), 0.5);
  color = mix(color, u_color_0, b0 * 0.68);
  color = mix(color, u_color_1, b1 * 0.52);
  color = mix(color, u_color_2, b2 * 0.38);
  color += vec3((sin((uv.x + uv.y + t) * 20.0) + 1.0) * 0.012);
  gl_FragColor = vec4(color, 1.0);
}
`

function hexToRgb(hex: string): [number, number, number] {
  const normalized = hex.replace("#", "")
  const bigint = Number.parseInt(normalized, 16)
  return [
    ((bigint >> 16) & 255) / 255,
    ((bigint >> 8) & 255) / 255,
    (bigint & 255) / 255,
  ]
}

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

export function Velaris({
  bg = "#2B2320",
  colors = ["#B3261E", "#7A1913", "#F7F3F0", "#2B2320"],
  speed = 0.75,
  grain = true,
  height = "min-h-[620px]",
  className,
  children,
}: VelarisProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hasWebGl, setHasWebGl] = useState(true)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || prefersReducedMotion) return

    const gl = canvas.getContext("webgl", {
      antialias: false,
      depth: false,
      powerPreference: "low-power",
    })

    if (!gl) {
      setHasWebGl(false)
      return
    }

    const vertex = createShader(gl, gl.VERTEX_SHADER, vertexShader)
    const fragment = createShader(gl, gl.FRAGMENT_SHADER, fragmentShader)
    const program = gl.createProgram()

    if (!vertex || !fragment || !program) {
      setHasWebGl(false)
      return
    }

    gl.attachShader(program, vertex)
    gl.attachShader(program, fragment)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setHasWebGl(false)
      return
    }

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW)

    const position = gl.getAttribLocation(program, "position")
    const resolution = gl.getUniformLocation(program, "u_resolution")
    const time = gl.getUniformLocation(program, "u_time")
    const colorUniforms = [0, 1, 2, 3].map((index) => gl.getUniformLocation(program, `u_color_${index}`))
    let frame = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 1.8)
      canvas.width = Math.max(1, Math.floor(rect.width * dpr))
      canvas.height = Math.max(1, Math.floor(rect.height * dpr))
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    resize()

    const draw = (now: number) => {
      gl.useProgram(program)
      gl.enableVertexAttribArray(position)
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)
      gl.uniform2f(resolution, canvas.width, canvas.height)
      gl.uniform1f(time, (now / 1000) * speed)
      colorUniforms.forEach((uniform, index) => {
        const rgb = hexToRgb(colors[index] || bg)
        gl.uniform3f(uniform, rgb[0], rgb[1], rgb[2])
      })
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      frame = window.requestAnimationFrame(draw)
    }

    frame = window.requestAnimationFrame(draw)

    return () => {
      window.cancelAnimationFrame(frame)
      observer.disconnect()
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
      gl.deleteShader(vertex)
      gl.deleteShader(fragment)
    }
  }, [bg, colors, prefersReducedMotion, speed])

  return (
    <div
      className={cn("relative isolate overflow-hidden bg-[var(--velaris-bg)]", height, className)}
      style={{ "--velaris-bg": bg } as CSSProperties}
    >
      {!prefersReducedMotion && hasWebGl ? (
        <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 -z-20 h-full w-full" />
      ) : null}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_25%_20%,rgba(179,38,30,0.58),transparent_32%),radial-gradient(circle_at_76%_45%,rgba(122,25,19,0.72),transparent_36%),linear-gradient(135deg,#2B2320,#7A1913_58%,#B3261E)]"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(43,35,32,0.72),rgba(43,35,32,0.28)_55%,rgba(43,35,32,0.66))]" />
      {grain ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.45)_1px,transparent_1px)] [background-size:18px_18px]"
        />
      ) : null}
      {children}
    </div>
  )
}
