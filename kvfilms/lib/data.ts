export const SITE = {
  name: "KV Films",
  tagline: "Cinematic production studio based in Vapi, Gujarat.",
  description:
    "KV Films is a production partner driven by pursuit. We team up with brands and agencies to craft commercials, branded films, and campaigns built on craft and culture — from our base in Vapi, Gujarat.",
  location: "Vapi, Gujarat, India",
  email: "hello@kvfilms.in",
  social: {
    instagram: "https://www.instagram.com/kvfilms/",
    linkedin: "https://www.linkedin.com/company/kvfilms",
    vimeo: "https://vimeo.com/kvfilms",
  },
};

export type WorkCategory = "Commercial" | "Branded Film" | "Branded Content" | "Campaign" | "Documentary" | "Behind the Scenes";

export interface Work {
  id: string;
  title: string;
  category: WorkCategory;
  image: string;
  description: string;
}

export const WORKS: Work[] = [
  {
    id: "always-in-pursuit",
    title: "Always in Pursuit",
    category: "Branded Film",
    image: "/images/Always-in-Pursuit.avif",
    description: "A brand film built on the pursuit of craft, shot across Vapi and Mumbai.",
  },
  {
    id: "cable-mayhem",
    title: "Cable Mayhem",
    category: "Commercial",
    image: "/images/Cable-Mayhem.avif",
    description: "High-energy commercial spot for a consumer electronics launch.",
  },
  {
    id: "dp-ac",
    title: "DP & AC",
    category: "Branded Content",
    image: "/images/DP-&-AC.avif",
    description: "A look behind the lens at the camera department in action.",
  },
  {
    id: "goats",
    title: "Goats",
    category: "Branded Content",
    image: "/images/Goats.avif",
    description: "Unconventional storytelling for a lifestyle brand campaign.",
  },
  {
    id: "hole-9",
    title: "Hole 9",
    category: "Commercial",
    image: "/images/Hole-9.avif",
    description: "Sport-focused commercial captured on location.",
  },
  {
    id: "indianapolis",
    title: "Indianapolis",
    category: "Documentary",
    image: "/images/Indianapolis-.avif",
    description: "Short documentary following a creative's journey across cities.",
  },
  {
    id: "last-looks",
    title: "Last Looks",
    category: "Branded Film",
    image: "/images/Last-looks-.avif",
    description: "On-set moments in the final minutes before the shot.",
  },
  {
    id: "pilot-launch",
    title: "Pilot Launch",
    category: "Campaign",
    image: "/images/Pilot-Launch.avif",
    description: "Multi-platform campaign launch for an automotive client.",
  },
  {
    id: "set-vibes",
    title: "Set Vibes",
    category: "Behind the Scenes",
    image: "/images/Set-Vibes.avif",
    description: "A day in the life of the KV Films production crew.",
  },
  {
    id: "take-a-bow",
    title: "Take a Bow",
    category: "Branded Content",
    image: "/images/Take-a-bow.avif",
    description: "Celebrating the talent both in front of and behind the camera.",
  },
  {
    id: "wet-set",
    title: "Wet Set",
    category: "Commercial",
    image: "/images/Wet-Set.avif",
    description: "Water-heavy commercial shoot with specialty capture.",
  },
  {
    id: "work-worth-doing",
    title: "Work Worth Doing",
    category: "Campaign",
    image: "/images/Work-Worth-Doing-.avif",
    description: "Brand campaign centered on meaningful, craft-led work.",
  },
];

export interface NewsArticle {
  id: string;
  title: string;
  date: string;
  image: string;
  excerpt: string;
}

export const NEWS: NewsArticle[] = [
  {
    id: "kv-films-steps-into-future",
    title: "KV Films Steps Into Its Future",
    date: "2025-10-08",
    image: "/images/banner-2_1.2.1.jpg",
    excerpt: "A new chapter for the studio, our base in Vapi, and the work ahead.",
  },
  {
    id: "merch-drop-pursuit",
    title: "Merch Drop: Pursuit",
    date: "2025-10-17",
    image: "/images/banner-2_1.2.1.jpg",
    excerpt: "Limited-run studio merch built around the pursuit of craft.",
  },
  {
    id: "always-in-pursuit-behind-scenes",
    title: "Always in Pursuit: Behind the Scenes",
    date: "2025-09-20",
    image: "/images/Always-in-Pursuit.avif",
    excerpt: "How the Always in Pursuit brand film came together on set.",
  },
];

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export const TEAM: TeamMember[] = [
  {
    id: "founder",
    name: "KV Founder",
    role: "EP | Founder",
    image: "/images/Jack-Linderman.webp",
    bio: "Leads production and creative direction at KV Films, based in Vapi.",
  },
  {
    id: "producer",
    name: "Production Lead",
    role: "Producer",
    image: "/images/Jacob-Nobbe.avif",
    bio: "Oversees on-set production, logistics, and specialty capture across projects.",
  },
];

export const SERVICES = [
  {
    name: "Creative Services",
    items: ["Campaign Development", "Content Strategy", "Story Ideation"],
  },
  {
    name: "Production Services",
    items: ["Producing & Logistics", "On-Set Production", "Specialty Capture"],
  },
  {
    name: "Post-Production",
    items: ["Editorial", "Sound Design", "Color", "VFX & Motion"],
  },
];

export const CATEGORIES: WorkCategory[] = [
  "Commercial",
  "Branded Film",
  "Branded Content",
  "Campaign",
  "Documentary",
  "Behind the Scenes",
];