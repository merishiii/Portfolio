"use client";

import { motion } from "framer-motion";
import { FiGithub, FiCheckCircle } from "react-icons/fi";
import { projects } from "@/data/portfolio";
import SectionWrapper from "@/components/ui/SectionWrapper";

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
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
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

            {/* Features */}
            <ul className="flex flex-col gap-1.5">
              {project.features.map((f, fi) => (
                <li key={fi} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-300">
                  <FiCheckCircle className="mt-0.5 shrink-0 text-primary" size={13} />
                  {f}
                </li>
              ))}
            </ul>

            {/* Footer: tech tags + GitHub link */}
            <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-3">
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-primary transition-colors font-medium"
              >
                <FiGithub size={13} /> View on GitHub
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
