"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { FiGithub, FiLinkedin, FiMail, FiArrowDown } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { siteConfig } from "@/data/portfolio";

// ── prefers-reduced-motion hook ───────────────────────────────────────────────
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return mobile;
}

// ── Typewriter cycling titles ────────────────────────────────────────────────
const TITLES = [
  "Full-Stack Java Developer",
  "Spring Boot Engineer",
  "React Developer",
  "Cloud & AWS Enthusiast",
  "Backend Architect",
];

function Typewriter() {
  const [idx, setIdx]       = useState(0);
  const [text, setText]     = useState("");
  const [deleting, setDeleting] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) { setText(TITLES[0]); return; }
    const current = TITLES[idx];
    if (!deleting && text === current) {
      timeout.current = setTimeout(() => setDeleting(true), 4000); // 4s per title
    } else if (deleting && text === "") {
      setDeleting(false);
      setIdx((i) => (i + 1) % TITLES.length);
    } else {
      timeout.current = setTimeout(() => {
        setText(deleting ? text.slice(0, -1) : current.slice(0, text.length + 1));
      }, deleting ? 35 : 65);
    }
    return () => { if (timeout.current) clearTimeout(timeout.current); };
  }, [text, deleting, idx, reduced]);

  return (
    <span className="text-xl sm:text-2xl font-medium text-gray-600 dark:text-gray-300">
      {text}
      <motion.span
        animate={reduced ? {} : { opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.6, ease: "linear" }}
        className="inline-block ml-0.5 w-0.5 h-5 bg-primary align-middle"
      />
    </span>
  );
}

// ── Floating orb — desktop only ──────────────────────────────────────────────
function Orb({ x, y, size, color, duration }: {
  x: string; y: string; size: number; color: string; duration: number;
}) {
  const reduced = usePrefersReducedMotion();
  const mobile  = useIsMobile();
  if (mobile) return null; // no orbs on mobile — saves battery
  return (
    <motion.div
      aria-hidden
      className="absolute rounded-full blur-3xl pointer-events-none"
      style={{ left: x, top: y, width: size, height: size, background: color }}
      animate={reduced ? {} : { y: [0, -28, 0], x: [0, 12, 0], scale: [1, 1.06, 1] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

// ── Avatar — single subtle ring, reduced magnetic sensitivity ────────────────
function Avatar() {
  const x       = useMotionValue(0);
  const y       = useMotionValue(0);
  const sx      = useSpring(x, { stiffness: 80, damping: 20 }); // reduced stiffness
  const sy      = useSpring(y, { stiffness: 80, damping: 20 });
  const reduced = usePrefersReducedMotion();
  const mobile  = useIsMobile();

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || mobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top  + rect.height / 2;
    x.set((e.clientX - cx) * 0.12); // was 0.25 — 50% less sensitive
    y.set((e.clientY - cy) * 0.12);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
      className="flex justify-center mb-6"
      onMouseMove={handleMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      <div className="relative">
        {/* Single subtle pulse ring */}
        {!reduced && (
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/15"
            animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
          />
        )}
        <motion.div
          style={{ x: sx, y: sy }}
          className="relative w-28 h-28 rounded-full ring-4 ring-primary/30 overflow-hidden shadow-xl"
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
  const reduced = usePrefersReducedMotion();
  const letters = name.split("");

  if (reduced) {
    return (
      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
        {name}
      </h1>
    );
  }

  return (
    <motion.h1
      className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.035, delayChildren: 0.25 } } }}
    >
      {letters.map((l, i) => (
        <motion.span
          key={i}
          variants={{
            hidden:  { opacity: 0, y: 32 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
          className="inline-block"
        >
          {l === " " ? "\u00A0" : l}
        </motion.span>
      ))}
    </motion.h1>
  );
}

// ── Scroll indicator — hides after first scroll ──────────────────────────────
function ScrollIndicator() {
  const [visible, setVisible] = useState(true);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const onScroll = () => { if (window.scrollY > 40) setVisible(false); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.a
      href="#about"
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 hover:text-primary transition-colors pointer-events-auto"
      aria-label="Scroll down"
      style={{ pointerEvents: visible ? "auto" : "none" }}
    >
      <motion.div
        animate={reduced ? {} : { y: [0, 7, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
      >
        <FiArrowDown size={22} />
      </motion.div>
    </motion.a>
  );
}

// ── Socials ───────────────────────────────────────────────────────────────────
const socials = [
  { Icon: FiGithub,   href: siteConfig.github,            label: "GitHub"   },
  { Icon: FiLinkedin, href: siteConfig.linkedin,          label: "LinkedIn" },
  { Icon: FaXTwitter, href: siteConfig.twitter,           label: "X"        },
  { Icon: FiMail,     href: `mailto:${siteConfig.email}`, label: "Email"    },
];

// ── Hero ──────────────────────────────────────────────────────────────────────
export default function Hero() {
  const reduced = usePrefersReducedMotion();

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

      {/* Orbs — desktop only */}
      <Orb x="8%"   y="12%" size={320} color="rgba(99,102,241,0.11)"  duration={7}  />
      <Orb x="68%"  y="58%" size={260} color="rgba(6,182,212,0.09)"   duration={9}  />
      <Orb x="52%"  y="4%"  size={180} color="rgba(139,92,246,0.07)"  duration={11} />
      <Orb x="-4%"  y="58%" size={220} color="rgba(99,102,241,0.07)"  duration={8}  />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <Avatar />

        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="text-primary font-mono text-sm mb-3 tracking-widest uppercase"
        >
          Hello, World 👋
        </motion.p>

        {/* Name */}
        <AnimatedName name={siteConfig.name} />

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          className="mb-6 h-8 flex items-center justify-center"
        >
          <Typewriter />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.45 }}
          className="max-w-xl mx-auto text-gray-500 dark:text-gray-400 text-base sm:text-lg mb-10"
        >
          {siteConfig.description}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <motion.a
            href="#projects"
            className="btn-primary"
            whileHover={reduced ? {} : { scale: 1.04, boxShadow: "0 6px 20px rgba(99,102,241,0.30)" }}
            whileTap={{ scale: 0.97 }}
          >
            View My Work
          </motion.a>
          <motion.a
            href="#contact"
            className="btn-outline"
            whileHover={reduced ? {} : { scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Contact Me
          </motion.a>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="flex justify-center gap-5"
        >
          {socials.map(({ Icon, href, label }, i) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + i * 0.08 }}
              whileHover={reduced ? {} : { scale: 1.18, y: -3 }}
              whileTap={{ scale: 0.92 }}
              className="p-2 rounded-lg text-gray-500 hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <Icon size={20} />
            </motion.a>
          ))}
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
