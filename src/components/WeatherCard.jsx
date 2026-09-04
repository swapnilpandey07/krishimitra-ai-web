// Weather Forecast Card Component
export function WeatherCard({ forecast }) {
  if (!forecast) return null;

  return (
    <div className="krishi-card p-4 text-center hover:border-weatherBlue transition-colors flex flex-col items-center justify-between">
      <span className="text-xs font-semibold text-mutedEarth block">
        {forecast.day}
      </span>
      <span className="text-[10px] text-mutedEarth block mb-2">
        {forecast.date}
      </span>

      <div className="p-2.5 rounded-full bg-weatherBlue-light text-weatherBlue-dark my-1">
        {forecast.condition.includes('Rain') || forecast.condition.includes('Drizzle') ? (
          <span className="text-xl">🌧️</span>
        ) : forecast.condition.includes('Thunder') ? (
          <span className="text-xl">🌩️</span>
        ) : forecast.condition.includes('Cloud') || forecast.condition.includes('Overcast') ? (
          <span className="text-xl">⛅</span>
        ) : (
          <span className="text-xl">☀️</span>
        )}
      </div>

      <div className="my-2">
        <span className="text-lg font-bold font-heading text-wood">
          {forecast.tempMax}°C
        </span>
        <span className="text-xs text-mutedEarth ml-1">
          / {forecast.tempMin}°C
        </span>
      </div>

      <div className="w-full pt-2 border-t border-borderEarth/60 text-[11px] text-mutedEarth space-y-1">
        <div className="flex justify-between">
          <span>Rain:</span>
          <strong className="text-weatherBlue-dark">{forecast.rainfall} mm</strong>
        </div>
        <div className="flex justify-between">
          <span>Humidity:</span>
          <strong className="text-wood">{forecast.humidity}%</strong>
        </div>
      </div>
    </div>
  );
}
