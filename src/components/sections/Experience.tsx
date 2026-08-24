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
            {/* Pulsing timeline dot */}
            <div className="absolute -left-[2.85rem] top-1">
              <motion.span
                className="block w-4 h-4 rounded-full bg-primary ring-4 ring-white dark:ring-gray-950"
                animate={{ boxShadow: ["0 0 0 0 rgba(99,102,241,0.4)", "0 0 0 8px rgba(99,102,241,0)", "0 0 0 0 rgba(99,102,241,0)"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              />
            </div>

            <motion.div
              className="card"
              whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(99,102,241,0.12)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-bold text-base text-gray-900 dark:text-white">
                    {job.role}
                  </h3>
                  <p className="text-primary font-medium text-sm">{job.company}</p>
                </div>
                <div className="text-right text-xs text-gray-500 dark:text-gray-400">
                  <p className="flex items-center gap-1 justify-end">
                    <FiBriefcase size={12} /> {job.period}
                  </p>
                  <p className="flex items-center gap-1 justify-end mt-0.5">
                    <FiMapPin size={12} /> {job.location}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                {job.description}
              </p>
              <div className="flex flex-wrap gap-2">
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
