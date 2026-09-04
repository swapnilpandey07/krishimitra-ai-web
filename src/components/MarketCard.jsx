// Mandi Market Listing Card Component
import { Badge } from './Badge.jsx';

export function MarketCard({ market, onSelect }) {
  if (!market) return null;

  return (
    <div 
      onClick={() => onSelect && onSelect(market)}
      className="krishi-card p-5 hover:border-harvestGold cursor-pointer transition-all flex flex-col justify-between"
    >
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="text-base font-bold font-heading text-wood">
              {market.crop}
            </h3>
            <p className="text-xs font-semibold text-mutedEarth">
              📍 {market.mandi}
            </p>
          </div>
          <Badge variant={market.trend === 'up' ? 'agriGreen' : 'alertRed'}>
            {market.changePercent > 0 ? `+${market.changePercent}%` : `${market.changePercent}%`}
          </Badge>
        </div>

        <p className="text-xs text-mutedEarth mb-4">
          State: <span className="font-medium text-wood">{market.state}</span> ({market.district})
        </p>
      </div>

      <div className="bg-earth/60 p-3 rounded-lg border border-borderEarth">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <span className="text-[10px] uppercase font-bold text-mutedEarth block">Min Price</span>
            <span className="text-sm font-semibold text-wood">₹ {market.minPrice.toLocaleString('en-IN')}</span>
          </div>
          <div className="border-x border-borderEarth px-1">
            <span className="text-[10px] uppercase font-bold text-agriGreen-dark block">Modal Price</span>
            <span className="text-base font-extrabold text-agriGreen-dark">₹ {market.modalPrice.toLocaleString('en-IN')}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-mutedEarth block">Max Price</span>
            <span className="text-sm font-semibold text-wood">₹ {market.maxPrice.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] text-mutedEarth">
        <span>Daily Arrivals: {market.arrivals}</span>
        <span className="font-semibold text-agriGreen hover:underline">View 7-Day Trend →</span>
      </div>
    </div>
  );
}
