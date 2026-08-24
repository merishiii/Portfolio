"use client";

import { motion } from "framer-motion";
import { FiGithub, FiCheckCircle } from "react-icons/fi";
import { projects } from "@/data/portfolio";
import SectionWrapper from "@/components/ui/SectionWrapper";

const featureVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07 } },
};
const featureItem = {
  hidden:  { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 180, damping: 20 } },
};

export default function Projects() {
  return (
    <SectionWrapper
      id="projects"
      label="What I've Built"
      heading="Projects"
      className="bg-gray-50 dark:bg-gray-900/50"
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.12, ease: "easeOut" }}
            whileHover={{
              y: -6,
              boxShadow: "0 20px 40px rgba(99,102,241,0.15)",
              transition: { type: "spring", stiffness: 300, damping: 20 },
            }}
            className="card flex flex-col gap-4"
          >
            {/* Title */}
            <div>
              <h3 className="font-bold text-base text-gray-900 dark:text-white leading-snug">
                {project.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Features — staggered */}
            <motion.ul
              className="flex flex-col gap-1.5"
              variants={featureVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {project.features.map((f, fi) => (
                <motion.li
                  key={fi}
                  variants={featureItem}
                  className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-300"
                >
                  <FiCheckCircle className="mt-0.5 shrink-0 text-primary" size={13} />
                  {f}
                </motion.li>
              ))}
            </motion.ul>

            {/* Footer */}
            <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-3">
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <motion.span
                    key={t}
                    whileHover={{ scale: 1.08, y: -1 }}
                    className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 cursor-default"
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 4 }}
                className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-primary transition-colors font-medium"
              >
                <FiGithub size={13} /> View on GitHub
              </motion.a>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
