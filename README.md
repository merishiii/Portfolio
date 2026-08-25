# Personal Portfolio — Next.js + Tailwind CSS

A modern, responsive, SEO-friendly personal portfolio built with **Next.js 14**, **Tailwind CSS**, and **Framer Motion**.

## ✨ Sections
| Section | File |
|---------|------|
| Navbar | `src/components/Navbar.tsx` |
| Hero | `src/components/sections/Hero.tsx` |
| About | `src/components/sections/About.tsx` |
| Skills | `src/components/sections/Skills.tsx` |
| Experience | `src/components/sections/Experience.tsx` |
| Certifications | `src/components/sections/Certifications.tsx` |
| GitHub Stats | `src/components/sections/GithubStats.tsx` |
| LeetCode Stats | `src/components/sections/LeetcodeStats.tsx` |
| Resume | `src/components/sections/Resume.tsx` |
| Contact | `src/components/sections/Contact.tsx` |
| Footer | `src/components/Footer.tsx` |

## 🛠️ Quick Start

```bash
npm install
npm run dev
```

Open [https://rishabh-pathak.vercel.app/](https://rishabh-pathak.vercel.app/).

## ✏️ Personalisation

**All personal content lives in one file:** [`src/data/portfolio.ts`](src/data/portfolio.ts)

Edit `siteConfig`, `aboutData`, `skills`, `experience`, and `certifications` there.  
Place your resume PDF at `public/resume.pdf`.

## 🎨 Theming

Dark/light mode uses `next-themes` with the `class` strategy (Tailwind `dark:`).  
Primary colour: `#6366f1` — change in `tailwind.config.ts`.

## 📬 Contact Form

The contact form uses a stub. Replace the `setTimeout` in `Contact.tsx` with your preferred service:
- [Formspree](https://formspree.io)
- [EmailJS](https://emailjs.com)
- A Next.js API route

## 📁 Folder Structure

```
src/
├── app/             # Next.js App Router (layout, page, globals.css)
├── components/
│   ├── sections/    # One file per section
│   ├── ui/          # Shared UI primitives (SectionWrapper)
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ThemeProvider.tsx
├── data/
│   └── portfolio.ts # ← Edit your content here
└── lib/
    └── utils.ts     # cn() helper
```
