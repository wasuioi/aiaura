import { Reveal } from "@/app/components/Reveal";

const LOGOS = ["Nebula", "Vertex", "Quanta", "Loomly", "Fathom"];

export function LogoStrip() {
  return (
    <Reveal className="mx-auto mt-[70px] max-w-[1000px] px-[22px] text-center">
      <div className="mb-[22px] font-mono text-[11px] tracking-[0.14em] text-zinc-600">
        TRUSTED BY FAST-MOVING TEAMS
      </div>
      <div className="flex flex-wrap items-center justify-center gap-11 opacity-60">
        {LOGOS.map((logo) => (
          <span key={logo} className="text-[19px] font-bold tracking-[-0.02em] text-zinc-300">
            {logo}
          </span>
        ))}
      </div>
    </Reveal>
  );
}
