"use client";

const DATA = [0.42, 0.35, 0.5, 0.46, 0.62, 0.58, 0.72, 0.68, 0.83, 0.79, 0.92, 0.98];
const W = 560;
const H = 180;
const PAD = 6;

function buildPaths() {
  const pts = DATA.map((v, i) => {
    const x = PAD + (i / (DATA.length - 1)) * (W - PAD * 2);
    const y = H - PAD - v * (H - PAD * 2);
    return [x, y] as const;
  });
  const linePath = pts
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(" ");
  const [lastX] = pts[pts.length - 1];
  const [firstX] = pts[0];
  const areaPath = `${linePath} L${lastX.toFixed(1)} ${H} L${firstX.toFixed(1)} ${H} Z`;
  return { pts, linePath, areaPath };
}

export function RevenueChart() {
  const { pts, linePath, areaPath } = buildPaths();
  const [lastX, lastY] = pts[pts.length - 1];
  const strokeLen = 1400;

  return (
    <div className="relative h-[180px]">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        width="100%"
        height="100%"
        className="block"
      >
        <defs>
          <linearGradient id="auraArea-revenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="auraLine-revenue" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>

        {[1, 2, 3].map((i) => {
          const y = (H / 4) * i;
          return (
            <line
              key={i}
              x1={0}
              x2={W}
              y1={y}
              y2={y}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth={1}
            />
          );
        })}

        <path d={areaPath} fill="url(#auraArea-revenue)" />

        <path
          d={linePath}
          fill="none"
          stroke="url(#auraLine-revenue)"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: strokeLen,
            strokeDashoffset: strokeLen,
            animation: "auraDraw 1.8s cubic-bezier(.4,0,.2,1) .3s forwards",
          }}
        />

        <circle cx={lastX} cy={lastY} r={6} fill="#22d3ee" opacity={0.25} />
        <circle cx={lastX} cy={lastY} r={3.2} fill="#22d3ee" />
      </svg>
    </div>
  );
}
