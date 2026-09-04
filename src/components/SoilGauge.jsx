// Soil Parameter Meter & Indicator Component
export function SoilGauge({ label, val, unit, status, min = 0, max = 100, ideal }) {
  // Determine fill color based on status
  const isOptimal = status.toLowerCase().includes('optimal') || status.toLowerCase().includes('ideal') || status.toLowerCase().includes('normal') || status.toLowerCase().includes('good') || status.toLowerCase().includes('adequate');
  const isModerate = status.toLowerCase().includes('moderate') || status.toLowerCase().includes('slight');
  
  const percentage = Math.min(Math.max(((val - min) / (max - min)) * 100, 5), 100);

  return (
    <div className="krishi-card p-4 flex flex-col justify-between">
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-xs font-bold uppercase tracking-wider text-mutedEarth">
          {label}
        </span>
        <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${
          isOptimal ? 'bg-agriGreen-bg text-agriGreen-dark border-agriGreen/30' :
          isModerate ? 'bg-harvestGold-light text-harvestGold-dark border-harvestGold/30' :
          'bg-alertRed-light text-alertRed-dark border-alertRed/30'
        }`}>
          {status}
        </span>
      </div>

      <div className="my-2 flex items-baseline gap-1">
        <span className="text-2xl font-extrabold font-heading text-wood">
          {val}
        </span>
        <span className="text-xs font-medium text-mutedEarth">
          {unit}
        </span>
      </div>

      <div className="w-full mt-2">
        <div className="soil-meter-bg">
          <div 
            className={`soil-meter-fill ${
              isOptimal ? 'bg-agriGreen' : isModerate ? 'bg-harvestGold' : 'bg-alertRed'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        {ideal && (
          <div className="flex justify-between text-[10px] text-mutedEarth mt-1.5 font-medium">
            <span>Target Ideal Range:</span>
            <span className="text-wood font-semibold">{ideal}</span>
          </div>
        )}
      </div>
    </div>
  );
}
