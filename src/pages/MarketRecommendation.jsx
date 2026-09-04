// Market Recommendation & Net Profit Maximizer Page
import { useApp } from '../context/AppContext.jsx';
import { Badge } from '../components/Badge.jsx';
import { marketRecommendationsByFarm } from '../data/recommendationData.js';

export function MarketRecommendation() {
  const { activeFarm, activeFarmId } = useApp();
  const rec = marketRecommendationsByFarm[activeFarmId] || marketRecommendationsByFarm["farm-1"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-borderEarth">
        <h1 className="text-2xl font-bold font-heading text-wood">
          ⚖️ AI Market Recommendation & Net Profit Maximizer
        </h1>
        <p className="text-xs text-mutedEarth mt-1">
          Automated net profit calculator factoring expected mandi prices, transit distances, labor fees, and regional demand for <strong className="text-wood">{activeFarm.name}</strong>.
        </p>
      </div>

      {/* TOP SPOTLIGHT SUMMARY CARD */}
      <div className="krishi-card p-6 bg-gradient-to-br from-white via-harvestGold-light/30 to-white border-2 border-harvestGold">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-borderEarth">
          <div className="flex items-center gap-2">
            <span className="p-2.5 rounded-xl bg-harvestGold text-white font-bold text-xl">🏆</span>
            <div>
              <span className="text-xs font-bold uppercase text-harvestGold-dark tracking-wider">
                Top Mandi Destination Recommendation
              </span>
              <h2 className="text-2xl font-extrabold font-heading text-wood">
                {rec.bestMandi}
              </h2>
            </div>
          </div>
          <Badge variant="harvestGold">
            Recommendation Score: {rec.recommendationScore} / 100
          </Badge>
        </div>

        {/* METRICS BREAKDOWN GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div className="bg-earth/80 p-4 rounded-xl border border-borderEarth">
            <span className="text-xs text-mutedEarth font-medium block mb-1">Target Crop & Harvest</span>
            <strong className="text-base text-wood block font-heading">{rec.cropName}</strong>
            <span className="text-[11px] text-mutedEarth">{rec.harvestQuantityQuintals} Quintals Total</span>
          </div>

          <div className="bg-earth/80 p-4 rounded-xl border border-borderEarth">
            <span className="text-xs text-mutedEarth font-medium block mb-1">Expected Rate</span>
            <strong className="text-xl text-wood block font-bold">₹ {rec.expectedPricePerQuintal.toLocaleString('en-IN')}</strong>
            <span className="text-[11px] text-mutedEarth">per quintal</span>
          </div>

          <div className="bg-earth/80 p-4 rounded-xl border border-borderEarth">
            <span className="text-xs text-mutedEarth font-medium block mb-1">Total Transport Cost</span>
            <strong className="text-xl text-alertRed-dark block font-bold">₹ {rec.totalTransportCost.toLocaleString('en-IN')}</strong>
            <span className="text-[11px] text-mutedEarth">₹{rec.transportCostPerQuintal}/q @ {rec.distanceKm} km</span>
          </div>

          <div className="bg-agriGreen-bg p-4 rounded-xl border border-agriGreen/40">
            <span className="text-xs text-agriGreen-dark font-bold block mb-1">Net Expected Profit</span>
            <strong className="text-2xl text-agriGreen-dark block font-extrabold font-heading">₹ {rec.netExpectedProfit.toLocaleString('en-IN')}</strong>
            <span className="text-[11px] text-agriGreen-dark font-semibold">After all logistics fees</span>
          </div>
        </div>
      </div>

      {/* RATIONALE: WHY WE RECOMMEND THIS MARKET */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 krishi-card p-6">
          <h3 className="text-base font-bold font-heading text-wood mb-4 flex items-center gap-2">
            <span>💡</span>
            <span>Why We Recommend This Market</span>
          </h3>

          <div className="space-y-3">
            {rec.whyWeRecommend.map((reason, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-earth/60 border border-borderEarth/70 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-harvestGold text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <div>
                  <h4 className="text-sm font-bold text-wood">
                    {reason.title}
                  </h4>
                  <p className="text-xs text-mutedEarth mt-1 leading-relaxed">
                    {reason.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* REGIONAL COMPARISON TABLE */}
        <div className="lg:col-span-5 krishi-card p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold font-heading text-wood mb-4">
              Regional Mandi Net Return Comparison
            </h3>

            <div className="space-y-3">
              {rec.otherMarketsComparison.map((mkt, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border transition-all ${
                    mkt.isBest 
                      ? 'bg-agriGreen-bg/40 border-agriGreen font-bold shadow-xs' 
                      : 'bg-earth/40 border-borderEarth'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-wood">{mkt.mandi}</span>
                    {mkt.isBest ? (
                      <Badge variant="agriGreen">Top Profit Choice</Badge>
                    ) : (
                      <span className="text-xs text-mutedEarth">Distance: {mkt.distance}</span>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs mt-2 pt-2 border-t border-borderEarth/60">
                    <div>
                      <span className="text-[10px] text-mutedEarth block">Rate/q</span>
                      <strong className="text-wood">₹{mkt.price}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-mutedEarth block">Transport/q</span>
                      <strong className="text-alertRed-dark">₹{mkt.transport}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-mutedEarth block">Net Profit/q</span>
                      <strong className="text-agriGreen-dark font-extrabold">₹{mkt.netProfitPerQuintal}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 p-3 bg-earth rounded-lg border border-borderEarth text-[11px] text-mutedEarth">
            ℹ️ Net profit estimates reflect current e-NAM mandi arrivals and diesel transport rates.
          </div>
        </div>
      </div>
    </div>
  );
}
