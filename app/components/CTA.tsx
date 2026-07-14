import { Reveal } from "@/app/components/Reveal";

// The two animated radial-glow blobs are gone — decorative glow on dark
// backgrounds is one of the strongest "AI default" signals, and the page's
// single animated moment now lives in DashboardPreview instead.

export function CTA() {
  return (
    <section id="cta" className="relative z-[1] mx-auto mt-[140px] max-w-[1080px] px-[22px]">
      <Reveal className="relative overflow-hidden rounded-[28px] border border-warm-800 bg-warm-900/60 px-8 py-20 text-center">
        <h2 className="m-0 text-[clamp(32px,5vw,54px)] font-bold leading-[1.05] tracking-[-0.035em] text-warm-050">
          Stop exporting CSVs at midnight.
        </h2>
        <p className="mx-auto mt-5 max-w-[460px] text-[17px] leading-[1.6] text-warm-400">
          Connect Postgres or Stripe and ask your first question in English
          before your coffee's done.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3.5">
          <a
            href="#"
            className="rounded-xl bg-brick-500 px-[30px] py-3.5 text-[15px] font-semibold text-warm-050 transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-brick-400"
          >
            Connect your database
          </a>
          <a
            href="#features"
            className="rounded-xl border border-warm-800 bg-white/5 px-[30px] py-3.5 text-[15px] font-semibold text-warm-200 transition-colors duration-200 hover:bg-white/10"
          >
            See how it answers
          </a>
        </div>
      </Reveal>
    </section>
  );
}
