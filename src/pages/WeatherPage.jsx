// Weather Insights & 5-Day Micro-Forecast Page
import { useApp } from '../context/AppContext.jsx';
import { WeatherCard } from '../components/WeatherCard.jsx';
import { ChartCard } from '../components/ChartCard.jsx';
import { Badge } from '../components/Badge.jsx';
import { weatherDataByFarm } from '../data/weatherData.js';

export function WeatherPage() {
  const { activeFarm, activeFarmId } = useApp();
  const weather = weatherDataByFarm[activeFarmId] || weatherDataByFarm["farm-1"];

  const { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } = window.Recharts || {};

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-borderEarth">
        <div>
          <h1 className="text-2xl font-bold font-heading text-wood">
            🌧️ Micro-Weather Intelligence & Advisories
          </h1>
          <p className="text-xs text-mutedEarth mt-1">
            Hyper-local atmospheric conditions for <strong className="text-wood">{weather.location}</strong> ({activeFarm.name}).
          </p>
        </div>

        <Badge variant="weatherBlue">
          AQI: {weather.airQuality}
        </Badge>
      </div>

      {/* WEATHER HERO BANNER */}
      <div className="krishi-card p-6 bg-gradient-to-r from-weatherBlue-dark via-weatherBlue to-weatherBlue-dark text-white relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl">⛅</span>
              <div>
                <span className="text-3xl font-extrabold font-heading text-white">{weather.temp}°C</span>
                <span className="text-xs text-weatherBlue-light ml-2">Feels like {weather.feelsLike}°C</span>
              </div>
            </div>
            <h2 className="text-xl font-bold font-heading mb-1 text-white">
              {weather.condition}
            </h2>
            <p className="text-xs text-weatherBlue-light">
              📍 {weather.location} • Last Updated: Just Now
            </p>
          </div>

          <div className="md:col-span-5 grid grid-cols-2 gap-3 bg-white/10 p-4 rounded-xl backdrop-blur-xs text-xs">
            <div>
              <span className="text-weatherBlue-light block">Humidity</span>
              <strong className="text-white text-base">{weather.humidity}%</strong>
            </div>
            <div>
              <span className="text-weatherBlue-light block">Rain Chance</span>
              <strong className="text-white text-base">{weather.rainfallProb}%</strong>
            </div>
            <div>
              <span className="text-weatherBlue-light block">Wind Speed</span>
              <strong className="text-white text-base">{weather.windSpeed} km/h</strong>
            </div>
            <div>
              <span className="text-weatherBlue-light block">UV Index</span>
              <strong className="text-white text-base">{weather.uvIndex} / 10</strong>
            </div>
          </div>
        </div>
      </div>

      {/* DYNAMIC FARMING TIP BANNER */}
      <div className="krishi-card p-5 bg-gradient-to-r from-white via-harvestGold-light/30 to-white border-l-4 border-l-harvestGold flex items-start gap-3">
        <span className="text-2xl p-2 rounded-lg bg-harvestGold text-white shrink-0">💡</span>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-harvestGold-dark mb-1">
            Today's Weather-Based Farming Tip:
          </h3>
          <p className="text-sm font-semibold text-wood leading-relaxed">
            "{weather.farmingTip}"
          </p>
        </div>
      </div>

      {/* 5-DAY FORECAST GRID */}
      <div>
        <h3 className="text-lg font-bold font-heading text-wood mb-4">
          📅 5-Day Weather Forecast
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {weather.forecast5Day.map((item, idx) => (
            <WeatherCard key={idx} forecast={item} />
          ))}
        </div>
      </div>

      {/* RECHARTS HOURLY TREND GRAPH */}
      <ChartCard
        title="Hourly Temperature & Rainfall Probability Trend"
        subtitle="24-Hour atmospheric forecast trajectory"
      >
        {ResponsiveContainer ? (
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={weather.hourlyTrend} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4F7285" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#4F7285" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2DAC8" />
              <XAxis dataKey="time" stroke="#6E655F" tick={{ fontSize: 11 }} />
              <YAxis stroke="#6E655F" tick={{ fontSize: 11 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2DAC8', borderRadius: '8px', fontSize: '12px' }}
              />
              <Area type="monotone" dataKey="temp" stroke="#4F7285" fillOpacity={1} fill="url(#tempGrad)" name="Temp (°C)" />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="p-8 text-center text-xs text-mutedEarth">Chart visual loading...</div>
        )}
      </ChartCard>
    </div>
  );
}
