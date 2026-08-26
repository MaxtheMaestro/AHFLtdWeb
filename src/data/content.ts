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
}

export type Project = Program & {
  date?: string
}

export type TeamMember = {
  name: string
  title: string
  image: string
  imageAlt?: string
  bio?: string
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
  caption: string
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

export const hero = {
  eyebrow: "Jamaica-born community care",
  title: "Sharing love. Giving hope.",
  description:
    "Agape Hope Jamaica LTD brings volunteers, donors, and community partners together to support families, young people, and neighborhoods through practical service rooted in unconditional love.",
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
      "Visits, care packages, and practical support help households feel seen during difficult seasons.",
    action: "Support family outreach",
  },
  {
    title: "Young volunteers",
    description:
      "Service opportunities help young people build leadership, discipline, and compassion through real work.",
    action: "Become a volunteer",
  },
  {
    title: "Community projects",
    description:
      "Hands-on projects bring donors, leaders, and neighbors together around visible local needs.",
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
  },
  {
    title: "Fundraising & Donations",
    category: "Support",
    description:
      "Community giving campaigns that turn contributions into food, supplies, and resources for outreach projects across Jamaica.",
    image: communityImages.volunteerTeamSmiles,
    alt: "Agape Hope volunteers smiling together beside a bus.",
  },
  {
    title: "Youth & Volunteer Development",
    category: "Growth",
    description:
      "Opportunities for young people and volunteers to build leadership, service habits, and meaningful relationships through action.",
    image: communityImages.volunteerPortrait,
    alt: "A smiling Agape Hope volunteer wearing the organization shirt.",
  },
]

export const projects: Project[] = [
  {
    title: "Howells Content Home Rebuild",
    category: "Community",
    date: "Clarendon, after Hurricane Melissa",
    description:
      "A project supporting repairs to sections of a home destroyed in Howells Content, Clarendon, reflecting the organization’s practical response to community need.",
    image: communityImages.paintingHome,
    alt: "An Agape Hope volunteer painting the exterior wall of a home.",
  },
  {
    title: "Donation Drives",
    category: "Relief",
    date: "Seasonal campaigns",
    description:
      "Collection and distribution efforts designed to support households with essentials during moments of pressure or transition.",
    image: communityImages.mealDelivery,
    alt: "An Agape Hope volunteer holding a container of prepared meals.",
  },
  {
    title: "Labour Day Community Projects",
    category: "Service",
    date: "Recurring outreach",
    description:
      "Hands-on service days focused on improving shared spaces and showing up where practical help can make a visible difference.",
    image: communityImages.fieldWork,
    alt: "Agape Hope volunteers preparing materials during a community project.",
  },
]

export const storyBlocks = [
  {
    eyebrow: "Who we help",
    title: "Hope travels through family visits, donation drives, and service days.",
    description:
      "Agape Hope’s work is intentionally practical. The team shows up through essentials, encouragement, rebuilding support, and volunteer-led community care that people can actually feel.",
    image: communityImages.paintingHome,
    alt: "A volunteer painting a home exterior during a community service project.",
  },
  {
    eyebrow: "How you can help",
    title: "Every supporter has a place in the mission.",
    description:
      "Some people give time. Some give resources. Some connect Agape Hope to a family, school, church, or community project. The site now makes those pathways clearer from the first screen.",
    image: communityImages.outreachGroup,
    alt: "Agape Hope volunteers and community members gathered together after outreach work.",
  },
]

const leadershipImage = communityImages.teamGroup

export const leadership: TeamMember[] = [
  {
    name: "Stephen Simpson",
    title: "Founder / President",
    image: leadershipImage,
    imageAlt: "Agape Hope team members gathered together, representing organization leadership.",
    bio: "Co-founded Agape Hope with a vision for sustained, practical, compassionate service in Jamaica.",
  },
  {
    name: "Zakari Messam",
    title: "Co-founder",
    image: leadershipImage,
    imageAlt: "Agape Hope team members gathered together, representing organization leadership.",
    bio: "Co-founded the organization and supports its mission to make volunteerism tangible and community-centered.",
  },
  {
    name: "Paulton McCarthy-Walker",
    title: "Vice President",
    image: leadershipImage,
    imageAlt: "Agape Hope team members gathered together, representing organization leadership.",
    bio: "Publicly identified with Agape Hope leadership as vice president, supporting the organization’s continued growth.",
  },
  {
    name: "Khaeim May",
    title: "Outreach Director",
    image: leadershipImage,
    imageAlt: "Agape Hope team members gathered together, representing organization leadership.",
    bio: "Supports outreach coordination and the practical community service that carries the organization’s mission forward.",
  },
]

export const galleryImages: GalleryImage[] = [
  {
    src: communityImages.outreachGroup,
    alt: "Agape Hope volunteers and community members gathered at an outreach project.",
    caption: "A broad volunteer and community presence at the center of outreach.",
    featured: true,
  },
  {
    src: communityImages.paintingHome,
    alt: "An Agape Hope volunteer painting a home wall.",
    caption: "Hands-on home improvement and rebuilding support.",
  },
  {
    src: communityImages.volunteerTeamSmiles,
    alt: "Three Agape Hope volunteers smiling together.",
    caption: "Volunteers bringing warmth and energy to service days.",
  },
  {
    src: communityImages.mealDelivery,
    alt: "An Agape Hope volunteer holding prepared meals.",
    caption: "Prepared meals and practical care delivered with dignity.",
  },
  {
    src: communityImages.volunteerFriends,
    alt: "Two Agape Hope volunteers smiling during outreach.",
    caption: "Friendship and service at the center of community care.",
  },
  {
    src: communityImages.teamGroup,
    alt: "Agape Hope team members standing together.",
    caption: "A growing team rooted in Jamaica and service.",
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
      "The organization began in Jamaica and organizes around community need. Contact the team for the most current project locations and partnership opportunities.",
  },
]
