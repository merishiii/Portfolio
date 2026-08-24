"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { FiGithub, FiLinkedin, FiMail, FiArrowDown } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { siteConfig } from "@/data/portfolio";

// ── Typewriter cycling titles ────────────────────────────────────────────────
const TITLES = [
  "Full-Stack Java Developer",
  "Spring Boot Engineer",
  "React Developer",
  "Cloud & AWS Enthusiast",
  "Backend Architect",
];

function Typewriter() {
  const [idx, setIdx]   = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = TITLES[idx];
    if (!deleting && text === current) {
      timeout.current = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIdx((i) => (i + 1) % TITLES.length);
    } else {
      timeout.current = setTimeout(() => {
        setText(deleting ? text.slice(0, -1) : current.slice(0, text.length + 1));
      }, deleting ? 40 : 70);
    }
    return () => { if (timeout.current) clearTimeout(timeout.current); };
  }, [text, deleting, idx]);

  return (
    <span className="text-xl sm:text-2xl font-medium text-gray-600 dark:text-gray-300">
      {text}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }}
        className="inline-block ml-0.5 w-0.5 h-6 bg-primary align-middle"
      />
    </span>
  );
}

// ── Floating background orb ──────────────────────────────────────────────────
function Orb({ x, y, size, color, duration }: {
  x: string; y: string; size: number; color: string; duration: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full blur-3xl pointer-events-none"
      style={{ left: x, top: y, width: size, height: size, background: color }}
      animate={{ y: [0, -30, 0], x: [0, 15, 0], scale: [1, 1.08, 1] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

// ── Avatar with magnetic hover ───────────────────────────────────────────────
function Avatar() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 15 });
  const sy = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.25);
    y.set((e.clientY - cy) * 0.25);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
      className="flex justify-center mb-6"
      onMouseMove={handleMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {/* Pulsing ring */}
      <div className="relative">
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/20"
          animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/10"
          animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
        />
        <motion.div
          style={{ x: sx, y: sy }}
          className="relative w-28 h-28 rounded-full ring-4 ring-primary/40 overflow-hidden shadow-2xl"
        >
          <Image
            src={siteConfig.avatarUrl}
            alt={siteConfig.name}
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

// ── Letter-split name animation ──────────────────────────────────────────────
function AnimatedName({ name }: { name: string }) {
  const letters = name.split("");
  return (
    <motion.h1
      className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.04, delayChildren: 0.3 } } }}
    >
      {letters.map((l, i) => (
        <motion.span
          key={i}
          variants={{
            hidden:  { opacity: 0, y: 40, rotateX: -90 },
            visible: { opacity: 1, y: 0,  rotateX: 0 },
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="inline-block"
          style={{ transformOrigin: "bottom center" }}
        >
          {l === " " ? "\u00A0" : l}
        </motion.span>
      ))}
    </motion.h1>
  );
}

// ── Socials ──────────────────────────────────────────────────────────────────
const socials = [
  { Icon: FiGithub,   href: siteConfig.github,                label: "GitHub" },
  { Icon: FiLinkedin, href: siteConfig.linkedin,              label: "LinkedIn" },
  { Icon: FaXTwitter, href: siteConfig.twitter,               label: "X" },
  { Icon: FiMail,     href: `mailto:${siteConfig.email}`,     label: "Email" },
];

// ── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-indigo-50 to-cyan-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 px-4"
    >
      {/* Grid */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_right,#6366f110_1px,transparent_1px),linear-gradient(to_bottom,#6366f110_1px,transparent_1px)] bg-[size:48px_48px]"
      />

      {/* Floating orbs */}
      <Orb x="10%"  y="15%" size={340} color="rgba(99,102,241,0.12)"  duration={7} />
      <Orb x="70%"  y="60%" size={280} color="rgba(6,182,212,0.10)"   duration={9} />
      <Orb x="55%"  y="5%"  size={200} color="rgba(139,92,246,0.08)"  duration={11} />
      <Orb x="-5%"  y="60%" size={240} color="rgba(99,102,241,0.08)"  duration={8} />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <Avatar />

        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-primary font-mono text-sm mb-3 tracking-widest uppercase"
        >
          Hello, World 👋
        </motion.p>

        {/* Name — letter by letter */}
        <AnimatedName name={siteConfig.name} />

        {/* Typewriter title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-6 h-8 flex items-center justify-center"
        >
          <Typewriter />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="max-w-xl mx-auto text-gray-500 dark:text-gray-400 text-base sm:text-lg mb-10"
        >
          {siteConfig.description}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <motion.a
            href="#projects"
            className="btn-primary"
            whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(99,102,241,0.35)" }}
            whileTap={{ scale: 0.97 }}
          >
            View My Work
          </motion.a>
          <motion.a
            href="#contact"
            className="btn-outline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Contact Me
          </motion.a>
        </motion.div>

        {/* Social icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex justify-center gap-5"
        >
          {socials.map(({ Icon, href, label }, i) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + i * 0.1 }}
              whileHover={{ scale: 1.2, y: -4 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg text-gray-500 hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <Icon size={20} />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 hover:text-primary transition-colors"
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <FiArrowDown size={22} />
        </motion.div>
      </motion.a>
    </section>
  );
}
