export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

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

export async function GET() {
  const token = process.env.GITHUB_TOKEN ?? "";

  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  // ── REST: profile + repos ──────────────────────────────────────────────────
  let user: Record<string, unknown> = {};
  let repos: Record<string, unknown>[] = [];

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`, { headers, cache: "no-store" }),
      fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&type=owner`, {
        headers,
        cache: "no-store",
      }),
    ]);

    if (userRes.ok) user = await userRes.json();
    if (reposRes.ok) repos = await reposRes.json();
  } catch {
    // REST failed — fall through with empty defaults
  }

  const totalStars = Array.isArray(repos)
    ? repos.reduce((acc, r) => acc + ((r.stargazers_count as number) ?? 0), 0)
    : 0;

  const langMap: Record<string, number> = {};
  if (Array.isArray(repos)) {
    for (const r of repos) {
      if (r.language) langMap[r.language as string] = (langMap[r.language as string] ?? 0) + 1;
    }
  }
  const topLanguages = Object.entries(langMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([lang, count]) => ({ lang, count }));

  // ── GraphQL: contributions ─────────────────────────────────────────────────
  let calendar: { date: string; count: number }[] = [];
  let totalContributions = 0;
  let commits = 0;
  let prs = 0;
  let issues = 0;

  if (token) {
    try {
      const now = new Date();
      const from = new Date(now);
      from.setFullYear(from.getFullYear() - 1);

      const gqlRes = await fetch(GH_GRAPHQL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify({
          query: contributionQuery,
          variables: { username: USERNAME, from: from.toISOString(), to: now.toISOString() },
        }),
        cache: "no-store",
      });

      if (gqlRes.ok) {
        const gql = await gqlRes.json();
        const col = gql?.data?.user?.contributionsCollection;
        if (col) {
          totalContributions = col.contributionCalendar?.totalContributions ?? 0;
          commits = col.totalCommitContributions ?? 0;
          prs = col.totalPullRequestContributions ?? 0;
          issues = col.totalIssueContributions ?? 0;

          for (const week of col.contributionCalendar?.weeks ?? []) {
            for (const day of week.contributionDays) {
              calendar.push({ date: day.date, count: day.contributionCount });
            }
          }
        }
      }
    } catch {
      // GraphQL failed — calendar stays empty, REST stats still returned
    }
  }

  return NextResponse.json({
    username: USERNAME,
    followers: (user.followers as number) ?? 0,
    following: (user.following as number) ?? 0,
    publicRepos: (user.public_repos as number) ?? 0,
    totalStars,
    topLanguages,
    totalContributions,
    commits,
    prs,
    issues,
    calendar,
    hasCalendar: calendar.length > 0,
  });
}
