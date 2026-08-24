// ─────────────────────────────────────────────────────────────
//  PORTFOLIO CONFIG  –  edit this file to personalise the site
// ─────────────────────────────────────────────────────────────

export const siteConfig = {
  name: "Your Name",
  title: "Full-Stack Developer",
  description:
    "Personal portfolio of Your Name — building scalable web applications with modern technologies.",
  email: "hello@yourname.dev",
  location: "City, Country",
  github: "https://github.com/merishiii",
  linkedin: "https://linkedin.com/in/yourusername",
  twitter: "https://twitter.com/yourusername",
  resumeUrl: "/resume.pdf", // place your PDF in /public/resume.pdf
  githubUsername: "merishiii",
  leetcodeUsername: "Rishabh_pathak",
  avatarUrl: "https://avatars.githubusercontent.com/u/0?v=4", // replace with real URL
};

export const aboutData = {
  bio: `Hi! I'm Your Name, a passionate full-stack developer with X years of experience
  building web applications. I love crafting clean, user-centric products and solving
  complex problems with elegant code. When I'm not coding, you'll find me hiking,
  reading, or contributing to open source.`,
  highlights: [
    "X+ years of professional experience",
    "Contributed to Y open-source projects",
    "Delivered Z production applications",
    "Passionate about developer experience & performance",
  ],
};

export const skills = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "Python", "FastAPI", "REST APIs"],
  },
  {
    category: "Database",
    items: ["PostgreSQL", "MongoDB", "Redis", "Prisma"],
  },
  {
    category: "DevOps & Cloud",
    items: ["Docker", "GitHub Actions", "AWS", "Vercel", "Linux"],
  },
  {
    category: "Tools",
    items: ["Git", "VS Code", "Figma", "Postman", "Jira"],
  },
];

export const experience = [
  {
    role: "Senior Software Engineer",
    company: "Awesome Corp",
    period: "Jan 2023 – Present",
    location: "Remote",
    description:
      "Led development of a microservices platform serving 500k+ users. Reduced API latency by 40% through caching and query optimisation.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Docker"],
  },
  {
    role: "Software Engineer",
    company: "Startup Inc.",
    period: "Jun 2021 – Dec 2022",
    location: "New York, NY",
    description:
      "Built and shipped 3 full-stack features end-to-end. Collaborated with designers to implement pixel-perfect UIs.",
    tech: ["React", "FastAPI", "MongoDB", "AWS"],
  },
  {
    role: "Junior Developer",
    company: "Agency XYZ",
    period: "Jan 2020 – May 2021",
    location: "San Francisco, CA",
    description:
      "Developed responsive landing pages and internal dashboards for 10+ client projects.",
    tech: ["HTML", "CSS", "JavaScript", "WordPress"],
  },
];

export const certifications = [
  {
    name: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    date: "2024",
    credentialUrl: "#",
    badgeUrl: "",
  },
  {
    name: "Google Professional Cloud Developer",
    issuer: "Google Cloud",
    date: "2023",
    credentialUrl: "#",
    badgeUrl: "",
  },
  {
    name: "Meta Front-End Developer Certificate",
    issuer: "Meta / Coursera",
    date: "2022",
    credentialUrl: "#",
    badgeUrl: "",
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
  { label: "GitHub", href: "#github" },
  { label: "LeetCode", href: "#leetcode" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];
