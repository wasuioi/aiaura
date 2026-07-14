export function Nav() {
  return (
    <nav className="sticky top-0 z-50 mx-auto mt-3.5 flex max-w-[1200px] items-center justify-between rounded-2xl border border-warm-800 bg-[rgba(16,11,10,0.6)] px-[22px] py-3.5 backdrop-blur-[16px]">
      <div className="flex items-center gap-2.5">
        <div className="h-[26px] w-[26px] rounded-lg bg-brick-500" />
        <span className="text-[17px] font-bold tracking-[-0.02em] text-warm-050">
          Aura<span className="text-warm-400">AI</span>
        </span>
      </div>
      <div className="hidden items-center gap-8 text-sm text-warm-400 nav:flex">
        <a href="#features">How it works</a>
        <a href="#">Pricing</a>
        <a href="#">Docs</a>
      </div>
      <div className="flex items-center gap-4">
        <a
          href="#cta"
          className="rounded-[10px] bg-brick-500 px-[18px] py-2.5 text-sm font-semibold text-warm-050 transition-[transform,background-color] duration-200 hover:-translate-y-px hover:bg-brick-400"
        >
          Connect a database
        </a>
      </div>
    </nav>
  );
}
