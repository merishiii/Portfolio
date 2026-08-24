import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import { siteConfig, navLinks } from "@/data/portfolio";

export default function Footer() {
  const year = new Date().getFullYear();
  const socials = [
    { Icon: FiGithub, href: siteConfig.github, label: "GitHub" },
    { Icon: FiLinkedin, href: siteConfig.linkedin, label: "LinkedIn" },
    { Icon: FiTwitter, href: siteConfig.twitter, label: "Twitter" },
  ];

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs text-gray-500 hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex gap-3">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2 rounded-lg text-gray-400 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-gray-400">
          © {year} Rishabh Pathak. Built with passion and code.
        </p>
      </div>
    </footer>
  );
}
