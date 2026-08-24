"use client";

import { motion } from "framer-motion";

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

// ── helpers ──────────────────────────────────────────────────────────────────

/** Build a 52-week (364-day) grid ending today, Sun→Sat columns. */
function buildGrid(calendar: { date: string; count: number }[]) {
  const countMap = new Map(calendar.map((c) => [c.date, c.count]));

  // Align the grid end to today, start to 51 full weeks back
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Find the Sunday on or before today to end the last complete week
  const endSunday = new Date(today);
  endSunday.setDate(today.getDate() - today.getDay()); // rewind to Sunday

  // Start = 51 weeks before that Sunday
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

  return { weeks, startDate: startSunday };
}

/** Month labels for the heatmap header */
function monthLabels(weeks: { date: string; count: number }[][]) {
  const labels: { label: string; col: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, i) => {
    const d = new Date(week[0].date);
    const m = d.getMonth();
    if (m !== lastMonth) {
      labels.push({
        label: d.toLocaleString("default", { month: "short" }),
        col: i,
      });
      lastMonth = m;
    }
  });
  return labels;
}

/** Colour intensity based on count */
function cellColor(count: number) {
  if (count === 0) return "bg-gray-100 dark:bg-gray-800";
  if (count <= 2)  return "bg-emerald-200 dark:bg-emerald-900";
  if (count <= 5)  return "bg-emerald-400 dark:bg-emerald-600";
  if (count <= 9)  return "bg-emerald-500 dark:bg-emerald-500";
  return "bg-emerald-600 dark:bg-emerald-400";
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// ── component ─────────────────────────────────────────────────────────────────

export default function LeetcodeClient({ data }: { data: LeetData }) {
  if (data.error && data.total === 0) {
    return (
      <p className="text-center text-gray-400 dark:text-gray-500 py-12">
        {data.error}
      </p>
    );
  }

  const { weeks, startDate: _start } = buildGrid(data.calendar);
  const mLabels = monthLabels(weeks);

  const statCards = [
    {
      label: "Total Solved",
      value: data.total,
      color: "text-indigo-500 dark:text-indigo-400",
      bg: "bg-indigo-50 dark:bg-indigo-950/40",
    },
    {
      label: "Easy",
      value: data.easy,
      color: "text-emerald-500 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-950/40",
    },
    {
      label: "Medium",
      value: data.medium,
      color: "text-amber-500 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-950/40",
    },
    {
      label: "Hard",
      value: data.hard,
      color: "text-rose-500 dark:text-rose-400",
      bg: "bg-rose-50 dark:bg-rose-950/40",
    },
    {
      label: "Ranking",
      value: data.ranking ? `#${data.ranking.toLocaleString()}` : "—",
      color: "text-purple-500 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-950/40",
    },
    {
      label: "Active Days",
      value: data.totalActiveDays,
      color: "text-cyan-500 dark:text-cyan-400",
      bg: "bg-cyan-50 dark:bg-cyan-950/40",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* ── Stat cards ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-3 sm:grid-cols-6 gap-3"
      >
        {statCards.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.3 }}
            className={`rounded-2xl p-4 text-center ${s.bg} border border-gray-100 dark:border-gray-800`}
          >
            <p className={`text-2xl font-bold tabular-nums ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">{s.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Activity Heatmap ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="card p-5 overflow-x-auto"
      >
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Submission Activity
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            {data.totalActiveDays} active days · {data.streak} day streak
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
          {/* Day-of-week labels */}
          <div className="flex flex-col gap-[3px] mr-1">
            {DAYS.map((d) => (
              <div key={d} className="h-[11px] text-[9px] text-gray-400 dark:text-gray-600 leading-none w-6 flex items-center">
                {d[0]}
              </div>
            ))}
          </div>

          {/* Cells */}
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((day) => (
                <div
                  key={day.date}
                  title={`${day.date}: ${day.count} submission${day.count !== 1 ? "s" : ""}`}
                  className={`w-[11px] h-[11px] rounded-sm ${cellColor(day.count)}`}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-1.5 mt-3 justify-end">
          <span className="text-[10px] text-gray-400 dark:text-gray-500">Less</span>
          {["bg-gray-100 dark:bg-gray-800", "bg-emerald-200 dark:bg-emerald-900", "bg-emerald-400 dark:bg-emerald-600", "bg-emerald-500 dark:bg-emerald-500", "bg-emerald-600 dark:bg-emerald-400"].map((c, i) => (
            <div key={i} className={`w-[11px] h-[11px] rounded-sm ${c}`} />
          ))}
          <span className="text-[10px] text-gray-400 dark:text-gray-500">More</span>
        </div>
      </motion.div>
    </div>
  );
}
