"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RevenueChart } from "@/app/components/RevenueChart";
import { CANNED_QUERIES, type CannedQuery } from "@/app/data/cannedQueries";

// The page's ONE animated moment, now interactive: pick a question and it
// re-types, then its answer, chart, and SQL replace what was there. Everything
// else on the page stays still — the stillness is what makes this read as
// intentional. There is no engine behind it and no input field; every answer
// is canned in cannedQueries.ts, because pretending otherwise would imply a
// backend that does not exist.
//
// Two rules carried over and still load-bearing:
// - The first play waits for the mock to scroll into view (it sits below the
//   hero; a visitor reading the headline would otherwise miss the whole thing).
// - prefers-reduced-motion never waits: content swaps complete and instantly.

const TYPE_SPEED_MS = 45;
const ANSWER_DELAY_MS = 350;
// Beat before the first play, so typing doesn't begin mid-scroll.
const START_DELAY_MS = 400;

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function DashboardPreview() {
  const [active, setActive] = useState<CannedQuery>(CANNED_QUERIES[0]);
  const [typed, setTyped] = useState("");
  const [revealed, setRevealed] = useState(false);

  const frameRef = useRef<HTMLDivElement | null>(null);
  const typeTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const revealTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  // Rapid clicking must not interleave two typing runs into one string.
  const stopTimers = useCallback(() => {
    if (typeTimer.current) clearInterval(typeTimer.current);
    if (revealTimer.current) clearTimeout(revealTimer.current);
    if (startTimer.current) clearTimeout(startTimer.current);
    typeTimer.current = revealTimer.current = startTimer.current = null;
  }, []);

  const play = useCallback(
    (query: CannedQuery, instant: boolean) => {
      stopTimers();

      if (instant) {
        setTyped(query.question);
        setRevealed(true);
        return;
      }

      setTyped("");
      setRevealed(false);

      let i = 0;
      typeTimer.current = setInterval(() => {
        i += 1;
        setTyped(query.question.slice(0, i));
        if (i < query.question.length) return;
        stopTimers();
        revealTimer.current = setTimeout(() => setRevealed(true), ANSWER_DELAY_MS);
      }, TYPE_SPEED_MS);
    },
    [stopTimers]
  );

  // First play only: gated on the mock actually being on screen.
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      play(CANNED_QUERIES[0], true);
      return;
    }

    observer.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.current?.disconnect();
          startTimer.current = setTimeout(
            () => play(CANNED_QUERIES[0], false),
            START_DELAY_MS
          );
        }
      },
      { threshold: 0.35 }
    );
    observer.current.observe(el);

    return () => {
      observer.current?.disconnect();
      stopTimers();
    };
  }, [play, stopTimers]);

  const select = (query: CannedQuery) => {
    if (query.id === active.id) return;
    // A deliberate choice outranks the scroll trigger; don't let a pending
    // first play type over the question the visitor just asked for.
    observer.current?.disconnect();
    setActive(query);
    play(query, prefersReducedMotion());
  };

  return (
    <div ref={frameRef} className="relative mt-[66px]">
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
          {/* sidebar (sm and up) */}
          <aside className="hidden flex-col gap-1.5 border-warm-800 px-3.5 py-[18px] sm:flex sm:border-r">
            <div className="px-2 pb-2 font-mono text-[9.5px] tracking-[0.12em] text-warm-600">
              RECENT QUESTIONS
            </div>
            {CANNED_QUERIES.map((query) => {
              const isActive = query.id === active.id;
              return (
                <button
                  key={query.id}
                  type="button"
                  onClick={() => select(query)}
                  aria-current={isActive ? "true" : undefined}
                  className={`rounded-[9px] px-2.5 py-2 text-left text-[12.5px] leading-[1.35] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brick-400/60 ${
                    isActive
                      ? "border border-brick-600/50 bg-brick-600/15 text-warm-050"
                      : "text-warm-400 hover:bg-white/[0.04] hover:text-warm-200"
                  }`}
                >
                  {query.question}
                </button>
              );
            })}
          </aside>

          {/* min-w-0: a grid item defaults to min-width:auto, so the nowrap SQL
              line below would widen this column past the card instead of
              scrolling inside its own overflow container. */}
          <main className="min-w-0 px-6 py-[22px]">
            {/* Below sm the sidebar is gone, so the questions ride above the
                input as a scrollable chip row — otherwise the whole feature
                would be invisible on a phone. */}
            <div className="scroll-warm -mx-6 mb-4 flex gap-2 overflow-x-auto px-6 pb-2 sm:hidden">
              {CANNED_QUERIES.map((query) => {
                const isActive = query.id === active.id;
                return (
                  <button
                    key={query.id}
                    type="button"
                    onClick={() => select(query)}
                    aria-current={isActive ? "true" : undefined}
                    className={`shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-[12px] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brick-400/60 ${
                      isActive
                        ? "border border-brick-600/50 bg-brick-600/15 text-warm-050"
                        : "border border-warm-800 text-warm-400"
                    }`}
                  >
                    {query.question}
                  </button>
                );
              })}
            </div>

            {/* The typed text is decoration for screen readers — announcing it
                would read out one character at a time — so the real question is
                exposed once, in full, to the accessibility tree instead. */}
            <div className="mb-5 flex items-center gap-2.5 rounded-xl border border-warm-800 bg-black/25 px-4 py-3 font-mono text-[13.5px] text-warm-050">
              <span aria-hidden="true" className="text-brick-400">
                {">"}
              </span>
              <span aria-hidden="true">
                {typed}
                <span
                  className="ml-[1px] inline-block h-[15px] w-[8px] translate-y-[2px] bg-brick-400"
                  style={{ animation: "cursorBlink 1.1s step-end infinite" }}
                />
              </span>
              <span className="sr-only">{active.question}</span>
            </div>

            {/* answer + chart + sql, revealed once typing finishes */}
            <div
              aria-live="polite"
              className={revealed ? "" : "invisible"}
              style={revealed ? { animation: "fadeUp 0.5s ease-out both" } : undefined}
            >
              <div className="mb-4 text-[14px] leading-[1.6] text-warm-200">
                {active.answer.before}
                <span className="font-semibold text-warm-050">{active.answer.stat}</span>
                {active.answer.after}
              </div>

              <div className="mb-1.5 text-[11px] text-warm-600">{active.chartLabel}</div>
              {/* Mounted only on reveal, and keyed by question: the line's draw
                  is a CSS animation, so an early mount would finish it off-screen
                  and a reused element would not replay it on switch. The
                  placeholder holds the height so nothing shifts. */}
              {revealed ? (
                <RevenueChart
                  key={active.id}
                  data={active.chartData}
                  label={active.chartLabel}
                  direction={active.chartDirection}
                />
              ) : (
                <div className="h-[180px]" />
              )}

              <div className="scroll-warm mt-4 overflow-x-auto rounded-xl border border-warm-800 bg-white/[0.025] px-3.5 pb-2.5 pt-3">
                <div className="mb-1 font-mono text-[10px] tracking-[0.1em] text-warm-600">
                  SQL AURA RAN
                </div>
                <code className="whitespace-nowrap font-mono text-[11.5px] text-brick-300">
                  {active.sql}
                </code>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
