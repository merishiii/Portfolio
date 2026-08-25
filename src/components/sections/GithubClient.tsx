"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { GithubData } from "./GithubStats";

// ── helpers ───────────────────────────────────────────────────────────────────

/** Build a 52-week grid (Sun → Sat) ending this week. */
function buildGrid(calendar: { date: string; count: number }[]) {
  const countMap = new Map(calendar.map((c) => [c.date, c.count]));

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const endSunday = new Date(today);
  endSunday.setDate(today.getDate() - today.getDay());

  const startSunday = new Date(endSunday);
  startSunday.setDate(endSunday.getDate() - 51 * 7);

  const weeks: { date: string; count: number }[][] = [];
  const cur = new Date(startSunday);

  while (cur <= endSunday) {
    const week: { date: string; count: number }[] = [];
    for (let d = 0; d < 7; d++) {
      const iso = cur.toISOString().slice(0, 10);
      week.push({ date: iso, count: countMap.get(iso) ?? 0 });
      cur.setDate(cur.getDate() + 1);
    }
    weeks.push(week);
  }
  return weeks;
}

function monthLabels(weeks: { date: string; count: number }[][]) {
  const labels: { label: string; col: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, i) => {
    const m = new Date(week[0].date).getMonth();
    if (m !== lastMonth) {
      labels.push({
        label: new Date(week[0].date).toLocaleString("default", { month: "short" }),
        col: i,
      });
      lastMonth = m;
    }
  });
  return labels;
}

function cellColor(count: number) {
  if (count === 0) return "bg-gray-100 dark:bg-gray-800";
  if (count <= 2)  return "bg-violet-200 dark:bg-violet-900";
  if (count <= 5)  return "bg-violet-400 dark:bg-violet-600";
  if (count <= 9)  return "bg-violet-500 dark:bg-violet-500";
  return "bg-violet-600 dark:bg-violet-400";
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python:     "#3572A5",
  Java:       "#b07219",
  "C++":      "#f34b7d",
  C:          "#555555",
  Go:         "#00ADD8",
  Rust:       "#dea584",
  HTML:       "#e34c26",
  CSS:        "#563d7c",
  Shell:      "#89e051",
  Kotlin:     "#A97BFF",
  Swift:      "#F05138",
  Ruby:       "#701516",
  PHP:        "#4F5D95",
  Dart:       "#00B4AB",
};

const DAYS = ["S", "M", "T", "W", "T", "F", "S"];

// ── skeleton ──────────────────────────────────────────────────────────────────

function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded bg-gray-200 dark:bg-gray-700 ${className ?? ""}`} />
  );
}

function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      {/* stat cards */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-2xl p-4 border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40 flex flex-col items-center gap-2">
            <Skeleton className="h-7 w-10" />
            <Skeleton className="h-3 w-16" />
          </div>
        ))}
      </div>
      {/* middle row */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card md:col-span-2 p-5 flex flex-col gap-4">
          <Skeleton className="h-4 w-28" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-1">
              <div className="flex justify-between">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-12" />
              </div>
              <Skeleton className="h-1.5 w-full" />
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="card p-5 flex-1 flex flex-col items-center justify-center gap-2">
              <Skeleton className="h-9 w-12" />
              <Skeleton className="h-3 w-20" />
            </div>
          ))}
        </div>
      </div>
      {/* heatmap */}
      <div className="card p-5">
        <div className="flex justify-between mb-4">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-3 w-32" />
        </div>
        <Skeleton className="h-24 w-full" />
      </div>
    </div>
  );
}

// ── component ─────────────────────────────────────────────────────────────────

export default function GithubClient() {
  const [data, setData] = useState<GithubData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => {
        if (!r.ok) throw new Error(`fetch failed: ${r.status}`);
        return r.json();
      })
      .then((json: GithubData) => setData(json))
      .catch(() => setError(true));
  }, []);

  if (error) {
    return (
      <div className="card p-6 text-center text-sm text-gray-400 dark:text-gray-500">
        Failed to load GitHub data. Please try again later.
      </div>
    );
  }

  if (!data) return <LoadingSkeleton />;

  const {
    followers, following, publicRepos, totalStars,
    totalContributions, commits, prs, issues,
    topLanguages, calendar, hasCalendar,
  } = data;

  const statCards = [
    { label: "Repositories",  value: publicRepos,        color: "text-indigo-500 dark:text-indigo-400",   bg: "bg-indigo-50 dark:bg-indigo-950/40" },
    { label: "Stars Earned",  value: totalStars,         color: "text-amber-500 dark:text-amber-400",     bg: "bg-amber-50 dark:bg-amber-950/40" },
    { label: "Followers",     value: followers,          color: "text-emerald-500 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-950/40" },
    { label: "Following",     value: following,          color: "text-cyan-500 dark:text-cyan-400",       bg: "bg-cyan-50 dark:bg-cyan-950/40" },
    { label: "Contributions", value: totalContributions, color: "text-violet-500 dark:text-violet-400",   bg: "bg-violet-50 dark:bg-violet-950/40" },
    { label: "Commits",       value: commits,            color: "text-rose-500 dark:text-rose-400",       bg: "bg-rose-50 dark:bg-rose-950/40" },
  ];

  const activityCards = [
    { label: "Pull Requests", value: prs,    color: "text-purple-500" },
    { label: "Issues Opened", value: issues, color: "text-orange-500" },
  ];

  const weeks   = buildGrid(calendar);
  const mLabels = monthLabels(weeks);
  const maxLang = Math.max(...topLanguages.map((l) => l.count), 1);

  return (
    <div className="flex flex-col gap-8">

      {/* ── Stat cards ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-3 sm:grid-cols-6 gap-3"
      >
        {statCards.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.06, duration: 0.3 }}
            className={`rounded-2xl p-4 text-center ${s.bg} border border-gray-100 dark:border-gray-800`}
          >
            <p className={`text-2xl font-bold tabular-nums ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">{s.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Middle row: Top Languages + PR/Issues ── */}
      <div className="grid md:grid-cols-3 gap-6">

        {topLanguages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card md:col-span-2 p-5"
          >
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Top Languages
            </p>
            <div className="flex flex-col gap-3">
              {topLanguages.map(({ lang, count }, i) => {
                const pct   = Math.round((count / maxLang) * 100);
                const color = LANG_COLORS[lang] ?? "#6366f1";
                return (
                  <motion.div
                    key={lang}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.35 }}
                  >
                    <div className="flex justify-between text-xs mb-1">
                      <span className="flex items-center gap-1.5 font-medium text-gray-700 dark:text-gray-300">
                        <span
                          className="inline-block w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                        {lang}
                      </span>
                      <span className="text-gray-400">{count} repo{count !== 1 ? "s" : ""}</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ delay: i * 0.07 + 0.2, duration: 0.5, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: color }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* PR + Issues mini cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col gap-4"
        >
          {activityCards.map((a) => (
            <div
              key={a.label}
              className="card p-5 flex-1 flex flex-col items-center justify-center text-center"
            >
              <p className={`text-3xl font-bold tabular-nums ${a.color}`}>{a.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">{a.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Contribution Heatmap ── */}
      {hasCalendar ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="card p-5 overflow-x-auto"
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Contribution Activity
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              {totalContributions.toLocaleString()} contributions this year
            </p>
          </div>

          {/* Month labels */}
          <div className="flex gap-[3px] ml-8 mb-1 min-w-max">
            {weeks.map((_, wi) => {
              const lbl = mLabels.find((m) => m.col === wi);
              return (
                <div key={wi} className="w-[11px] text-[9px] text-gray-400 dark:text-gray-600 leading-none">
                  {lbl ? lbl.label : ""}
                </div>
              );
            })}
          </div>

          {/* Day labels + grid */}
          <div className="flex gap-1 min-w-max">
            <div className="flex flex-col gap-[3px] mr-1">
              {DAYS.map((d, i) => (
                <div key={i} className="h-[11px] text-[9px] text-gray-400 dark:text-gray-600 leading-none w-6 flex items-center">
                  {d}
                </div>
              ))}
            </div>
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((day) => (
                  <div
                    key={day.date}
                    title={`${day.date}: ${day.count} contribution${day.count !== 1 ? "s" : ""}`}
                    className={`w-[11px] h-[11px] rounded-sm ${cellColor(day.count)}`}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-1.5 mt-3 justify-end">
            <span className="text-[10px] text-gray-400 dark:text-gray-500">Less</span>
            {[
              "bg-gray-100 dark:bg-gray-800",
              "bg-violet-200 dark:bg-violet-900",
              "bg-violet-400 dark:bg-violet-600",
              "bg-violet-500 dark:bg-violet-500",
              "bg-violet-600 dark:bg-violet-400",
            ].map((c, i) => (
              <div key={i} className={`w-[11px] h-[11px] rounded-sm ${c}`} />
            ))}
            <span className="text-[10px] text-gray-400 dark:text-gray-500">More</span>
          </div>
        </motion.div>
      ) : (
        <div className="card p-6 text-center text-sm text-gray-400 dark:text-gray-500">
          Add a <code className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">GITHUB_TOKEN</code> environment variable to enable the contribution heatmap.
        </div>
      )}
    </div>
  );
}
