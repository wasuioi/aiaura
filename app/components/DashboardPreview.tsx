import { RevenueChart } from "@/app/components/RevenueChart";

// Rebuilt this to actually be the product, not a generic BI dashboard
// screenshot. The old version had a sidebar (Overview/Cohorts/Funnels/
// Predictions/Reports) and a "Total revenue $2.84M" stat block — standard
// SaaS-dashboard chrome that had nothing to do with "ask a question in
// English." This version shows the one real interaction: someone types a
// question, gets an answer, and can see the query behind it. That's the
// signature moment worth showing, not a wall of stat cards.

const RECENT_QUESTIONS = [
  { text: "Why did signups drop last week?", active: true },
  { text: "Which plan converts best?", active: false },
  { text: "Top churn reason this month?", active: false },
];

const SQL_PREVIEW =
  "select date_trunc('day', created_at), count(*) from signups where created_at > now() - interval '14 days' group by 1;";

export function DashboardPreview() {
  return (
    <div className="relative mt-[66px]">
      <div className="pointer-events-none absolute inset-[-30px_-10px_20px] bg-[radial-gradient(60%_50%_at_50%_30%,rgba(139,92,246,0.35),transparent_70%)] blur-[30px]" />
      <div className="relative overflow-hidden rounded-[20px] border border-white/10 bg-[rgba(14,14,22,0.7)] text-left shadow-[0_40px_120px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.03)_inset] backdrop-blur-[20px]">
        {/* window bar */}
        <div className="flex items-center gap-3.5 border-b border-white/[0.06] bg-white/[0.015] px-[18px] py-[13px]">
          <div className="flex gap-[7px]">
            <span className="h-[11px] w-[11px] rounded-full bg-zinc-700" />
            <span className="h-[11px] w-[11px] rounded-full bg-zinc-700" />
            <span className="h-[11px] w-[11px] rounded-full bg-zinc-700" />
          </div>
          <div className="mx-auto max-w-[280px] flex-1 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-[5px] text-center font-mono text-[11px] text-zinc-500">
            app.aura.ai/ask
          </div>
          <div className="w-[60px]" />
        </div>

        {/* body */}
        <div className="grid grid-cols-1 sm:grid-cols-[190px_1fr]">
          {/* sidebar: recent questions, not generic nav items */}
          <aside className="hidden flex-col gap-1.5 border-white/[0.06] px-3.5 py-[18px] sm:flex sm:border-r">
            <div className="px-2 pb-2 font-mono text-[9.5px] tracking-[0.12em] text-zinc-600">
              RECENT QUESTIONS
            </div>
            {RECENT_QUESTIONS.map((q) => (
              <div
                key={q.text}
                className={`rounded-[9px] px-2.5 py-2 text-[12.5px] leading-[1.35] ${
                  q.active
                    ? "border border-[rgba(139,92,246,0.28)] bg-[rgba(139,92,246,0.14)] text-white"
                    : "text-zinc-400"
                }`}
              >
                {q.text}
              </div>
            ))}
          </aside>

          {/* main */}
          <main className="px-6 py-[22px]">
            {/* the question, styled like something someone actually typed */}
            <div className="mb-5 flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-black/20 px-4 py-3 font-mono text-[13.5px] text-zinc-200">
              <span className="text-[#a855f7]">{">"}</span>
              Why did signups drop last week?
            </div>

            <div className="mb-4 text-[14px] leading-[1.6] text-zinc-300">
              Signups fell{" "}
              <span className="font-semibold text-white">18%</span> after the
              pricing page redirect broke on Tuesday.
            </div>

            <div className="mb-1.5 text-[11px] text-zinc-500">
              New signups &middot; last 14 days
            </div>
            <RevenueChart />

            {/* the query behind the answer, always visible */}
            <div className="mt-4 overflow-x-auto rounded-xl border border-white/[0.06] bg-white/[0.025] px-3.5 py-3">
              <div className="mb-1 font-mono text-[10px] tracking-[0.1em] text-zinc-500">
                SQL AURA RAN
              </div>
              <code className="whitespace-nowrap font-mono text-[11.5px] text-[#c084fc]">
                {SQL_PREVIEW}
              </code>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
