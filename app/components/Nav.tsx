export function Nav() {
  return (
    <nav className="sticky top-0 z-50 mx-auto mt-3.5 flex max-w-[1200px] items-center justify-between rounded-2xl border border-white/[0.07] bg-[rgba(10,10,16,0.55)] px-[22px] py-3.5 backdrop-blur-[16px]">
      <div className="flex items-center gap-2.5">
        <div className="h-[26px] w-[26px] rounded-lg bg-[linear-gradient(135deg,#a855f7,#22d3ee)] shadow-[0_0_18px_rgba(139,92,246,0.55)]" />
        <span className="text-[17px] font-bold tracking-[-0.02em] text-white">
          Aura<span className="text-zinc-400">AI</span>
        </span>
      </div>
      <div className="hidden items-center gap-8 text-sm text-zinc-400 nav:flex">
        <a href="#features">Features</a>
        <a href="#">Platform</a>
        <a href="#">Pricing</a>
        <a href="#">Docs</a>
      </div>
      <div className="flex items-center gap-4">
        <a
          href="#cta"
          className="rounded-[10px] bg-[linear-gradient(135deg,#7c3aed,#a855f7)] px-[18px] py-2.5 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset,0_8px_24px_rgba(124,58,237,0.4)] transition-[transform,box-shadow] duration-200 hover:-translate-y-px hover:shadow-[0_0_0_1px_rgba(255,255,255,0.14)_inset,0_12px_34px_rgba(124,58,237,0.6)]"
        >
          Start free
        </a>
      </div>
    </nav>
  );
}
