// Market Recommendation Summary Component
import { Badge } from './Badge.jsx';

export function RecommendationCard({ recommendation, onViewFullRecommendation }) {
  if (!recommendation) return null;

  return (
    <div className="krishi-card p-6 border-2 border-harvestGold bg-gradient-to-br from-white via-white to-harvestGold-light/20 relative">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-borderEarth">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-lg bg-harvestGold text-white font-bold text-lg">
            ⚖️
          </span>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-harvestGold-dark">
              Profit Maximizer AI
            </h3>
            <p className="text-sm font-semibold text-wood">
              Best Market for {recommendation.cropName}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-mutedEarth font-medium">Recommendation Score:</span>
          <Badge variant="harvestGold">
            ⭐ {recommendation.recommendationScore} / 100
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mt-5">
        <div className="lg:col-span-7">
          <div className="text-xs text-mutedEarth font-semibold uppercase tracking-wider mb-1">
            Recommended Mandi Destination
          </div>
          <h2 className="text-2xl font-extrabold font-heading text-wood mb-3">
            {recommendation.bestMandi}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
            <div className="bg-earth/80 p-3 rounded-lg border border-borderEarth">
              <span className="text-[11px] font-medium text-mutedEarth block">Expected Mandi Price</span>
              <span className="text-lg font-bold text-wood">₹ {recommendation.expectedPricePerQuintal.toLocaleString('en-IN')}<span className="text-xs font-normal"> /q</span></span>
            </div>
            <div className="bg-earth/80 p-3 rounded-lg border border-borderEarth">
              <span className="text-[11px] font-medium text-mutedEarth block">Transport Expense</span>
              <span className="text-lg font-bold text-alertRed-dark">₹ {recommendation.totalTransportCost.toLocaleString('en-IN')}</span>
            </div>
            <div className="bg-agriGreen-bg p-3 rounded-lg border border-agriGreen/30 col-span-2 sm:col-span-1">
              <span className="text-[11px] font-bold text-agriGreen-dark block">Net Profit</span>
              <span className="text-lg font-extrabold text-agriGreen-dark">₹ {recommendation.netExpectedProfit.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-mutedEarth">
              Why We Recommend This Mandi:
            </h4>
            {recommendation.whyWeRecommend.slice(0, 2).map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-wood bg-white p-2.5 rounded-lg border border-borderEarth/70">
                <span className="text-harvestGold font-bold">✓</span>
                <div>
                  <strong className="font-semibold text-wood">{item.title}: </strong>
                  <span className="text-mutedEarth">{item.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col justify-between bg-earth p-5 rounded-xl border border-borderEarth h-full">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-wood mb-3">
              Regional Mandi Net Comparison
            </h4>

            <div className="space-y-2.5">
              {recommendation.otherMarketsComparison.map((item, idx) => (
                <div 
                  key={idx} 
                  className={`p-3 rounded-lg border flex items-center justify-between text-xs ${
                    item.isBest ? 'bg-white border-harvestGold font-bold shadow-sm' : 'bg-white/60 border-borderEarth'
                  }`}
                >
                  <div>
                    <span className="text-wood block font-semibold">{item.mandi} ({item.distance})</span>
                    <span className="text-mutedEarth text-[11px]">Price: ₹{item.price} • Transport: ₹{item.transport}/q</span>
                  </div>
                  <div className="text-right">
                    <span className={`block font-bold text-sm ${item.isBest ? 'text-agriGreen-dark' : 'text-wood'}`}>
                      ₹{item.netProfitPerQuintal}/q
                    </span>
                    <span className="text-[10px] text-mutedEarth">Score: {item.score}/100</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {onViewFullRecommendation && (
            <button
              onClick={onViewFullRecommendation}
              className="mt-4 w-full btn-gold text-xs py-2"
            >
              View Detailed Market Breakdown →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
