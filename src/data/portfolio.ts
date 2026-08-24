// ─────────────────────────────────────────────────────────────
//  PORTFOLIO CONFIG  –  edit this file to personalise the site
// ─────────────────────────────────────────────────────────────

export const siteConfig = {
  name: "Rishabh Pathak",
  title: "Full-Stack Java Developer",
  description:
    "Building scalable, reliable, and modern web applications using Java, Spring Boot, React, REST APIs, and cloud technologies.",
  email: "your.email@example.com", // replace with your real email
  location: "India",
  github: "https://github.com/merishiii",
  linkedin: "https://linkedin.com/in/yourusername", // replace with your real LinkedIn
  twitter: "https://twitter.com/yourusername",      // replace or remove
  resumeUrl: "/resume.pdf", // place your PDF in /public/resume.pdf
  githubUsername: "merishiii",
  leetcodeUsername: "Rishabh_pathak",
  avatarUrl: "https://avatars.githubusercontent.com/merishiii?v=4",
};

export const aboutData = {
  bio: `I'm a Full-Stack Java Developer with a strong foundation in computer science and a passion for building scalable, reliable, and user-focused applications.

My primary focus is on Java backend development, Spring Boot, RESTful APIs, databases, and modern frontend technologies. I also have hands-on exposure to cloud technologies and AWS, with certifications covering AWS development and cloud operations.

I enjoy solving complex technical problems, learning new technologies, and transforming ideas into clean, maintainable, and production-ready applications.

Currently, I'm working as an Application Developer – Java & Web Technologies at IBM, where I'm strengthening my expertise in enterprise application development, Java, web technologies, software engineering practices, and Agile methodologies.`,
  highlights: [
    "Application Developer at IBM — Java & Web Technologies",
    "AWS Certified Developer – Associate",
    "AWS Certified SysOps Administrator – Associate",
    "Full-Stack projects: Spring Boot + React + MySQL",
    "Strong foundation in Data Structures & Algorithms",
    "Passionate about Microservices & System Design",
  ],
};

export const skills = [
  {
    category: "Backend Development",
    items: [
      "Java", "Spring Boot", "Spring Framework", "RESTful APIs",
      "Hibernate", "JPA", "JDBC", "Microservices", "Maven",
      "OOP", "Collections Framework", "Exception Handling", "Multithreading",
    ],
  },
  {
    category: "Frontend Development",
    items: [
      "HTML5", "CSS3", "JavaScript", "React.js",
      "Responsive Web Design", "REST API Integration",
    ],
  },
  {
    category: "Database",
    items: [
      "MySQL", "MongoDB", "SQL", "Database Design",
      "CRUD Operations", "Joins & Queries",
    ],
  },
  {
    category: "Cloud & DevOps",
    items: [
      "Amazon Web Services (AWS)", "AWS EC2", "AWS S3", "AWS IAM",
      "AWS Lambda", "AWS CloudWatch", "Cloud Fundamentals",
      "Git", "GitHub", "Maven",
    ],
  },
  {
    category: "Tools",
    items: [
      "IntelliJ IDEA", "Eclipse", "Visual Studio Code",
      "Postman", "Git", "GitHub", "Linux",
    ],
  },
  {
    category: "Computer Science",
    items: [
      "Data Structures & Algorithms", "Object-Oriented Programming",
      "DBMS", "Operating Systems", "Computer Networks",
      "SDLC", "Functional Testing", "Non-Functional Testing",
    ],
  },
];

export const experience = [
  {
    role: "Application Developer – Java & Web Technologies",
    company: "IBM",
    period: "July 2026 – Present",
    location: "India",
    description:
      "Working with Java and web technologies to develop and maintain enterprise applications. Applying object-oriented programming and software engineering principles. Participating in development, testing, debugging, and troubleshooting. Collaborating in an Agile environment to build scalable, maintainable, and reliable software solutions.",
    tech: ["Java", "Spring Boot", "REST APIs", "Web Technologies", "Agile", "Git"],
  },
];

export const projects = [
  {
    title: "Full-Stack Employee Management System",
    description:
      "A full-stack employee management application designed to manage employee information through a modern web interface and RESTful backend.",
    tech: ["Java", "Spring Boot", "React.js", "MySQL", "REST API"],
    features: [
      "Employee CRUD operations",
      "RESTful APIs using Spring Boot",
      "MySQL database integration",
      "React.js frontend with API integration",
      "Input validation & exception handling",
      "Layered application architecture",
    ],
    github: "https://github.com/merishiii",
  },
  {
    title: "E-Commerce Web Application",
    description:
      "A full-stack e-commerce application demonstrating product management, user functionality, shopping cart operations, and order processing.",
    tech: ["Java", "Spring Boot", "React.js", "MySQL"],
    features: [
      "User authentication",
      "Product management",
      "Shopping cart & order management",
      "REST APIs with database integration",
      "Responsive UI",
      "Backend business logic",
    ],
    github: "https://github.com/merishiii",
  },
  {
    title: "Java REST API Application",
    description:
      "A backend-focused application demonstrating REST API development, business logic, database operations, validation, and exception handling.",
    tech: ["Java", "Spring Boot", "MySQL", "Postman"],
    features: [
      "RESTful API development",
      "CRUD operations",
      "MySQL integration",
      "Request validation & exception handling",
      "API testing with Postman",
      "Layered architecture",
    ],
    github: "https://github.com/merishiii",
  },
];

export const certifications = [
  {
    name: "AWS Certified Developer – Associate",
    issuer: "Amazon Web Services",
    date: "2024",
    credentialUrl: "#",
    badgeUrl: "",
  },
  {
    name: "AWS Certified SysOps Administrator – Associate",
    issuer: "Amazon Web Services",
    date: "2024",
    credentialUrl: "#",
    badgeUrl: "",
  },
  {
    name: "Cloud Certified Developer",
    issuer: "Cloud Certification Body",
    date: "2023",
    credentialUrl: "#",
    badgeUrl: "",
  },
  {
    name: "MERN Full Stack Developer",
    issuer: "Find Academy",
    date: "2023",
    credentialUrl: "#",
    badgeUrl: "",
  },
];

export const navLinks = [
  { label: "About",          href: "#about" },
  { label: "Skills",         href: "#skills" },
  { label: "Experience",     href: "#experience" },
  { label: "Projects",       href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "GitHub",         href: "#github" },
  { label: "LeetCode",       href: "#leetcode" },
  { label: "Resume",         href: "#resume" },
  { label: "Contact",        href: "#contact" },
];
