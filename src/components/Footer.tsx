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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 sm:gap-x-5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs text-gray-500 hover:text-primary transition-colors py-1"
                style={{ minHeight: 44, display: "inline-flex", alignItems: "center" }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex gap-2">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2.5 rounded-lg text-gray-400 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                style={{ minWidth: 44, minHeight: 44, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <p className="mt-6 sm:mt-8 text-center text-xs text-gray-400">
          © {year} Rishabh Pathak. Built with passion and code.
        </p>
      </div>
    </footer>
  );
}
