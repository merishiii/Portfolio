"use client";

import { motion } from "framer-motion";
import { FiAward, FiExternalLink } from "react-icons/fi";
import { certifications } from "@/data/portfolio";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function Certifications() {
  return (
    <SectionWrapper id="certifications" label="Credentials" heading="Certifications">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="card flex flex-col gap-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <FiAward className="text-primary" size={20} />
              </div>
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View credential"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <FiExternalLink size={16} />
              </a>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-900 dark:text-white leading-snug">
                {cert.name}
              </h3>
              <p className="text-xs text-primary mt-1">{cert.issuer}</p>
              <p className="text-xs text-gray-400 mt-0.5">{cert.date}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
