"use client";

import { useRef } from "react";

type Accent = "violet" | "cyan" | "mixed";

const ACCENT_STYLES: Record<
  Accent,
  { iconBg: string; iconBorder: string; dot: string; glow: string }
> = {
  violet: {
    iconBg: "bg-[linear-gradient(135deg,rgba(139,92,246,0.25),rgba(139,92,246,0.05))]",
    iconBorder: "border-[rgba(139,92,246,0.3)]",
    dot: "bg-[linear-gradient(135deg,#a855f7,#c084fc)] shadow-[0_0_14px_rgba(168,85,247,0.7)]",
    glow: "bg-[radial-gradient(240px_180px_at_var(--mx,50%)_var(--my,0%),rgba(139,92,246,0.22),transparent_70%)]",
  },
  cyan: {
    iconBg: "bg-[linear-gradient(135deg,rgba(34,211,238,0.25),rgba(34,211,238,0.05))]",
    iconBorder: "border-[rgba(34,211,238,0.3)]",
    dot: "bg-[linear-gradient(135deg,#22d3ee,#67e8f9)] shadow-[0_0_14px_rgba(34,211,238,0.7)]",
    glow: "bg-[radial-gradient(240px_180px_at_var(--mx,50%)_var(--my,0%),rgba(34,211,238,0.22),transparent_70%)]",
  },
  mixed: {
    iconBg: "bg-[linear-gradient(135deg,rgba(139,92,246,0.25),rgba(34,211,238,0.08))]",
    iconBorder: "border-white/[0.14]",
    dot: "bg-[linear-gradient(135deg,#a855f7,#22d3ee)] shadow-[0_0_14px_rgba(139,92,246,0.6)]",
    glow: "bg-[radial-gradient(240px_180px_at_var(--mx,50%)_var(--my,0%),rgba(139,92,246,0.22),transparent_70%)]",
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
  const glowRef = useRef<HTMLDivElement | null>(null);
  const styles = ACCENT_STYLES[accent];

  return (
    <div
      ref={cardRef}
      onPointerMove={(e) => {
        const card = cardRef.current;
        if (!card) return;
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
        card.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
      }}
      onPointerEnter={() => {
        if (glowRef.current) glowRef.current.style.opacity = "1";
        const card = cardRef.current;
        if (card) {
          card.style.transform = "translateY(-6px)";
          card.style.borderColor = "rgba(255,255,255,0.18)";
        }
      }}
      onPointerLeave={() => {
        if (glowRef.current) glowRef.current.style.opacity = "0";
        const card = cardRef.current;
        if (card) {
          card.style.transform = "translateY(0)";
          card.style.borderColor = "rgba(255,255,255,0.08)";
        }
      }}
      className="relative overflow-hidden rounded-[18px] border border-white/[0.08] bg-[rgba(16,16,24,0.55)] px-[26px] py-[30px] backdrop-blur-[14px] transition-[transform,border-color] duration-[250ms] ease-out"
    >
      <div
        ref={glowRef}
        className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ${styles.glow}`}
      />
      <div className="relative">
        <div
          className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl border ${styles.iconBg} ${styles.iconBorder}`}
        >
          <div className={`h-4 w-4 rounded-[5px] ${styles.dot}`} />
        </div>
        <h3 className="mb-2.5 text-[19px] font-semibold tracking-[-0.02em] text-white">
          {title}
        </h3>
        <p className="text-[14.5px] leading-[1.65] text-zinc-400">{description}</p>
      </div>
    </div>
  );
}
