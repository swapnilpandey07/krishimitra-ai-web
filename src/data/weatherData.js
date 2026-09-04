// Weather Data mapped by Farm ID
export const weatherDataByFarm = {
  "farm-1": {
    farmId: "farm-1",
    location: "Indore (Sanwer), MP",
    temp: 27,
    feelsLike: 29,
    condition: "Partly Cloudy",
    conditionCode: "cloud-sun",
    humidity: 58,
    rainfallProb: 12, // %
    windSpeed: 14, // km/h
    uvIndex: 6,
    airQuality: "Good (AQI 42)",
    farmingTip: "Mild weather with 12% rain chance. Ideal window for land preparation, seed bed leveling, and basal fertilizer application.",
    forecast5Day: [
      { day: "Today", date: "03 Sep", tempMax: 28, tempMin: 19, condition: "Partly Cloudy", rainfall: 0.2, humidity: 58, icon: "CloudSun" },
      { day: "Thu", date: "04 Sep", tempMax: 29, tempMin: 20, condition: "Sunny", rainfall: 0.0, humidity: 52, icon: "Sun" },
      { day: "Fri", date: "05 Sep", tempMax: 31, tempMin: 21, condition: "Clear Sky", rainfall: 0.0, humidity: 48, icon: "Sun" },
      { day: "Sat", date: "06 Sep", tempMax: 27, tempMin: 18, condition: "Light Rain", rainfall: 4.5, humidity: 72, icon: "CloudRain" },
      { day: "Sun", date: "07 Sep", tempMax: 26, tempMin: 17, condition: "Moderate Rain", rainfall: 12.0, humidity: 80, icon: "CloudRain" }
    ],
    hourlyTrend: [
      { time: "06:00 AM", temp: 19, rainProb: 5, rainfall: 0.0 },
      { time: "09:00 AM", temp: 23, rainProb: 10, rainfall: 0.0 },
      { time: "12:00 PM", temp: 27, rainProb: 12, rainfall: 0.2 },
      { time: "03:00 PM", temp: 28, rainProb: 15, rainfall: 0.0 },
      { time: "06:00 PM", temp: 25, rainProb: 8, rainfall: 0.0 },
      { time: "09:00 PM", temp: 21, rainProb: 5, rainfall: 0.0 }
    ]
  },
  "farm-2": {
    farmId: "farm-2",
    location: "Ujjain (Tarana), MP",
    temp: 29,
    feelsLike: 32,
    condition: "Humid & Overcast",
    conditionCode: "cloud",
    humidity: 74,
    rainfallProb: 45,
    windSpeed: 18,
    uvIndex: 5,
    airQuality: "Moderate (AQI 68)",
    farmingTip: "High humidity (74%) and 45% rain chance in Ujjain region. Postpone spray of liquid pesticides by 24 hours to avoid wash-off.",
    forecast5Day: [
      { day: "Today", date: "03 Sep", tempMax: 29, tempMin: 22, condition: "Overcast", rainfall: 2.1, humidity: 74, icon: "Cloud" },
      { day: "Thu", date: "04 Sep", tempMax: 27, tempMin: 21, condition: "Heavy Rain", rainfall: 18.5, humidity: 88, icon: "CloudRain" },
      { day: "Fri", date: "05 Sep", tempMax: 26, tempMin: 20, condition: "Thunderstorm", rainfall: 24.0, humidity: 92, icon: "CloudLightning" },
      { day: "Sat", date: "06 Sep", tempMax: 28, tempMin: 20, condition: "Light Drizzle", rainfall: 3.2, humidity: 78, icon: "CloudDrizzle" },
      { day: "Sun", date: "07 Sep", tempMax: 30, tempMin: 21, condition: "Partly Sunny", rainfall: 0.5, humidity: 65, icon: "CloudSun" }
    ],
    hourlyTrend: [
      { time: "06:00 AM", temp: 22, rainProb: 30, rainfall: 0.5 },
      { time: "09:00 AM", temp: 25, rainProb: 40, rainfall: 0.8 },
      { time: "12:00 PM", temp: 29, rainProb: 45, rainfall: 1.2 },
      { time: "03:00 PM", temp: 28, rainProb: 50, rainfall: 2.1 },
      { time: "06:00 PM", temp: 26, rainProb: 35, rainfall: 0.4 },
      { time: "09:00 PM", temp: 23, rainProb: 20, rainfall: 0.0 }
    ]
  }
};
