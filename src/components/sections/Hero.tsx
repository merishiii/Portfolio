"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiMail,
  FiArrowDown,
} from "react-icons/fi";
import { siteConfig } from "@/data/portfolio";

const socials = [
  { Icon: FiGithub, href: siteConfig.github, label: "GitHub" },
  { Icon: FiLinkedin, href: siteConfig.linkedin, label: "LinkedIn" },
  { Icon: FiTwitter, href: siteConfig.twitter, label: "Twitter" },
  { Icon: FiMail, href: `mailto:${siteConfig.email}`, label: "Email" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-indigo-50 to-cyan-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 px-4"
    >
      {/* Background grid decoration */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_right,#6366f110_1px,transparent_1px),linear-gradient(to_bottom,#6366f110_1px,transparent_1px)] bg-[size:48px_48px]"
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <div className="relative w-28 h-28 rounded-full ring-4 ring-primary/30 overflow-hidden shadow-xl">
            <Image
              src={siteConfig.avatarUrl}
              alt={siteConfig.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-primary font-mono text-sm mb-3 tracking-widest uppercase"
        >
          Hello, World 👋
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4"
        >
          {siteConfig.name}
        </motion.h1>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl sm:text-2xl font-medium text-gray-600 dark:text-gray-300 mb-6"
        >
          {siteConfig.title}
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-xl mx-auto text-gray-500 dark:text-gray-400 text-base sm:text-lg mb-10"
        >
          {siteConfig.description}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <a href="#projects" className="btn-primary">
            View My Work
          </a>
          <a href="#contact" className="btn-outline">
            Contact Me
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex justify-center gap-5"
        >
          {socials.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="p-2 rounded-lg text-gray-500 hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <Icon size={20} />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 hover:text-primary transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <FiArrowDown size={22} />
      </motion.a>
    </section>
  );
}
