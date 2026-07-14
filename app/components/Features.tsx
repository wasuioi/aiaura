import { Reveal } from "@/app/components/Reveal";
import { FeatureCard } from "@/app/components/FeatureCard";

const LEAD_FEATURE = {
  title: "Ask in English, get real SQL back",
  description:
    "Type the question you'd ask an analyst — \"why did trial conversions drop last week\" — and Aura writes the query against your actual schema, runs it, and shows you the chart. The SQL is always visible, so you can verify it or hand it to an engineer later.",
  accent: "brick",
} as const;

const SUPPORTING_FEATURES = [
  {
    title: "Built for founder-sized data",
    description:
      "No warehouse to provision, no dbt models to maintain. Point Aura at your Postgres or Stripe account and ask your first question the same afternoon.",
    accent: "neutral",
  },
  {
    title: "Nothing is a black box",
    description:
      "Every answer shows the exact query behind it. If a number looks off, you can see why — not just trust it.",
    accent: "neutral",
  },
] as const;

export function Features() {
  return (
    <section id="features" className="relative z-[1] mx-auto mt-[130px] max-w-[1200px] px-[22px]">
      <Reveal className="mx-auto mb-14 max-w-[640px] text-center">
        <div className="mb-4 font-mono text-[11px] tracking-[0.14em] text-brick-400">
          HOW IT WORKS
        </div>
        <h2 className="m-0 text-[clamp(30px,4.2vw,46px)] font-bold leading-[1.08] tracking-[-0.03em] text-warm-050">
          Skip the SQL editor
        </h2>
        <p className="mx-auto mt-[18px] max-w-[520px] text-base leading-[1.6] text-warm-400">
          One thing, done specifically: turning a plain-English question
          about your own data into an answer you can check.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-[22px]">
        <Reveal>
          <FeatureCard {...LEAD_FEATURE} />
        </Reveal>
        <div className="grid grid-cols-1 gap-[22px] feat:grid-cols-2">
          {SUPPORTING_FEATURES.map((feature) => (
            <Reveal key={feature.title}>
              <FeatureCard {...feature} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
