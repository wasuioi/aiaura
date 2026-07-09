"use client";

import { ReactNode } from "react";
import { useReveal } from "@/app/hooks/useReveal";

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>(delay);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-[cubic-bezier(.22,.61,.36,1)] will-change-[opacity,transform] ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[26px]"
      } ${className}`}
    >
      {children}
    </div>
  );
}
