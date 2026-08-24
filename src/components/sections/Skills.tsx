"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/portfolio";
import SectionWrapper from "@/components/ui/SectionWrapper";

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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: gi * 0.07 }}
            className="card"
          >
            <h3 className="font-semibold text-sm uppercase tracking-widest text-primary mb-4">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
