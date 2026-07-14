import { Reveal } from "@/app/components/Reveal";

export function CTA() {
  return (
    <section id="cta" className="relative z-[1] mx-auto mt-[140px] max-w-[1080px] px-[22px]">
      <Reveal className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[rgba(14,14,22,0.6)] px-8 py-20 text-center backdrop-blur-[18px]">
        <div className="animate-aura-pulse pointer-events-none absolute left-1/2 top-[-160px] h-[520px] w-[760px] -translate-x-1/2 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(139,92,246,0.4),transparent_70%)] blur-[40px]" />
        <div className="pointer-events-none absolute bottom-[-180px] right-[-80px] h-[520px] w-[520px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(34,211,238,0.22),transparent_70%)] blur-[46px]" />
        <div className="relative">
          <h2 className="m-0 text-[clamp(32px,5vw,54px)] font-bold leading-[1.05] tracking-[-0.035em] text-white">
            Stop exporting CSVs at midnight.
          </h2>
          <p className="mx-auto mt-5 max-w-[460px] text-[17px] leading-[1.6] text-zinc-400">
            Connect Postgres or Stripe and ask your first question in English
            before your coffee's done.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3.5">
            <a
              href="#"
              className="rounded-xl bg-[linear-gradient(135deg,#7c3aed,#a855f7)] px-[30px] py-3.5 text-[15px] font-semibold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.12)_inset,0_12px_36px_rgba(124,58,237,0.5)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.2)_inset,0_18px_50px_rgba(124,58,237,0.7)]"
            >
              Connect your database
            </a>
            <a
              href="#features"
              className="rounded-xl border border-white/[0.14] bg-white/5 px-[30px] py-3.5 text-[15px] font-semibold text-zinc-200 transition-colors duration-200 hover:bg-white/10"
            >
              See how it answers
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
