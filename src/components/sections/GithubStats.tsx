// Server Component — fetches GitHub data directly (no self-HTTP call, always fresh in dev).
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
const GH_GRAPHQL = "https://api.github.com/graphql";

const contributionQuery = `
  query($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
        totalCommitContributions
        totalPullRequestContributions
        totalIssueContributions
      }
    }
  }
`;

async function fetchGithubData(): Promise<GithubData> {
  const fallback: GithubData = {
    username: USERNAME,
    followers: 0, following: 0, publicRepos: 0, totalStars: 0,
    totalContributions: 0, commits: 0, prs: 0, issues: 0,
    topLanguages: [], calendar: [], hasCalendar: false,
  };

  try {
    const token = process.env.GITHUB_TOKEN;
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    // REST: profile + repos
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`, { headers, cache: "no-store" }),
      fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&type=owner`, { headers, cache: "no-store" }),
    ]);

    const user  = userRes.ok  ? await userRes.json()  : {};
    const repos = reposRes.ok ? await reposRes.json() : [];

    const totalStars = Array.isArray(repos)
      ? repos.reduce((acc: number, r: { stargazers_count: number }) => acc + r.stargazers_count, 0)
      : 0;

    const langMap: Record<string, number> = {};
    if (Array.isArray(repos)) {
      for (const r of repos) {
        if (r.language) langMap[r.language] = (langMap[r.language] ?? 0) + 1;
      }
    }
    const topLanguages = Object.entries(langMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([lang, count]) => ({ lang, count }));

    // GraphQL: contribution calendar (token required)
    let calendar: { date: string; count: number }[] = [];
    let totalContributions = 0, commits = 0, prs = 0, issues = 0;

    if (token) {
      const now = new Date();
      const from = new Date(now);
      from.setFullYear(from.getFullYear() - 1);
      const gqlRes = await fetch(GH_GRAPHQL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `bearer ${token}` },
        body: JSON.stringify({
          query: contributionQuery,
          variables: { username: USERNAME, from: from.toISOString(), to: now.toISOString() },
        }),
        cache: "no-store",
      });
      if (gqlRes.ok) {
        const gql = await gqlRes.json();
        const col = gql?.data?.user?.contributionsCollection;
        totalContributions = col?.contributionCalendar?.totalContributions ?? 0;
        commits  = col?.totalCommitContributions        ?? 0;
        prs      = col?.totalPullRequestContributions   ?? 0;
        issues   = col?.totalIssueContributions         ?? 0;
        for (const week of col?.contributionCalendar?.weeks ?? []) {
          for (const day of week.contributionDays) {
            calendar.push({ date: day.date, count: day.contributionCount });
          }
        }
      }
    }

    return {
      username: USERNAME,
      followers:  user.followers   ?? 0,
      following:  user.following   ?? 0,
      publicRepos: user.public_repos ?? 0,
      totalStars,
      topLanguages,
      totalContributions,
      commits, prs, issues,
      calendar,
      hasCalendar: calendar.length > 0,
    };
  } catch {
    return fallback;
  }
}

export default async function GithubStats() {
  const data = await fetchGithubData();

  return (
    <SectionWrapper
      id="github"
      label="Open Source"
      heading="GitHub Activity"
      className="bg-gray-50 dark:bg-gray-900/50"
    >
      <GithubClient data={data} />
      <div className="mt-8 text-center">
        <a
          href={`https://github.com/${data.username}`}
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
