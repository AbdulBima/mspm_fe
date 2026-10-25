
const GEOMETRY: Record<number, { r: number; armFrom: number; armTo: number }> = {
  40: { r: 19, armFrom: 11, armTo: 29 },
  48: { r: 23, armFrom: 13, armTo: 35 },
}; 

export function EmptyMark({ borderColor = "#DCD8E8", size = 40 }: { borderColor?: string; size?: number }) {
  const geo = GEOMETRY[size] ?? GEOMETRY[40];
  const center = size / 2;
  const armSpan = geo.armTo - geo.armFrom;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <circle cx={center} cy={center} r={geo.r} stroke={borderColor} strokeWidth="1.5" />
      <path
        d={`M${center} ${geo.armFrom}v${armSpan}M${geo.armFrom} ${center}h${armSpan}`}
        stroke="#6F01D0"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
