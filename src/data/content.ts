export type Stat = {
  value: string
  label: string
}

export type Program = {
  title: string
  description: string
  image: string
  alt: string
  category: string
  objectPosition?: string
}

export type Project = Program & {
  date?: string
}

export type TeamMember = {
  name: string
  title: string
  image: string
  imageAlt?: string
  objectPosition?: string
  bio?: string
  quote?: boolean
  email?: string
  linkedin?: string
}

export type FAQ = {
  question: string
  answer: string
}

export type InvolvementPath = {
  title: string
  description: string
  action: string
}

export type GalleryImage = {
  src: string
  alt: string
  title: string
  caption: string
  objectPosition?: string
  featured?: boolean
}

export const communityImages = {
  outreachGroup: "/images/community/additional-outreach.jpg",
  fieldWork: "/images/community/field-work.jpg",
  paintingHome: "/images/community/painting-home.jpg",
  volunteerTeamSmiles: "/images/community/volunteer-team-smiles.jpg",
  volunteerFriends: "/images/community/volunteer-friends.jpg",
  volunteerPortrait: "/images/community/volunteer-portrait.jpg",
  mealDelivery: "/images/community/meal-delivery.jpg",
  teamGroup: "/images/community/team-group-compressed.jpg",
}

export const leadershipImages = {
  stephenSimpson: "/images/leadership/stephen-simpson.jpg",
}

export const hero = {
  eyebrow: "Jamaica-born • Community-driven • Built on hope",
  eyebrowCompact: "Born in Jamaica • Built for community",
  organizationName: "Agape Hope Foundation of Jamaica Limited",
  title: "Sharing love. Giving hope.",
  description:
    "Agape Hope Foundation of Jamaica Limited brings volunteers, donors, and community partners together to support families, young people, and neighborhoods through practical service rooted in unconditional love.",
  primaryCta: "Support the mission",
  secondaryCta: "Explore our work",
  image: communityImages.outreachGroup,
  imageAlt: "Agape Hope volunteers gathered with community members at an outreach project in Jamaica.",
}

export const stats: Stat[] = [
  { value: "2021", label: "Founded by Stephen Simpson and Zakari Messam" },
  { value: "8+", label: "Leadership roles supporting operations and outreach" },
  { value: "100%", label: "Volunteer-powered commitment to compassion" },
]

export const involvementPaths: InvolvementPath[] = [
  {
    title: "Families in need",
    description:
      "Visits, care packages, and practical support help households feel seen during difficult seasons, whether the need is food, encouragement, rebuilding help, or a steady human presence.",
    action: "Support family outreach",
  },
  {
    title: "Young volunteers",
    description:
      "Service opportunities help young people build leadership, discipline, and compassion by working beside neighbors and learning how care becomes action.",
    action: "Become a volunteer",
  },
  {
    title: "Community projects",
    description:
      "Hands-on projects bring donors, leaders, and neighbors together around visible local needs, from shared spaces to homes and families recovering from hardship.",
    action: "Partner on a project",
  },
]

export const programs: Program[] = [
  {
    title: "Family Visits",
    category: "Care",
    description:
      "Coordinated visits and direct support for families who need encouragement, essentials, and a steady reminder that they are not alone.",
    image: communityImages.mealDelivery,
    alt: "An Agape Hope volunteer holding prepared meals for delivery.",
    objectPosition: "center",
  },
  {
    title: "Fundraising & Donations",
    category: "Support",
    description:
      "Community giving campaigns that turn contributions into food, supplies, and resources for outreach projects across Jamaica.",
    image: communityImages.volunteerTeamSmiles,
    alt: "Agape Hope volunteers smiling together beside a bus.",
    objectPosition: "center",
  },
  {
    title: "Youth & Volunteer Development",
    category: "Growth",
    description:
      "Opportunities for young people and volunteers to build leadership, service habits, and meaningful relationships through action.",
    image: communityImages.volunteerPortrait,
    alt: "A smiling Agape Hope volunteer wearing the organization shirt.",
    objectPosition: "center",
  },
]

export const projects: Project[] = [
  {
    title: "Howells Content Home Repair After Hurricane Melissa",
    category: "Community",
    date: "Clarendon, after Hurricane Melissa",
    description:
      "A project supporting repairs to sections of a home destroyed in Howells Content, Clarendon, reflecting the organization’s practical response to community need.",
    image: communityImages.paintingHome,
    alt: "An Agape Hope volunteer painting the exterior wall of a home.",
    objectPosition: "center",
  },
  {
    title: "Meal Delivery and Essentials Donation Drives",
    category: "Relief",
    date: "Seasonal campaigns",
    description:
      "Collection and distribution efforts designed to support households with essentials during moments of pressure or transition.",
    image: communityImages.mealDelivery,
    alt: "An Agape Hope volunteer holding a container of prepared meals.",
    objectPosition: "center",
  },
  {
    title: "Labour Day Hands-On Community Service",
    category: "Service",
    date: "Recurring outreach",
    description:
      "Hands-on service days focused on improving shared spaces and showing up where practical help can make a visible difference.",
    image: communityImages.fieldWork,
    alt: "Agape Hope volunteers preparing materials during a community project.",
    objectPosition: "center",
  },
]

export const storyBlocks = [
  {
    eyebrow: "Who we help",
    title: "Whoever, whenever, and however we can.",
    description:
      "Agape Hope’s work is intentionally practical and responsive. The team shows up for families, young people, elders, and neighbors through essentials, encouragement, rebuilding support, and volunteer-led care that people can actually feel.",
    image: communityImages.paintingHome,
    alt: "A volunteer painting a home exterior during a community service project.",
    objectPosition: "center",
  },
  {
    eyebrow: "How you can help",
    title: "Every supporter has a place in the mission.",
    description:
      "Some people give time. Some give resources. Some connect Agape Hope to a family, school, church, or community project. The site now makes those pathways clearer from the first screen.",
    image: communityImages.outreachGroup,
    alt: "Agape Hope volunteers and community members gathered together after outreach work.",
    objectPosition: "center",
  },
]

const leadershipImage = communityImages.teamGroup

export const leadership: TeamMember[] = [
  {
    name: "Mr. Stephen Simpson",
    title: "Founder and CEO",
    image: leadershipImages.stephenSimpson,
    imageAlt: "Portrait of Mr. Stephen Simpson, founder and CEO of Agape Hope Jamaica LTD.",
    objectPosition: "center",
    bio: "Agape is more than an organization to me-it's a lifelong mission rooted in hope, faith, and purpose. We do what we do to be a beacon of hope for those who need it most, not just for a moment, but for generations to come. This isn't temporary work; it's a movement-one that invites every person involved to be part of something greater than themselves. Our goal is to spark a chain reaction of change, inspiring others to do more, be more, and help more, because the more people we uplift, the stronger our country becomes. This is God's work, and it's an honor and a blessing to stand alongside passionate, like-minded youth who are committed to creating real change. Step by step, we are building toward a better Jamaica-and we're just getting started.",
    quote: true,
  },
  {
    name: "Zakari Messam",
    title: "Co-founder",
    image: leadershipImage,
    imageAlt: "Agape Hope team members gathered together, representing organization leadership.",
    objectPosition: "center 62%",
    bio: "Co-founded the organization and supports its mission to make volunteerism tangible and community-centered.",
  },
  {
    name: "Paulton McCarthy-Walker",
    title: "Vice President",
    image: leadershipImage,
    imageAlt: "Agape Hope team members gathered together, representing organization leadership.",
    objectPosition: "center 62%",
    bio: "Publicly identified with Agape Hope leadership as vice president, supporting the organization’s continued growth.",
  },
  {
    name: "Khaeim May",
    title: "Outreach Director",
    image: leadershipImage,
    imageAlt: "Agape Hope team members gathered together, representing organization leadership.",
    objectPosition: "center 62%",
    bio: "Supports outreach coordination and the practical community service that carries the organization’s mission forward.",
  },
]

export const galleryImages: GalleryImage[] = [
  {
    src: communityImages.outreachGroup,
    alt: "Agape Hope volunteers and community members gathered at an outreach project.",
    title: "Volunteer Response in Howells Content",
    caption: "A broad volunteer and community presence at the center of outreach and rebuilding support.",
    objectPosition: "center",
    featured: true,
  },
  {
    src: communityImages.paintingHome,
    alt: "An Agape Hope volunteer painting a home wall.",
    title: "Home Repair Support in Action",
    caption: "Hands-on home improvement work that turns concern into visible help.",
    objectPosition: "center",
  },
  {
    src: communityImages.volunteerTeamSmiles,
    alt: "Three Agape Hope volunteers smiling together.",
    title: "Youth Volunteers Ready to Serve",
    caption: "Young volunteers bringing warmth, consistency, and energy to service days.",
    objectPosition: "center",
  },
  {
    src: communityImages.mealDelivery,
    alt: "An Agape Hope volunteer holding prepared meals.",
    title: "Prepared Meals and Practical Care",
    caption: "Food support and essentials delivered with dignity during outreach.",
    objectPosition: "center",
  },
  {
    src: communityImages.volunteerFriends,
    alt: "Two Agape Hope volunteers smiling during outreach.",
    title: "Service Built on Relationship",
    caption: "Friendship and teamwork at the center of community care.",
    objectPosition: "center",
  },
  {
    src: communityImages.teamGroup,
    alt: "Agape Hope team members standing together.",
    title: "The Team Behind the Work",
    caption: "A growing team rooted in Jamaica, shared responsibility, and service.",
    objectPosition: "center 62%",
  },
]

export const faqs: FAQ[] = [
  {
    question: "How can I volunteer?",
    answer:
      "Send a message through the contact form with your interests, availability, and location. The team can follow up with current outreach needs.",
  },
  {
    question: "Can I donate items instead of money?",
    answer:
      "Yes. Donation drives often need practical essentials. Use the contact form to coordinate what is currently useful before arranging delivery.",
  },
  {
    question: "Is Agape Hope only active in one parish?",
    answer:
      "No. While our work may be concentrated in particular communities at different times, Agape Hope Foundation of Jamaica Limited is not limited to any one parish. Our goal is to extend support wherever there is a genuine need and where our resources, partnerships, and volunteers allow us to make a meaningful difference. As we continue to grow, we hope to reach and serve even more communities across Jamaica.",
  },
]
