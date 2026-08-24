"use client";

import { motion } from "framer-motion";
import { FiMapPin, FiMail, FiCheckCircle } from "react-icons/fi";
import { aboutData, siteConfig } from "@/data/portfolio";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function About() {
  return (
    <SectionWrapper id="about" label="About Me" heading="Who I Am">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base sm:text-lg whitespace-pre-line">
            {aboutData.bio}
          </p>
          <div className="mt-6 flex flex-col gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-2">
              <FiMapPin className="text-primary" /> {siteConfig.location}
            </span>
            <span className="flex items-center gap-2">
              <FiMail className="text-primary" /> {siteConfig.email}
            </span>
          </div>
        </motion.div>

        {/* Highlights */}
        <motion.ul
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-3"
        >
          {aboutData.highlights.map((item, i) => (
            <li key={i} className="flex items-start gap-3 card !py-3 !px-4">
              <FiCheckCircle className="mt-0.5 shrink-0 text-primary" size={18} />
              <span className="text-gray-700 dark:text-gray-300 text-sm">{item}</span>
            </li>
          ))}
        </motion.ul>
      </div>
    </SectionWrapper>
  );
}
