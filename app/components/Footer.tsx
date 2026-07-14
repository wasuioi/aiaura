export function Footer() {
  return (
    <footer className="relative z-[1] mx-auto mt-20 flex max-w-[1200px] flex-wrap items-center justify-between gap-4 border-t border-warm-800 px-[22px] pb-12 pt-9">
      <div className="flex items-center gap-2.5">
        <div className="h-[22px] w-[22px] rounded-[7px] bg-brick-500" />
        <span className="text-[15px] font-semibold text-warm-200">AuraAI</span>
      </div>
      <div className="text-[13px] text-warm-600">© 2026 AuraAI, Inc. All rights reserved.</div>
      <div className="flex gap-6 text-[13.5px] text-warm-400">
        <a href="#">Privacy</a>
        <a href="#">Terms</a>
        <a href="#">Status</a>
      </div>
    </footer>
  );
}
