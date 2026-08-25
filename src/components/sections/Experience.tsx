"use client";

import { motion } from "framer-motion";
import { FiBriefcase, FiMapPin } from "react-icons/fi";
import { experience } from "@/data/portfolio";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function Experience() {
  return (
    <SectionWrapper
      id="experience"
      label="Career"
      heading="Work Experience"
      className="bg-gray-50 dark:bg-gray-900/50"
    >
      <div className="relative border-l-2 border-primary/30 ml-3 pl-8 space-y-10">
        {experience.map((job, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            className="relative"
          >
            {/* Timeline dot — pulses only for the current/first role */}
            <div className="absolute -left-[2.85rem] top-1">
              <motion.span
                className="block w-4 h-4 rounded-full bg-primary ring-4 ring-white dark:ring-gray-950"
                animate={
                  i === 0
                    ? { boxShadow: ["0 0 0 0 rgba(99,102,241,0.4)", "0 0 0 8px rgba(99,102,241,0)", "0 0 0 0 rgba(99,102,241,0)"] }
                    : {}
                }
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              />
            </div>

            <motion.div
              className="card p-6"
              whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(99,102,241,0.12)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* ── Header ── */}
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                {/* Left: company + role */}
                <div className="flex flex-col gap-0.5">
                  <p className="text-primary font-semibold text-sm tracking-wide uppercase">
                    {job.company}
                  </p>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white leading-snug">
                    {job.role}
                  </h3>
                </div>

                {/* Right: period + location */}
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full">
                    <FiBriefcase size={11} />
                    {job.period}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
                    <FiMapPin size={11} />
                    {job.location}
                  </span>
                </div>
              </div>

              {/* ── Bullet points ── */}
              <ul className="mb-5 space-y-2">
                {job.bullets.map((point, bi) => (
                  <motion.li
                    key={bi}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + bi * 0.06, duration: 0.3 }}
                    className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-300 leading-relaxed"
                  >
                    <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                    {point}
                  </motion.li>
                ))}
              </ul>

              {/* ── Tech chips ── */}
              <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100 dark:border-gray-800">
                {job.tech.map((t, ti) => (
                  <motion.span
                    key={t}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: ti * 0.05 }}
                    whileHover={{ scale: 1.08, y: -1 }}
                    className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 cursor-default"
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
