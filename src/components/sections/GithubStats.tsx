import { FiExternalLink } from "react-icons/fi";
import SectionWrapper from "@/components/ui/SectionWrapper";
import GithubClient from "./GithubClient";

export interface GithubData {
  username: string;
  followers: number;
  following: number;
  publicRepos: number;
  totalStars: number;
  totalContributions: number;
  commits: number;
  prs: number;
  issues: number;
  topLanguages: { lang: string; count: number }[];
  calendar: { date: string; count: number }[];
  hasCalendar: boolean;
  error?: string;
}

const USERNAME = "merishiii";

export default function GithubStats() {
  return (
    <SectionWrapper
      id="github"
      label="Open Source"
      heading="GitHub Activity"
      className="bg-gray-50 dark:bg-gray-900/50"
    >
      <GithubClient />
      <div className="mt-8 text-center">
        <a
          href={`https://github.com/${USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline inline-flex items-center gap-2 text-sm"
        >
          <FiExternalLink size={14} />
          View on GitHub
        </a>
      </div>
    </SectionWrapper>
  );
}
