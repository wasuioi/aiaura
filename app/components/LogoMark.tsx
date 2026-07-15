// The prompt tile: a `>` caret (the terminal prompt that also prefixes the
// question in DashboardPreview) on a brick tile. The mark says what the
// product does — you ask. Kept in one place so Nav and Footer can't drift.
export function LogoMark({ size = 26 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="8" fill="#c4483a" />
      <path
        d="M11 10 L19 16 L11 22"
        fill="none"
        stroke="#f0ebe7"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
