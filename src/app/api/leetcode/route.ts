import { NextResponse } from "next/server";

const LEETCODE_API = "https://leetcode.com/graphql";

const query = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      username
      profile {
        ranking
        reputation
      }
      submitStats: submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
      }
      userCalendar {
        activeYears
        streak
        totalActiveDays
        submissionCalendar
      }
    }
  }
`;

export async function GET() {
  const username = "Rishabh_pathak";

  try {
    const res = await fetch(LEETCODE_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
      },
      body: JSON.stringify({ query, variables: { username } }),
      next: { revalidate: 3600 }, // cache for 1 hour
    });

    if (!res.ok) {
      return NextResponse.json({ error: "LeetCode API error" }, { status: 502 });
    }

    const json = await res.json();
    const user = json?.data?.matchedUser;

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Parse submission calendar: { "timestamp": count, ... }
    const rawCalendar: Record<string, number> = JSON.parse(
      user.userCalendar?.submissionCalendar ?? "{}"
    );

    // Keep only the last 52 weeks (364 days)
    const nowSec = Math.floor(Date.now() / 1000);
    const cutoff = nowSec - 364 * 86400;
    const calendar: { date: string; count: number }[] = [];

    for (const [ts, count] of Object.entries(rawCalendar)) {
      const sec = parseInt(ts, 10);
      if (sec >= cutoff) {
        const d = new Date(sec * 1000);
        calendar.push({
          date: d.toISOString().slice(0, 10),
          count: count as number,
        });
      }
    }

    // acSubmissionNum: [{ difficulty: "All"|"Easy"|"Medium"|"Hard", count, submissions }]
    const acStats: { difficulty: string; count: number; submissions: number }[] =
      user.submitStats?.acSubmissionNum ?? [];

    const total  = acStats.find((s) => s.difficulty === "All")?.count    ?? 0;
    const easy   = acStats.find((s) => s.difficulty === "Easy")?.count   ?? 0;
    const medium = acStats.find((s) => s.difficulty === "Medium")?.count ?? 0;
    const hard   = acStats.find((s) => s.difficulty === "Hard")?.count   ?? 0;

    return NextResponse.json({
      username,
      ranking:        user.profile?.ranking        ?? 0,
      totalActiveDays: user.userCalendar?.totalActiveDays ?? 0,
      streak:         user.userCalendar?.streak    ?? 0,
      total,
      easy,
      medium,
      hard,
      calendar,
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch LeetCode data" }, { status: 500 });
  }
}
