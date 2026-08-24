// Server Component — fetches LeetCode data at request time (ISR, 1 h cache).
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

async function fetchLeetData(): Promise<LeetData> {
  try {
    // Use absolute URL for server-side fetch in Next.js
    const base =
      process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

    const res = await fetch(`${base}/api/leetcode`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error("bad response");
    return res.json();
  } catch {
    return {
      username: "Rishabh_pathak",
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
