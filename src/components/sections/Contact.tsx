"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiMail,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiSend,
} from "react-icons/fi";
import { siteConfig } from "@/data/portfolio";
import SectionWrapper from "@/components/ui/SectionWrapper";

type FormState = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<FormState>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // ── Replace this with your preferred form service (Formspree, EmailJS, etc.) ──
    try {
      await new Promise((r) => setTimeout(r, 1000)); // stub delay
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const socials = [
    { Icon: FiGithub, href: siteConfig.github, label: "GitHub" },
    { Icon: FiLinkedin, href: siteConfig.linkedin, label: "LinkedIn" },
    { Icon: FiTwitter, href: siteConfig.twitter, label: "Twitter" },
  ];

  const inputCls =
    "w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition";

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
        <motion.form
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <input
            name="name"
            type="text"
            placeholder="Your Name"
            required
            value={form.name}
            onChange={handleChange}
            className={inputCls}
          />
          <input
            name="email"
            type="email"
            placeholder="Your Email"
            required
            value={form.email}
            onChange={handleChange}
            className={inputCls}
          />
          <textarea
            name="message"
            rows={5}
            placeholder="Your Message"
            required
            value={form.message}
            onChange={handleChange}
            className={inputCls}
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="btn-primary justify-center disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <FiSend size={15} />
            {status === "sending" ? "Sending…" : "Send Message"}
          </button>

          {status === "success" && (
            <p className="text-sm text-green-600 dark:text-green-400 text-center">
              ✓ Message sent! I&apos;ll get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-500 text-center">
              Something went wrong. Please try again.
            </p>
          )}
        </motion.form>
      </div>
    </SectionWrapper>
  );
}
