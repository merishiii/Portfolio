"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { skills } from "@/data/portfolio";
import SectionWrapper from "@/components/ui/SectionWrapper";

// Proficiency levels per category (0-100)
const PROFICIENCY: Record<string, number> = {
  "Backend Development": 90,
  "Frontend Development": 75,
  "Database": 80,
  "Cloud & DevOps": 70,
  "Tools": 85,
  "Computer Science": 80,
};

const tagVariants = {
  hidden:  { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1, scale: 1,
    transition: { delay: i * 0.04, type: "spring", stiffness: 220, damping: 18 },
  }),
};

// Progress bar with animated fill + counting number
function ProgressBar({ label, value, delay }: { label: string; value: number; delay: number }) {
  const ref     = useRef<HTMLDivElement>(null);
  const inView  = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div ref={ref} className="mt-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Proficiency</span>
        <motion.span
          className="text-xs font-semibold text-primary tabular-nums"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.1 }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: delay + 0.1 }}
          >
            {inView ? (
              <CountUp to={value} delay={delay} />
            ) : "0"}%
          </motion.span>
        </motion.span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary to-violet-500"
          initial={{ width: 0 }}
          animate={inView ? { width: `${value}%` } : {}}
          transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </div>
  );
}

// Count-up number
function CountUp({ to, delay }: { to: number; delay: number }) {
  const ref    = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      onAnimationComplete={() => {
        if (!ref.current) return;
        let start = 0;
        const step = Math.ceil(to / 30);
        const timer = setInterval(() => {
          start = Math.min(start + step, to);
          if (ref.current) ref.current.textContent = start + "%";
          if (start >= to) clearInterval(timer);
        }, 25);
      }}
    >
      0%
    </motion.span>
  );
}

export default function Skills() {
  return (
    <SectionWrapper
      id="skills"
      label="What I Work With"
      heading="Skills & Technologies"
      className="bg-gray-50 dark:bg-gray-900/50"
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((group, gi) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: gi * 0.07, ease: "easeOut" }}
            whileHover={{ y: -4, boxShadow: "0 12px 28px rgba(99,102,241,0.11)" }}
            className="card transition-shadow duration-200"
          >
            <h3 className="font-semibold text-sm uppercase tracking-widest text-primary mb-4">
              {group.category}
            </h3>

            {/* Skill tags */}
            <motion.div
              className="flex flex-wrap gap-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {group.items.map((skill, si) => (
                <motion.span
                  key={skill}
                  custom={si}
                  variants={tagVariants}
                  whileHover={{ scale: 1.08, y: -1 }}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900 cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>

            {/* Animated proficiency bar */}
            {PROFICIENCY[group.category] && (
              <ProgressBar
                label={group.category}
                value={PROFICIENCY[group.category]}
                delay={gi * 0.07 + 0.15}
              />
            )}
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
