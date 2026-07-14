"use client";

import { useEffect, useRef, useState } from "react";
import { RevenueChart } from "@/app/components/RevenueChart";

// The page's ONE animated moment: the question types itself, then the
// answer, chart, and SQL appear in sequence. Everything else on the page
// stays still — the stillness is what makes this read as intentional.
// Respects prefers-reduced-motion: shows the final state immediately.

const QUESTION = "Why did signups drop last week?";
const TYPE_SPEED_MS = 45;
const ANSWER_DELAY_MS = 350;

const RECENT_QUESTIONS = [
  "Which plan converts best?",
  "Top churn reason this month?",
  "Revenue per seat, by cohort?",
];

const SQL_PREVIEW =
  "select date_trunc('day', created_at), count(*) from signups where created_at > now() - interval '14 days' group by 1;";

export function DashboardPreview() {
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setTyped(QUESTION);
      setDone(true);
      return;
    }

    let i = 0;
    const timer = setInterval(() => {
      i += 1;
      setTyped(QUESTION.slice(0, i));
      if (i >= QUESTION.length) {
        clearInterval(timer);
        setTimeout(() => setDone(true), ANSWER_DELAY_MS);
      }
    }, TYPE_SPEED_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative mt-[66px]">
      <div className="relative overflow-hidden rounded-[20px] border border-warm-800 bg-warm-900/70 text-left shadow-[0_40px_120px_rgba(0,0,0,0.6)]">
        {/* window bar */}
        <div className="flex items-center gap-3.5 border-b border-warm-800 bg-white/[0.015] px-[18px] py-[13px]">
          <div className="flex gap-[7px]">
            <span className="h-[11px] w-[11px] rounded-full bg-warm-800" />
            <span className="h-[11px] w-[11px] rounded-full bg-warm-800" />
            <span className="h-[11px] w-[11px] rounded-full bg-warm-800" />
          </div>
          <div className="mx-auto max-w-[280px] flex-1 rounded-lg border border-warm-800 bg-white/[0.03] px-3 py-[5px] text-center font-mono text-[11px] text-warm-600">
            app.aura.ai/ask
          </div>
          <div className="w-[60px]" />
        </div>

        {/* body */}
        <div className="grid grid-cols-1 sm:grid-cols-[190px_1fr]">
          {/* sidebar: recent questions */}
          <aside className="hidden flex-col gap-1.5 border-warm-800 px-3.5 py-[18px] sm:flex sm:border-r">
            <div className="px-2 pb-2 font-mono text-[9.5px] tracking-[0.12em] text-warm-600">
              RECENT QUESTIONS
            </div>
            <div className="rounded-[9px] border border-brick-600/50 bg-brick-600/15 px-2.5 py-2 text-[12.5px] leading-[1.35] text-warm-050">
              {QUESTION}
            </div>
            {RECENT_QUESTIONS.map((q) => (
              <div
                key={q}
                className="rounded-[9px] px-2.5 py-2 text-[12.5px] leading-[1.35] text-warm-400"
              >
                {q}
              </div>
            ))}
          </aside>

          {/* main */}
          <main className="px-6 py-[22px]">
            {/* the typed question */}
            <div className="mb-5 flex items-center gap-2.5 rounded-xl border border-warm-800 bg-black/25 px-4 py-3 font-mono text-[13.5px] text-warm-050">
              <span className="text-brick-400">{">"}</span>
              <span>
                {typed}
                <span
                  aria-hidden="true"
                  className="ml-[1px] inline-block h-[15px] w-[8px] translate-y-[2px] bg-brick-400"
                  style={{ animation: "cursorBlink 1.1s step-end infinite" }}
                />
              </span>
            </div>

            {/* answer + chart + sql appear after typing finishes */}
            <div
              className={done ? "" : "invisible"}
              style={done ? { animation: "fadeUp 0.5s ease-out both" } : undefined}
            >
              <div className="mb-4 text-[14px] leading-[1.6] text-warm-200">
                Signups fell{" "}
                <span className="font-semibold text-warm-050">18%</span> after
                the pricing page redirect broke on Tuesday.
              </div>

              <div className="mb-1.5 text-[11px] text-warm-600">
                New signups &middot; last 14 days
              </div>
              <RevenueChart />

              <div className="mt-4 overflow-x-auto rounded-xl border border-warm-800 bg-white/[0.025] px-3.5 py-3">
                <div className="mb-1 font-mono text-[10px] tracking-[0.1em] text-warm-600">
                  SQL AURA RAN
                </div>
                <code className="whitespace-nowrap font-mono text-[11.5px] text-brick-300">
                  {SQL_PREVIEW}
                </code>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
