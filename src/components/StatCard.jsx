// Reusable Stat Card Component
export function StatCard({ title, value, subtext, icon: Icon, badgeText, badgeVariant = 'agriGreen', onClick }) {
  return (
    <div 
      onClick={onClick}
      className={`krishi-card p-5 flex flex-col justify-between ${onClick ? 'cursor-pointer hover:border-agriGreen' : ''}`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-xs font-bold uppercase tracking-wider text-mutedEarth">
          {title}
        </span>
        {Icon && (
          <div className="p-2.5 rounded-lg bg-earth text-agriGreen border border-borderEarth">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div>
        <div className="text-2xl font-bold font-heading text-wood">
          {value}
        </div>
        {subtext && (
          <p className="text-xs text-mutedEarth mt-1">
            {subtext}
          </p>
        )}
      </div>

      {badgeText && (
        <div className="mt-3 pt-2.5 border-t border-borderEarth flex items-center justify-between">
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${
            badgeVariant === 'alertRed' ? 'bg-alertRed-light text-alertRed-dark border-alertRed/30' :
            badgeVariant === 'harvestGold' ? 'bg-harvestGold-light text-harvestGold-dark border-harvestGold/30' :
            badgeVariant === 'weatherBlue' ? 'bg-weatherBlue-light text-weatherBlue-dark border-weatherBlue/30' :
            'bg-agriGreen-bg text-agriGreen-dark border-agriGreen/30'
          }`}>
            {badgeText}
          </span>
        </div>
      )}
    </div>
  );
}
