import { Reveal } from "@/app/components/Reveal";
import { FeatureCard } from "@/app/components/FeatureCard";

const FEATURES = [
  {
    title: "Predictive Modeling",
    description:
      "Auto-trained models forecast churn, revenue, and demand with 98% accuracy — no data science team required.",
    accent: "violet",
  },
  {
    title: "Real-time Pipelines",
    description:
      "Stream events from any source and watch insights update live. Sub-second latency from ingest to answer.",
    accent: "cyan",
  },
  {
    title: "Natural Language Queries",
    description:
      "Ask questions in plain English. Aura writes the query, runs it, and returns a chart you can trust.",
    accent: "mixed",
  },
] as const;

export function Features() {
  return (
    <section id="features" className="relative z-[1] mx-auto mt-[130px] max-w-[1200px] px-[22px]">
      <Reveal className="mx-auto mb-14 max-w-[640px] text-center">
        <div className="mb-4 font-mono text-[11px] tracking-[0.14em] text-[#a855f7]">
          CAPABILITIES
        </div>
        <h2 className="m-0 text-[clamp(30px,4.2vw,46px)] font-bold leading-[1.08] tracking-[-0.03em] text-white">
          Everything you need to move at intelligence speed
        </h2>
        <p className="mx-auto mt-[18px] max-w-[520px] text-base leading-[1.6] text-zinc-400">
          A single platform that ingests, models, and predicts — so your team ships decisions,
          not dashboards.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-[22px] feat:grid-cols-3">
        {FEATURES.map((feature) => (
          <Reveal key={feature.title}>
            <FeatureCard {...feature} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
