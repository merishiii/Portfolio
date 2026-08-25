"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { HiSun, HiMoon, HiMenuAlt3, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig, navLinks } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive]     = useState("");

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);

    const sections = navLinks.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur border-b border-gray-200 dark:border-gray-800 shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 sm:h-16">
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="shrink-0">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-bold text-base sm:text-lg tracking-tight text-primary hover:opacity-80 transition-opacity whitespace-nowrap"
          >
            {siteConfig.name.split(" ")[0]}
            <span className="text-gray-900 dark:text-white">
              .{siteConfig.name.split(" ")[1]?.charAt(0) ?? "dev"}
            </span>
          </button>
        </motion.div>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-5 lg:gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <li key={link.href} className="relative">
              <a
                href={link.href}
                className={cn(
                  "transition-colors py-1",
                  active === link.href.replace("#", "")
                    ? "text-primary"
                    : "text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary"
                )}
              >
                {link.label}
              </a>
              {active === link.href.replace("#", "") && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </li>
          ))}
        </ul>

        {/* Theme toggle + hamburger */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {mounted && (
            <motion.button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              whileHover={{ rotate: 20, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg text-gray-500 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              style={{ minWidth: 44, minHeight: 44, display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{    rotate:  90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="block"
                >
                  {theme === "dark" ? <HiSun size={18} /> : <HiMoon size={18} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          )}
          <motion.button
            className="md:hidden p-2 rounded-lg text-gray-500 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
            style={{ minWidth: 44, minHeight: 44, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0,   opacity: 1 }}
                exit={{    rotate:  90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="block"
              >
                {menuOpen ? <HiX size={20} /> : <HiMenuAlt3 size={20} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{    height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800"
          >
            <ul className="flex flex-col gap-1 px-4 py-3 text-sm font-medium">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "flex items-center py-3 px-3 rounded-lg transition-colors",
                      active === link.href.replace("#", "")
                        ? "text-primary bg-primary/5 font-semibold"
                        : "text-gray-600 dark:text-gray-400 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-900"
                    )}
                    style={{ minHeight: 44 }}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
