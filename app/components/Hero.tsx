import { Reveal } from "@/app/components/Reveal";
import { DashboardPreview } from "@/app/components/DashboardPreview";

export function Hero() {
  return (
    <header className="relative z-[1] mx-auto max-w-[960px] px-[22px] pb-10 pt-24 text-center">
      <Reveal>
        <h1 className="m-0 text-[clamp(40px,6.4vw,74px)] font-bold leading-[1.03] tracking-[-0.035em] text-warm-050">
          Ask your database what happened.
          <br />
          <span className="text-brick-400">In English, not SQL.</span>
        </h1>
      </Reveal>

      <Reveal>
        <p className="mx-auto mt-[26px] max-w-[600px] text-[clamp(16px,2vw,19px)] leading-[1.6] text-warm-400">
          Built for the solo founder who used to open a SQL editor at midnight
          to figure out why signups dropped. Connect Postgres or Stripe, ask
          in plain English, get the number — no analyst, no dashboard to
          maintain.
        </p>
      </Reveal>

      <Reveal className="mt-[38px] flex flex-wrap justify-center gap-3.5">
        <a
          href="#cta"
          className="rounded-xl bg-brick-500 px-[26px] py-[13px] text-[15px] font-semibold text-warm-050 transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-brick-400"
        >
          Connect your database
        </a>
        <a
          href="#features"
          className="rounded-xl border border-warm-800 bg-white/[0.045] px-[26px] py-[13px] text-[15px] font-semibold text-warm-200 transition-[background,border-color] duration-200 hover:border-warm-600 hover:bg-white/[0.09]"
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
