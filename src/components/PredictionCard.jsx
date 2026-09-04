// AI Crop Prediction Spotlight Card Component
import { ConfidenceGauge } from './ConfidenceGauge.jsx';
import { Badge } from './Badge.jsx';

export function PredictionCard({ prediction, onExploreDetails }) {
  if (!prediction) return null;

  return (
    <div className="krishi-card p-6 border-2 border-agriGreen/40 bg-gradient-to-br from-white via-white to-agriGreen-bg/40 relative overflow-hidden">
      {/* Top Banner Tag */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-borderEarth">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-lg bg-agriGreen text-white font-bold">
            🌱
          </span>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-agriGreen-dark">
              AI Crop Intelligence
            </h3>
            <p className="text-sm font-semibold text-wood">
              Recommended Crop for {prediction.farmName}
            </p>
          </div>
        </div>
        <Badge variant="agriGreen">
          {prediction.season}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mt-5">
        {/* Left Column: Crop Info */}
        <div className="md:col-span-7 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-wood mb-2">
              {prediction.recommendedCrop}
            </h2>
            
            <div className="flex flex-wrap gap-4 text-xs font-semibold text-mutedEarth mb-4">
              <span className="bg-earth px-3 py-1.5 rounded-md border border-borderEarth">
                Expected Yield: <strong className="text-wood">{prediction.expectedYield}</strong>
              </span>
              <span className="bg-earth px-3 py-1.5 rounded-md border border-borderEarth">
                Expected Revenue: <strong className="text-agriGreen-dark">{prediction.expectedRevenue}</strong>
              </span>
            </div>

            <p className="text-sm text-wood leading-relaxed mb-4 bg-white/80 p-3.5 rounded-lg border border-borderEarth/60">
              {prediction.explanation}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {prediction.keyAdvantages && prediction.keyAdvantages.map((adv, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-xs text-agriGreen-dark font-medium bg-agriGreen-bg px-2.5 py-1 rounded border border-agriGreen/20">
                <span>✓</span>
                <span>{adv}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Confidence Gauge */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-borderEarth">
          <ConfidenceGauge score={prediction.confidence} label="Match Score" />

          {/* Breakdown Mini Meters */}
          <div className="w-full mt-4 space-y-2 text-xs">
            <div className="flex justify-between font-medium text-mutedEarth">
              <span>Soil Chemistry Match:</span>
              <strong className="text-wood">{prediction.confidenceBreakdown.soilMatch}%</strong>
            </div>
            <div className="flex justify-between font-medium text-mutedEarth">
              <span>Weather Suitability:</span>
              <strong className="text-wood">{prediction.confidenceBreakdown.weatherSuitability}%</strong>
            </div>
            <div className="flex justify-between font-medium text-mutedEarth">
              <span>Market Demand Index:</span>
              <strong className="text-wood">{prediction.confidenceBreakdown.marketDemandScore}%</strong>
            </div>
          </div>

          {onExploreDetails && (
            <button
              onClick={onExploreDetails}
              className="mt-5 w-full btn-primary text-xs py-2"
            >
              Explore Crop Details & Farming Tips →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
