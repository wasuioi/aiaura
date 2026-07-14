"use client";

import { useRef } from "react";

// Accents reduced from three (violet/cyan/mixed) to two:
// "brick" for the lead feature, "neutral" for supporting ones.
// One hue + neutrals — no second accent color competing.

type Accent = "brick" | "neutral";

const ACCENT_STYLES: Record<Accent, { iconBg: string; iconBorder: string; dot: string }> = {
  brick: {
    iconBg: "bg-brick-600/20",
    iconBorder: "border-brick-600/40",
    dot: "bg-brick-400",
  },
  neutral: {
    iconBg: "bg-white/[0.04]",
    iconBorder: "border-warm-800",
    dot: "bg-warm-400",
  },
};

export function FeatureCard({
  title,
  description,
  accent,
}: {
  title: string;
  description: string;
  accent: Accent;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={cardRef}
      onPointerEnter={() => {
        const card = cardRef.current;
        if (card) card.style.borderColor = "rgba(212,102,79,0.4)";
      }}
      onPointerLeave={() => {
        const card = cardRef.current;
        if (card) card.style.borderColor = "";
      }}
      className="relative h-full rounded-[18px] border border-warm-800 bg-warm-900/55 px-[26px] py-[30px] transition-[border-color] duration-[250ms] ease-out"
    >
      <div
        className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl border ${ACCENT_STYLES[accent].iconBg} ${ACCENT_STYLES[accent].iconBorder}`}
      >
        <div className={`h-4 w-4 rounded-[5px] ${ACCENT_STYLES[accent].dot}`} />
      </div>
      <h3 className="mb-2.5 text-[19px] font-semibold tracking-[-0.02em] text-warm-050">
        {title}
      </h3>
      <p className="text-[14.5px] leading-[1.65] text-warm-400">{description}</p>
    </div>
  );
}
