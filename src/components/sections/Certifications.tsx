"use client";

import { motion } from "framer-motion";
import { FiAward, FiExternalLink } from "react-icons/fi";
import { certifications } from "@/data/portfolio";
import SectionWrapper from "@/components/ui/SectionWrapper";

// Container stagger — each card enters 80ms after the previous
const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: "spring", stiffness: 140, damping: 20 },
  },
};

// Content inside each card staggers after the card itself
const contentVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const contentItem = {
  hidden:  { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

export default function Certifications() {
  return (
    <SectionWrapper id="certifications" label="Credentials" heading="Certifications">
      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
      >
        {certifications.map((cert, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            whileHover={{
              y: -6,
              boxShadow: "0 16px 36px rgba(99,102,241,0.13)",
              transition: { type: "spring", stiffness: 300, damping: 22 },
            }}
            className="card flex flex-col gap-3 group"
          >
            {/* Icon + link row */}
            <div className="flex items-start justify-between gap-3">

              {/* Award icon — scales up on card hover */}
              <motion.div
                className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0"
                whileHover={{ scale: 1.12, backgroundColor: "rgba(99,102,241,0.18)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.span
                  animate={{ rotate: [0, -8, 8, 0] }}
                  transition={{ duration: 0.6, delay: i * 0.25, repeat: Infinity, repeatDelay: 5 }}
                >
                  <FiAward className="text-primary" size={20} />
                </motion.span>
              </motion.div>

              {/* External link — slides in on hover */}
              <motion.a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View credential"
                whileHover={{ scale: 1.15, x: 2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <FiExternalLink size={16} />
              </motion.a>
            </div>

            {/* Text content — staggered */}
            <motion.div variants={contentVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.h3
                variants={contentItem}
                className="font-semibold text-sm text-gray-900 dark:text-white leading-snug"
              >
                {cert.name}
              </motion.h3>
              <motion.p variants={contentItem} className="text-xs text-primary mt-1">
                {cert.issuer}
              </motion.p>
              <motion.p variants={contentItem} className="text-xs text-gray-400 mt-0.5">
                {cert.date}
              </motion.p>
            </motion.div>

            {/* Animated bottom border on hover */}
            <motion.div
              className="h-0.5 rounded-full bg-gradient-to-r from-primary to-violet-500 origin-left"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            />
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
