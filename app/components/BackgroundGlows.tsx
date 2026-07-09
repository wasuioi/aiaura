export function BackgroundGlows() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="animate-aura-pulse absolute left-1/2 top-[-320px] h-[820px] w-[1100px] -translate-x-1/2 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(139,92,246,0.30),transparent_70%)] blur-[40px]" />
      <div className="absolute right-[-260px] top-[120px] h-[680px] w-[680px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(34,211,238,0.16),transparent_70%)] blur-[50px]" />
      <div className="absolute left-[-280px] top-[1180px] h-[720px] w-[720px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(139,92,246,0.14),transparent_70%)] blur-[50px]" />
      <div className="grid-overlay absolute inset-0" />
    </div>
  );
}
