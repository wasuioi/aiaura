import { RevenueChart } from "@/app/components/RevenueChart";

const SIDEBAR_ITEMS = [
  { label: "Overview", active: true },
  { label: "Cohorts", active: false },
  { label: "Funnels", active: false },
  { label: "Predictions", active: false },
  { label: "Reports", active: false },
];

const STATS = [
  { label: "Active users", value: "48,209", color: "text-white" },
  { label: "Conversion", value: "6.9%", color: "text-white" },
  { label: "Forecast acc.", value: "98.2%", color: "text-[#22d3ee]" },
];

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
            app.aura.ai/dashboard
          </div>
          <div className="w-[60px]" />
        </div>

        {/* body */}
        <div className="grid grid-cols-1 sm:grid-cols-[190px_1fr]">
          {/* sidebar */}
          <aside className="hidden flex-col gap-1.5 border-white/[0.06] px-3.5 py-[18px] sm:flex sm:border-r">
            <div className="px-2 pb-2 font-mono text-[9.5px] tracking-[0.12em] text-zinc-600">
              WORKSPACE
            </div>
            {SIDEBAR_ITEMS.map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-2.5 rounded-[9px] px-2.5 py-2 text-[13px] ${
                  item.active
                    ? "border border-[rgba(139,92,246,0.28)] bg-[rgba(139,92,246,0.14)] text-white"
                    : "text-zinc-400"
                }`}
              >
                <span
                  className={`h-[7px] w-[7px] rounded-sm ${
                    item.active ? "bg-[#a855f7] shadow-[0_0_8px_#a855f7]" : "bg-zinc-700"
                  }`}
                />
                {item.label}
              </div>
            ))}
          </aside>

          {/* main */}
          <main className="px-6 py-[22px]">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="text-[13px] text-zinc-400">Total revenue</div>
                <div className="mt-0.5 text-[30px] font-bold tracking-[-0.02em] text-white">
                  $2.84M
                </div>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(52,211,153,0.22)] bg-[rgba(52,211,153,0.1)] px-2.5 py-[5px] text-[12.5px] font-semibold text-[#34d399]">
                ▲ 24.6% vs last month
              </div>
            </div>

            <RevenueChart />

            <div className="mt-4 flex gap-3.5">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.025] px-3.5 py-3"
                >
                  <div className="text-[11px] text-zinc-500">{stat.label}</div>
                  <div className={`mt-[3px] text-[18px] font-semibold ${stat.color}`}>
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
