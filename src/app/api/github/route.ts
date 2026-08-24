import { NextResponse } from "next/server";

const USERNAME = "merishiii";

// GitHub GraphQL API — contribution calendar requires GraphQL
// Uses GITHUB_TOKEN env var if present; falls back to unauthenticated REST for basic stats
const GH_GRAPHQL = "https://api.github.com/graphql";

const contributionQuery = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
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
        totalRepositoryContributions
      }
    }
  }
`;

async function fetchContributions(token: string) {
  const res = await fetch(GH_GRAPHQL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify({ query: contributionQuery, variables: { username: USERNAME } }),
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("GraphQL error");
  return res.json();
}

async function fetchRestStats() {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${USERNAME}`, { headers, next: { revalidate: 3600 } }),
    fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&type=owner`, {
      headers,
      next: { revalidate: 3600 },
    }),
  ]);

  const user = userRes.ok ? await userRes.json() : {};
  const repos = reposRes.ok ? await reposRes.json() : [];

  const totalStars = Array.isArray(repos)
    ? repos.reduce((acc: number, r: { stargazers_count: number }) => acc + r.stargazers_count, 0)
    : 0;

  // Top languages by repo count
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

  return {
    followers: user.followers ?? 0,
    following: user.following ?? 0,
    publicRepos: user.public_repos ?? 0,
    totalStars,
    topLanguages,
  };
}

export async function GET() {
  try {
    const token = process.env.GITHUB_TOKEN ?? "";
    const restStats = await fetchRestStats();

    // Contribution calendar only available via GraphQL (needs token)
    let calendar: { date: string; count: number }[] = [];
    let totalContributions = 0;
    let commits = 0;
    let prs = 0;
    let issues = 0;

    if (token) {
      try {
        const gql = await fetchContributions(token);
        const col = gql?.data?.user?.contributionsCollection;
        totalContributions = col?.contributionCalendar?.totalContributions ?? 0;
        commits = col?.totalCommitContributions ?? 0;
        prs = col?.totalPullRequestContributions ?? 0;
        issues = col?.totalIssueContributions ?? 0;

        // Flatten weeks → days
        for (const week of col?.contributionCalendar?.weeks ?? []) {
          for (const day of week.contributionDays) {
            calendar.push({ date: day.date, count: day.contributionCount });
          }
        }
      } catch {
        // GraphQL failed — calendar will be empty, REST stats still shown
      }
    }

    return NextResponse.json({
      username: USERNAME,
      ...restStats,
      totalContributions,
      commits,
      prs,
      issues,
      calendar,
      hasCalendar: calendar.length > 0,
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch GitHub data" }, { status: 500 });
  }
}
