"use client";

import { motion } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";
import { FiMail, FiGithub, FiLinkedin, FiSend } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { siteConfig } from "@/data/portfolio";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function Contact() {
  const [state, handleSubmit] = useForm("xwledvva");

  const socials = [
    { Icon: FiGithub,   href: siteConfig.github,   label: "GitHub" },
    { Icon: FiLinkedin, href: siteConfig.linkedin,  label: "LinkedIn" },
    { Icon: FaXTwitter, href: siteConfig.twitter,   label: "X" },
  ];

  const inputCls =
    "w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition";

  const errorCls = "text-xs text-red-500 -mt-2";

  return (
    <SectionWrapper id="contact" label="Reach Out" heading="Let's Build Something Great">
      <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">

        {/* Left – info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center gap-6"
        >
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            I&apos;m always interested in exploring new technologies, building impactful
            applications, and connecting with people who share a passion for software
            development. Let&apos;s connect and build something meaningful together.
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-3 text-primary font-medium hover:underline"
          >
            <FiMail size={18} /> {siteConfig.email}
          </a>
          <div className="flex gap-4">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-primary hover:border-primary transition-colors"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right – form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          {state.succeeded ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-12">
              <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center">
                <svg className="w-7 h-7 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">Message sent!</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Thanks for reaching out. I&apos;ll get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Name */}
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your Name"
                required
                className={inputCls}
              />
              <ValidationError field="name" prefix="Name" errors={state.errors} className={errorCls} />

              {/* Email */}
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Your Email"
                required
                className={inputCls}
              />
              <ValidationError field="email" prefix="Email" errors={state.errors} className={errorCls} />

              {/* Message */}
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Your Message"
                required
                className={inputCls}
              />
              <ValidationError field="message" prefix="Message" errors={state.errors} className={errorCls} />

              <button
                type="submit"
                disabled={state.submitting}
                className="btn-primary justify-center disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <FiSend size={15} />
                {state.submitting ? "Sending…" : "Send Message"}
              </button>

              {/* Top-level form errors */}
              <ValidationError errors={state.errors} className={errorCls + " text-center"} />
            </form>
          )}
        </motion.div>

      </div>
    </SectionWrapper>
  );
}
