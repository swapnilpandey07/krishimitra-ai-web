// Animated SVG Semi-Circle Confidence Gauge
export function ConfidenceGauge({ score = 90, size = 160, label = "AI Confidence" }) {
  const radius = 60;
  const circumference = Math.PI * radius; // Semi circle arc
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center relative select-none">
      <svg width={size} height={size * 0.65} viewBox="0 0 160 100" className="overflow-visible">
        {/* Background Arc */}
        <path
          d="M 20 85 A 60 60 0 0 1 140 85"
          fill="none"
          stroke="#E2DAC8"
          strokeWidth="12"
          strokeLinecap="round"
        />
        {/* Progress Arc */}
        <path
          d="M 20 85 A 60 60 0 0 1 140 85"
          fill="none"
          stroke={score > 85 ? "#55703B" : score > 70 ? "#C9942F" : "#A8452B"}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
        />
      </svg>
      {/* Center Score Text */}
      <div className="absolute top-[32%] flex flex-col items-center">
        <span className="text-3xl font-extrabold font-heading text-wood">
          {score}%
        </span>
        <span className="text-[11px] font-semibold tracking-wider text-mutedEarth uppercase mt-0.5">
          {label}
        </span>
      </div>
    </div>
  );
}
