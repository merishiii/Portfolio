"use client";

import { motion } from "framer-motion";
import { FiMapPin, FiMail, FiCheckCircle } from "react-icons/fi";
import { aboutData, siteConfig } from "@/data/portfolio";
import SectionWrapper from "@/components/ui/SectionWrapper";

// stagger 80ms — professional, not too spaced
const container = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden:  { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 140, damping: 20 } },
};

export default function About() {
  return (
    <SectionWrapper id="about" label="About Me" heading="Who I Am">
      <div className="grid md:grid-cols-2 gap-10 items-start">

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base sm:text-lg whitespace-pre-line">
            {aboutData.bio}
          </p>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="mt-6 flex flex-col gap-2 text-sm text-gray-500 dark:text-gray-400"
          >
            <span className="flex items-center gap-2">
              <FiMapPin className="text-primary" /> {siteConfig.location}
            </span>
            <span className="flex items-center gap-2">
              <FiMail className="text-primary" /> {siteConfig.email}
            </span>
          </motion.div>
        </motion.div>

        {/* Highlights — stagger slide-in from left (no wiggle) */}
        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-3"
        >
          {aboutData.highlights.map((highlight, i) => (
            <motion.li
              key={i}
              variants={item}
              whileHover={{ x: 4, transition: { type: "spring", stiffness: 300, damping: 25 } }}
              className="flex items-start gap-3 card !py-3 !px-4 cursor-default"
            >
              {/* Simple slide-in icon — no wiggle */}
              <FiCheckCircle className="mt-0.5 shrink-0 text-primary" size={18} />
              <span className="text-gray-700 dark:text-gray-300 text-sm">{highlight}</span>
            </motion.li>
          ))}
        </motion.ul>

      </div>
    </SectionWrapper>
  );
}
