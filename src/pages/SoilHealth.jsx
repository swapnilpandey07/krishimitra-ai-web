// Soil Health Analytics & Nutrient Gauges Page
import { useApp } from '../context/AppContext.jsx';
import { SoilGauge } from '../components/SoilGauge.jsx';
import { ChartCard } from '../components/ChartCard.jsx';
import { Badge } from '../components/Badge.jsx';
import { soilDataByFarm } from '../data/soilData.js';

export function SoilHealth() {
  const { activeFarm, activeFarmId } = useApp();
  const soilData = soilDataByFarm[activeFarmId] || soilDataByFarm["farm-1"];

  const { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } = window.Recharts || {};

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-borderEarth">
        <div>
          <h1 className="text-2xl font-bold font-heading text-wood">
            🧪 Soil Health & Chemistry Intelligence
          </h1>
          <p className="text-xs text-mutedEarth mt-1">
            Real-time soil lab telemetry for <strong className="text-wood">{activeFarm.name}</strong> ({soilData.soilType}).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="agriGreen">
            Tested: {soilData.lastTestedDate}
          </Badge>
          <span className="text-xs font-bold text-wood bg-earth px-3 py-1.5 rounded-lg border border-borderEarth">
            Health Score: {soilData.healthScore} / 100
          </span>
        </div>
      </div>

      {/* FARMER FRIENDLY SOIL SUMMARY BANNER */}
      <div className="krishi-card p-5 bg-gradient-to-r from-white via-agriGreen-bg/30 to-white border-l-4 border-l-agriGreen">
        <h3 className="text-xs font-bold uppercase tracking-wider text-agriGreen-dark mb-1">
          Farmer Soil Health Summary:
        </h3>
        <p className="text-sm font-semibold text-wood leading-relaxed">
          "{soilData.summaryText}"
        </p>
      </div>

      {/* NUTRIENT METERS & GAUGES GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <SoilGauge
          label="Nitrogen (N)"
          val={soilData.metrics.nitrogen.val}
          unit={soilData.metrics.nitrogen.unit}
          status={soilData.metrics.nitrogen.status}
          min={0}
          max={400}
          ideal={soilData.metrics.nitrogen.ideal}
        />
        <SoilGauge
          label="Phosphorus (P)"
          val={soilData.metrics.phosphorus.val}
          unit={soilData.metrics.phosphorus.unit}
          status={soilData.metrics.phosphorus.status}
          min={0}
          max={100}
          ideal={soilData.metrics.phosphorus.ideal}
        />
        <SoilGauge
          label="Potassium (K)"
          val={soilData.metrics.potassium.val}
          unit={soilData.metrics.potassium.unit}
          status={soilData.metrics.potassium.status}
          min={0}
          max={350}
          ideal={soilData.metrics.potassium.ideal}
        />

        <SoilGauge
          label="Soil pH Level"
          val={soilData.metrics.ph.val}
          unit={soilData.metrics.ph.unit}
          status={soilData.metrics.ph.status}
          min={0}
          max={14}
          ideal={soilData.metrics.ph.ideal}
        />
        <SoilGauge
          label="Moisture Level"
          val={soilData.metrics.moisture.val}
          unit={soilData.metrics.moisture.unit}
          status={soilData.metrics.moisture.status}
          min={0}
          max={100}
          ideal={soilData.metrics.moisture.ideal}
        />
        <SoilGauge
          label="Soil Temperature"
          val={soilData.metrics.temperature.val}
          unit={soilData.metrics.temperature.unit}
          status={soilData.metrics.temperature.status}
          min={0}
          max={50}
          ideal={soilData.metrics.temperature.ideal}
        />
      </div>

      {/* RECHARTS NUTRIENT VISUALIZATION GRAPH */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <ChartCard
            title="NPK Nutrient Level Comparison (Current vs Ideal Target)"
            subtitle="Measured in kg/ha against ICAR benchmark standards"
          >
            {ResponsiveContainer ? (
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={soilData.chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2DAC8" />
                  <XAxis dataKey="nutrient" stroke="#6E655F" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#6E655F" tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2DAC8', borderRadius: '8px', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="Current" fill="#55703B" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Ideal" fill="#C9942F" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="p-8 text-center text-xs text-mutedEarth">Chart visual loading...</div>
            )}
          </ChartCard>
        </div>

        {/* ACTIONABLE RECOMMENDATIONS LIST */}
        <div className="lg:col-span-5 krishi-card p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold font-heading text-wood mb-3 flex items-center gap-2">
              <span>📋</span>
              <span>Agronomist Soil Recommendations</span>
            </h3>

            <div className="space-y-3">
              {soilData.recommendations.map((rec, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-earth/80 border border-borderEarth text-xs text-wood">
                  <span className="text-agriGreen font-bold shrink-0">✓</span>
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 p-3 bg-agriGreen-bg rounded-lg border border-agriGreen/30 text-xs text-agriGreen-dark">
            <strong>Organic Carbon:</strong> {soilData.metrics.organicCarbon.val}% ({soilData.metrics.organicCarbon.status})
          </div>
        </div>
      </div>
    </div>
  );
}
