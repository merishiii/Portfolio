// Server Component — fetches LeetCode data directly (no self-HTTP call).
import { FiExternalLink } from "react-icons/fi";
import SectionWrapper from "@/components/ui/SectionWrapper";
import LeetcodeClient from "./LeetcodeClient";

interface LeetData {
  username: string;
  ranking: number;
  totalActiveDays: number;
  streak: number;
  total: number;
  easy: number;
  medium: number;
  hard: number;
  calendar: { date: string; count: number }[];
  error?: string;
}

const LEETCODE_API = "https://leetcode.com/graphql";
const USERNAME = "Rishabh_pathak";

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

const fallback: LeetData = {
  username: USERNAME,
  ranking: 0,
  totalActiveDays: 0,
  streak: 0,
  total: 0,
  easy: 0,
  medium: 0,
  hard: 0,
  calendar: [],
  error: "Could not load LeetCode data",
};

async function fetchLeetData(): Promise<LeetData> {
  try {
    const res = await fetch(LEETCODE_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
      },
      body: JSON.stringify({ query, variables: { username: USERNAME } }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) return fallback;

    const json = await res.json();
    const user = json?.data?.matchedUser;
    if (!user) return fallback;

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
        calendar.push({ date: d.toISOString().slice(0, 10), count: count as number });
      }
    }

    const acStats: { difficulty: string; count: number; submissions: number }[] =
      user.submitStats?.acSubmissionNum ?? [];

    const total  = acStats.find((s) => s.difficulty === "All")?.count    ?? 0;
    const easy   = acStats.find((s) => s.difficulty === "Easy")?.count   ?? 0;
    const medium = acStats.find((s) => s.difficulty === "Medium")?.count ?? 0;
    const hard   = acStats.find((s) => s.difficulty === "Hard")?.count   ?? 0;

    return {
      username: USERNAME,
      ranking:         user.profile?.ranking              ?? 0,
      totalActiveDays: user.userCalendar?.totalActiveDays ?? 0,
      streak:          user.userCalendar?.streak          ?? 0,
      total,
      easy,
      medium,
      hard,
      calendar,
    };
  } catch {
    return fallback;
  }
}

export default async function LeetcodeStats() {
  const data = await fetchLeetData();

  return (
    <SectionWrapper id="leetcode" label="Competitive Coding" heading="LeetCode Stats">
      <LeetcodeClient data={data} />
      <div className="mt-8 text-center">
        <a
          href={`https://leetcode.com/u/${data.username}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline inline-flex items-center gap-2 text-sm"
        >
          <FiExternalLink size={14} />
          View on LeetCode
        </a>
      </div>
    </SectionWrapper>
  );
}
