"use client";

// Single brick hue. The old line was a violet-to-cyan gradient — the exact
// two-hue gradient tell. The area fill still fades, but it's the same hue at
// different opacities (a shade ramp), not a second color.
//
// `direction` deliberately does NOT change the palette: a falling line stays
// brick, it does not turn red. It only describes the series to screen readers,
// which cannot see the shape.

const W = 560;
const H = 180;
const PAD = 6;

function buildPaths(data: number[]) {
  const pts = data.map((v, i) => {
    const x = PAD + (i / (data.length - 1)) * (W - PAD * 2);
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

export function RevenueChart({
  data,
  label,
  direction,
}: {
  data: number[];
  label: string;
  direction: "up" | "down";
}) {
  const { pts, linePath, areaPath } = buildPaths(data);
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
        role="img"
        aria-label={`${label}: trending ${direction}`}
      >
        <defs>
          <linearGradient id="brickArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c4483a" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#c4483a" stopOpacity="0" />
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
              stroke="rgba(240,235,231,0.05)"
              strokeWidth={1}
            />
          );
        })}

        <path d={areaPath} fill="url(#brickArea)" />

        <path
          d={linePath}
          fill="none"
          stroke="#d4664f"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: strokeLen,
            strokeDashoffset: strokeLen,
            animation: "auraDraw 1.8s cubic-bezier(.4,0,.2,1) .3s forwards",
          }}
        />

        <circle cx={lastX} cy={lastY} r={6} fill="#d4664f" opacity={0.25} />
        <circle cx={lastX} cy={lastY} r={3.2} fill="#d4664f" />
      </svg>
    </div>
  );
}
