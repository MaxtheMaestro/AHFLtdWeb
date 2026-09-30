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
  imageScale?: number
  imageTransformOrigin?: string
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
  labourDayYardCleanup: "/images/community/labour-day-may-pen-yard-cleanup.jpg",
  labourDayVolunteerTools: "/images/community/labour-day-may-pen-volunteer-tools.jpg",
  labourDayVolunteerPeace: "/images/community/labour-day-may-pen-volunteer-peace.jpg",
  labourDayGroundwork: "/images/community/labour-day-may-pen-groundwork.jpg",
  labourDayRaking: "/images/community/labour-day-may-pen-raking.jpg",
}

export const leadershipImages = {
  stephenSimpson: "/images/leadership/stephen-simpson.jpg",
  zakariMessam: "/images/leadership/zakari-messam.jpg",
  paultonMcCarthyWalker: "/images/leadership/paulton-mccarthy-walker.jpg",
  khaeimMay: "/images/leadership/khaeim-may.jpg",
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

export const leadership: TeamMember[] = [
  {
    name: "Mr. Stephen Simpson",
    title: "Founder and CEO",
    image: leadershipImages.stephenSimpson,
    imageAlt: "Portrait of Mr. Stephen Simpson, founder and CEO of Agape Hope Jamaica LTD.",
    objectPosition: "50% 18%",
    bio: "Agape is more than an organization to me-it's a lifelong mission rooted in hope, faith, and purpose. We do what we do to be a beacon of hope for those who need it most, not just for a moment, but for generations to come. This isn't temporary work; it's a movement-one that invites every person involved to be part of something greater than themselves. Our goal is to spark a chain reaction of change, inspiring others to do more, be more, and help more, because the more people we uplift, the stronger our country becomes. This is God's work, and it's an honor and a blessing to stand alongside passionate, like-minded youth who are committed to creating real change. Step by step, we are building toward a better Jamaica-and we're just getting started.",
    quote: true,
  },
  {
    name: "Zakari Messam",
    title: "Founding Advisor",
    image: leadershipImages.zakariMessam,
    imageAlt: "Zakari Messam smiling with children during community outreach in Jamaica.",
    objectPosition: "76% 38%",
    bio: "Agape Hope has always been about more than organizing projects; it is about meeting people with love, dignity, and consistency. When we stand beside children, families, and communities, we are reminded that hope is not just something we talk about. Hope is something we practice through our time, our presence, our resources, and our willingness to serve even when no one is watching. My prayer is that every person who encounters Agape Hope feels seen, valued, and encouraged to believe that better is still possible. As we continue to grow, I want our work to inspire young people across Jamaica to lead with compassion, to give what they can, and to understand that real change begins when ordinary people choose to care deeply and act faithfully.",
    quote: true,
  },
  {
    name: "Paulton McCarthy-Walker",
    title: "Vice President",
    image: leadershipImages.paultonMcCarthyWalker,
    imageAlt: "Paulton McCarthy-Walker, Vice President of Agape Hope Jamaica LTD.",
    objectPosition: "50% 16%",
    bio: "Agape Hope reminds me that leadership is service before anything else. It is about showing up with humility, listening to what people truly need, and helping turn compassion into action. Every act of care, every outreach effort, and every person we encourage is part of building a stronger Jamaica together, one community and one family at a time.",
    quote: true,
  },
  {
    name: "Khaeim May",
    title: "Outreach Director",
    image: leadershipImages.khaeimMay,
    imageAlt: "Khaeim May, Outreach Director of Agape Hope Jamaica LTD.",
    objectPosition: "39% 18%",
    imageScale: 2.35,
    imageTransformOrigin: "39% 18%",
    bio: "Outreach is about showing people that hope is still close, even when life feels heavy. I am proud to help carry Agape Hope's mission into communities through practical love, teamwork, and consistency. Whether we are cleaning a yard, delivering meals, or encouraging a family, the goal is always to let people know they are seen, valued, and supported.",
    quote: true,
  },
]

export const galleryImages: GalleryImage[] = [
  {
    src: communityImages.outreachGroup,
    alt: "Agape Hope volunteers and community members gathered at an outreach project.",
    title: "Community Outreach in Howells Content",
    caption: "Volunteers and neighbors gathered in Clarendon to respond to local needs with practical help, encouragement, and shared care.",
    objectPosition: "center",
    featured: true,
  },
  {
    src: communityImages.paintingHome,
    alt: "An Agape Hope volunteer painting a home wall.",
    title: "Hands-On Home Improvement",
    caption: "A volunteer helps refresh a home exterior, showing how simple repairs can restore dignity and comfort for families.",
    objectPosition: "center",
  },
  {
    src: communityImages.volunteerTeamSmiles,
    alt: "Three Agape Hope volunteers smiling together.",
    title: "Young Volunteers Ready to Serve",
    caption: "Youth volunteers bring warmth, reliability, and energy to outreach days across the communities Agape Hope supports.",
    objectPosition: "center 24%",
  },
  {
    src: communityImages.mealDelivery,
    alt: "An Agape Hope volunteer holding prepared meals.",
    title: "Meals Shared With Dignity",
    caption: "Prepared meals and essentials are organized for families who need practical support and a reminder that they are not alone.",
    objectPosition: "center 20%",
  },
  {
    src: communityImages.volunteerFriends,
    alt: "Two Agape Hope volunteers smiling during outreach.",
    title: "Friendship in Service",
    caption: "Volunteers build trust and connection while working together to make community care feel personal and consistent.",
    objectPosition: "center",
  },
  {
    src: communityImages.teamGroup,
    alt: "Agape Hope team members standing together.",
    title: "The Team Behind the Mission",
    caption: "Agape Hope's growing volunteer team is rooted in shared responsibility, compassion, and service to Jamaica.",
    objectPosition: "center 62%",
  },
  {
    src: communityImages.labourDayYardCleanup,
    alt: "An Agape Hope volunteer raking leaves during a Labour Day home cleanup in May Pen, Clarendon.",
    title: "Labour Day Home Cleanup in May Pen",
    caption: "Volunteers helped clean and improve the home of an elderly woman in May Pen, turning Labour Day into practical compassion.",
    objectPosition: "center 58%",
  },
  {
    src: communityImages.labourDayVolunteerTools,
    alt: "An Agape Hope volunteer receiving work gloves during the May Pen Labour Day service project.",
    title: "Preparing to Serve",
    caption: "Team members shared tools and worked side by side to support a safer, cleaner home environment for an elder in need.",
    objectPosition: "center 36%",
  },
  {
    src: communityImages.labourDayVolunteerPeace,
    alt: "An Agape Hope volunteer smiling during the Labour Day community service project in May Pen.",
    title: "Joy in Community Service",
    caption: "The May Pen project reflected Agape Hope's belief that service can be hardworking, hopeful, and deeply human.",
    objectPosition: "center 34%",
  },
  {
    src: communityImages.labourDayGroundwork,
    alt: "Agape Hope volunteers clearing grass and debris during the May Pen Labour Day project.",
    title: "Clearing the Yard With Care",
    caption: "Volunteers removed overgrowth and debris around the home, helping create a more manageable outdoor space.",
    objectPosition: "center 58%",
  },
  {
    src: communityImages.labourDayRaking,
    alt: "Agape Hope volunteers raking a yard during the Labour Day service project in May Pen, Clarendon.",
    title: "Practical Help for an Elder",
    caption: "The team raked, cleared, and worked together to improve the surroundings of an elderly woman's home in Clarendon.",
    objectPosition: "center 58%",
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
