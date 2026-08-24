"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/portfolio";
import SectionWrapper from "@/components/ui/SectionWrapper";

const tagVariants = {
  hidden:  { opacity: 0, scale: 0.7 },
  visible: (i: number) => ({
    opacity: 1, scale: 1,
    transition: { delay: i * 0.04, type: "spring", stiffness: 200, damping: 15 },
  }),
};

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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: gi * 0.08, ease: "easeOut" }}
            whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(99,102,241,0.12)" }}
            className="card transition-shadow duration-300"
          >
            <h3 className="font-semibold text-sm uppercase tracking-widest text-primary mb-4">
              {group.category}
            </h3>
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
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900 cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
