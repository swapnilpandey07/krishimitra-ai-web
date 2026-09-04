// Dashboard / Landing View — Primary SIH Presentation Highlight Page
import { useApp } from '../context/AppContext.jsx';
import { StatCard } from '../components/StatCard.jsx';
import { PredictionCard } from '../components/PredictionCard.jsx';
import { DiseaseAlert } from '../components/DiseaseAlert.jsx';
import { RecommendationCard } from '../components/RecommendationCard.jsx';
import { MarketCard } from '../components/MarketCard.jsx';
import { NotificationItem } from '../components/NotificationItem.jsx';

import { aiCropPredictions } from '../data/cropData.js';
import { soilDataByFarm } from '../data/soilData.js';
import { weatherDataByFarm } from '../data/weatherData.js';
import { marketPricesList } from '../data/marketData.js';
import { marketRecommendationsByFarm } from '../data/recommendationData.js';
import { demoDiseaseResult } from '../data/diseaseData.js';

export function Dashboard() {
  const { user, farms, activeFarm, activeFarmId, notifications, navigateTo, markNotificationAsRead } = useApp();

  // Get active farm's dynamic datasets
  const cropPrediction = aiCropPredictions[activeFarmId] || aiCropPredictions["farm-1"];
  const soilData = soilDataByFarm[activeFarmId] || soilDataByFarm["farm-1"];
  const weatherData = weatherDataByFarm[activeFarmId] || weatherDataByFarm["farm-1"];
  const marketRecommendation = marketRecommendationsByFarm[activeFarmId] || marketRecommendationsByFarm["farm-1"];

  // Top 3 market snapshot listings
  const topMarkets = marketPricesList.slice(0, 3);
  const recentNotifications = notifications.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Top Banner / SIH Core Mission Statement */}
      <div className="krishi-card p-6 bg-gradient-to-r from-agriGreen to-agriGreen-dark text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-harvestGold text-white text-xs font-extrabold uppercase tracking-wider mb-2">
            <span>🏆 Smart India Hackathon 2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading mb-2 leading-tight">
            AI-Driven Agriculture Decision Support System
          </h1>
          <p className="text-sm text-agriGreen-bg max-w-3xl leading-relaxed">
            KrishiMitra-AI integrates real-time soil chemistry, localized micro-weather forecasts, computer vision crop disease diagnostics, and mandi market price intelligence to maximize net farmer profitability.
          </p>

          <div className="mt-4 pt-3 border-t border-white/20 flex flex-wrap items-center gap-4 text-xs">
            <span>🌾 Active Farm: <strong>{activeFarm.name}</strong></span>
            <span>📍 Location: <strong>{activeFarm.location}</strong></span>
            <span>🧪 Soil: <strong>{activeFarm.soilType}</strong></span>
          </div>
        </div>
      </div>

      {/* Stats Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Registered Farms"
          value={`${user.totalFarmsCount || farms.length} Farms`}
          subtext="Active multi-farm telemetry"
          badgeText="Active Context"
          badgeVariant="agriGreen"
          onClick={() => navigateTo('/farms')}
        />

        <StatCard
          title="Total Cultivated Acres"
          value={`${activeFarm.acres} Acres`}
          subtext={`Current Farm: ${activeFarm.name}`}
          badgeText="Survey SY-104/A"
          badgeVariant="harvestGold"
          onClick={() => navigateTo('/farms')}
        />

        <StatCard
          title="Soil Health Index"
          value={`${soilData.healthScore} / 100`}
          subtext={`Status: ${soilData.overallHealth} (pH ${soilData.metrics.ph.val})`}
          badgeText={soilData.metrics.nitrogen.status + " NPK"}
          badgeVariant="agriGreen"
          onClick={() => navigateTo('/soil')}
        />

        <StatCard
          title="Micro-Weather"
          value={`${weatherData.temp}°C`}
          subtext={`${weatherData.condition} • Humidity ${weatherData.humidity}%`}
          badgeText={`Rain Prob ${weatherData.rainfallProb}%`}
          badgeVariant="weatherBlue"
          onClick={() => navigateTo('/weather')}
        />
      </div>

      {/* QUICK ACTIONS BAR */}
      <div className="krishi-card p-4 bg-earth/60">
        <h3 className="text-xs font-bold uppercase tracking-wider text-mutedEarth mb-3">
          ⚡ Quick Farmer Actions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => navigateTo('/farms')}
            className="p-3 rounded-xl bg-white border border-borderEarth hover:border-agriGreen transition-all flex items-center gap-2.5 text-xs font-bold text-wood shadow-xs"
          >
            <span className="text-lg">➕</span>
            <span>Add New Farm</span>
          </button>
          <button
            onClick={() => navigateTo('/crops')}
            className="p-3 rounded-xl bg-white border border-borderEarth hover:border-agriGreen transition-all flex items-center gap-2.5 text-xs font-bold text-wood shadow-xs"
          >
            <span className="text-lg">🌱</span>
            <span>Check Crop Advisor</span>
          </button>
          <button
            onClick={() => navigateTo('/disease')}
            className="p-3 rounded-xl bg-white border border-borderEarth hover:border-alertRed transition-all flex items-center gap-2.5 text-xs font-bold text-wood shadow-xs"
          >
            <span className="text-lg">🔍</span>
            <span>Test Leaf Disease</span>
          </button>
          <button
            onClick={() => navigateTo('/recommendation')}
            className="p-3 rounded-xl bg-white border border-borderEarth hover:border-harvestGold transition-all flex items-center gap-2.5 text-xs font-bold text-wood shadow-xs"
          >
            <span className="text-lg">⚖️</span>
            <span>Best Market Price</span>
          </button>
        </div>
      </div>

      {/* MAIN FEATURE HIGHLIGHT: AI CROP PREDICTION */}
      <PredictionCard
        prediction={cropPrediction}
        onExploreDetails={() => navigateTo('/crops')}
      />

      {/* DISEASE ALERT BANNER */}
      <DiseaseAlert
        disease={demoDiseaseResult}
        onTreatClick={() => navigateTo('/disease')}
      />

      {/* BEST MARKET RECOMMENDATION HIGHLIGHT */}
      <RecommendationCard
        recommendation={marketRecommendation}
        onViewFullRecommendation={() => navigateTo('/recommendation')}
      />

      {/* MARKET SNAPSHOT & RECENT NOTIFICATIONS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Market Snapshot */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold font-heading text-wood">
              📈 Live Mandi Market Snapshot
            </h3>
            <button
              onClick={() => navigateTo('/market')}
              className="text-xs font-semibold text-agriGreen hover:underline"
            >
              View All Mandis →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {topMarkets.map(mkt => (
              <MarketCard
                key={mkt.id}
                market={mkt}
                onSelect={() => navigateTo('/market')}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Recent Notifications */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold font-heading text-wood">
              🔔 Recent Notifications
            </h3>
            <button
              onClick={() => navigateTo('/notifications')}
              className="text-xs font-semibold text-agriGreen hover:underline"
            >
              View All ({notifications.length}) →
            </button>
          </div>

          <div className="space-y-3">
            {recentNotifications.map(notif => (
              <NotificationItem
                key={notif.id}
                notification={notif}
                onMarkRead={markNotificationAsRead}
                onClick={() => navigateTo(notif.targetRoute || '/notifications')}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
