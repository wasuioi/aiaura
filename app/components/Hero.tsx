import { Reveal } from "@/app/components/Reveal";
import { DashboardPreview } from "@/app/components/DashboardPreview";

export function Hero() {
  return (
    <header className="relative z-[1] mx-auto max-w-[960px] px-[22px] pb-10 pt-24 text-center">
      <Reveal>
        <h1 className="m-0 text-[clamp(40px,6.4vw,74px)] font-bold leading-[1.03] tracking-[-0.035em] text-white">
          Ask your database what happened.
          <br />
          <span className="text-gradient-aura">In English, not SQL.</span>
        </h1>
      </Reveal>

      <Reveal>
        <p className="mx-auto mt-[26px] max-w-[600px] text-[clamp(16px,2vw,19px)] leading-[1.6] text-zinc-400">
          Built for the solo founder who used to open a SQL editor at midnight
          to figure out why signups dropped. Connect Postgres or Stripe, ask
          in plain English, get the number — no analyst, no dashboard to
          maintain.
        </p>
      </Reveal>

      <Reveal className="mt-[38px] flex flex-wrap justify-center gap-3.5">
        <a
          href="#cta"
          className="rounded-xl bg-[linear-gradient(135deg,#7c3aed,#a855f7)] px-[26px] py-[13px] text-[15px] font-semibold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.1)_inset,0_10px_30px_rgba(124,58,237,0.45)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.18)_inset,0_16px_44px_rgba(124,58,237,0.65)]"
        >
          Connect your database
        </a>
        <a
          href="#features"
          className="rounded-xl border border-white/[0.12] bg-white/[0.045] px-[26px] py-[13px] text-[15px] font-semibold text-zinc-200 backdrop-blur-[8px] transition-[background,border-color] duration-200 hover:border-white/[0.22] hover:bg-white/[0.09]"
        >
          See a real question answered
        </a>
      </Reveal>

      <Reveal>
        <DashboardPreview />
      </Reveal>
    </header>
  );
}
