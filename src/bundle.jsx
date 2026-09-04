// KrishiMitra-AI — Self-Contained Standalone Bundle for Babel Browser Execution

// ==========================================
// 0. PYTHON AI/ML BACKEND CLIENT BRIDGE
// ==========================================
const API_BASE_URL = 'http://127.0.0.1:5000';

const AgriApiClient = {
  checkHealth: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/health`, { signal: AbortSignal.timeout(2000) });
      if (res.ok) {
        return { isOnline: true, data: await res.json() };
      }
      return { isOnline: false };
    } catch (e) {
      return { isOnline: false };
    }
  },
  predictCrop: async (params) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/predict-crop`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
        signal: AbortSignal.timeout(4000)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend unavailable, using local intelligence engine:', e);
    }
    return null;
  },
  detectDisease: async (base64Image) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/detect-disease`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64Image }),
        signal: AbortSignal.timeout(6000)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend unavailable, using local diagnostic engine:', e);
    }
    return null;
  },
  predictPrice: async (crop, mandi, horizonDays = 30) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/predict-price`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ crop, mandi, horizonDays }),
        signal: AbortSignal.timeout(4000)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend unavailable, using local price engine:', e);
    }
    return null;
  },
  analyzeSoil: async (params) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/soil-health`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
        signal: AbortSignal.timeout(4000)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend unavailable, using local soil engine:', e);
    }
    return null;
  }
};

// ==========================================
// 1. DEMO DATA MODULES
// ==========================================

const initialFarmerProfile = {
  name: "Ramesh Patel",
  phone: "+91 98765 43210",
  email: "ramesh.patel@krishimitra.in",
  state: "Madhya Pradesh",
  district: "Indore",
  village: "Sanwer",
  avatarUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=200",
  memberSince: "2024",
  totalFarmsCount: 2,
  totalAcresCount: 9.0
};

const initialFarms = [
  {
    id: "farm-1",
    name: "Green Valley Farm",
    acres: 5.2,
    soilType: "Black Soil",
    irrigationType: "Drip Irrigation",
    location: "Indore, Madhya Pradesh",
    village: "Sanwer",
    surveyNumber: "SY-104/A",
    isActive: true,
    establishedYear: 2018
  },
  {
    id: "farm-2",
    name: "Riverside Farm",
    acres: 3.8,
    soilType: "Alluvial Soil",
    irrigationType: "Canal & Borewell",
    location: "Ujjain, Madhya Pradesh",
    village: "Tarana",
    surveyNumber: "SY-88/B",
    isActive: false,
    establishedYear: 2021
  }
];

const cropDatabase = [
  {
    id: "crop-wheat",
    name: "Wheat (Lok-1 / Sharbati)",
    category: "Cereal / Rabi",
    season: "Rabi (Oct - Mar)",
    soilType: "Black Soil / Loam",
    waterRequirement: "Medium (400-500 mm)",
    temperature: "15°C - 25°C",
    idealPh: "6.0 - 7.5",
    expectedYield: "18 - 22 quintals/acre",
    growthDuration: "115 - 130 days",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=600",
    description: "High-demand staple Rabi cereal crop excellent for clay loam and black soil with moderate irrigation.",
    farmingTips: [
      "Sow seeds during first fortnight of November for optimal germination.",
      "Apply split Nitrogen doses: 50% basal at sowing, 25% at crown root initiation, and 25% at flowering.",
      "Ensure critical irrigation at crown root initiation stage (21 days post sowing)."
    ]
  },
  {
    id: "crop-soybean",
    name: "Soybean (JS 335 / JS 9560)",
    category: "Oilseed / Kharif",
    season: "Kharif (Jun - Oct)",
    soilType: "Black Soil / Alluvial",
    waterRequirement: "High (450-650 mm)",
    temperature: "22°C - 32°C",
    idealPh: "6.5 - 7.5",
    expectedYield: "10 - 14 quintals/acre",
    growthDuration: "90 - 105 days",
    image: "https://images.unsplash.com/photo-1595231776515-ddffb1f4eb73?auto=format&fit=crop&q=80&w=600",
    description: "Major monsoon cash crop rich in protein, highly suitable for Malwa plateau black soils.",
    farmingTips: [
      "Treat seeds with Rhizobium culture & PSB before sowing to enhance nitrogen fixation.",
      "Maintain row spacing of 45 cm for efficient weed management and sunlight intake.",
      "Monitor strictly for girdle beetle and tobacco caterpillar during pod development."
    ]
  },
  {
    id: "crop-rice",
    name: "Basmati Rice (Pusa 1121)",
    category: "Cereal / Kharif",
    season: "Kharif (Jun - Nov)",
    soilType: "Alluvial / Clay Loam",
    waterRequirement: "Very High (1200-1500 mm)",
    temperature: "20°C - 35°C",
    idealPh: "5.5 - 6.5",
    expectedYield: "20 - 25 quintals/acre",
    growthDuration: "135 - 145 days",
    image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&q=80&w=600",
    description: "Premium aromatic rice cultivar ideal for moisture-retentive alluvial soils with rich canal water access.",
    farmingTips: [
      "Maintain 2-5 cm standing water during tillering and panicle initiation phases.",
      "Apply Zinc Sulphate @ 10 kg/acre basal to prevent Khaira disease.",
      "Harvest when 80-85% grains turn golden yellow for best aroma retention."
    ]
  },
  {
    id: "crop-mustard",
    name: "Mustard (Pusa Bold / RH 749)",
    category: "Oilseed / Rabi",
    season: "Rabi (Oct - Feb)",
    soilType: "Alluvial / Loam / Light Soil",
    waterRequirement: "Low (250-350 mm)",
    temperature: "10°C - 25°C",
    idealPh: "6.0 - 7.5",
    expectedYield: "8 - 12 quintals/acre",
    growthDuration: "110 - 125 days",
    image: "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&q=80&w=600",
    description: "Drought-tolerant high-oil content cash crop thriving in cool Rabi climate with minimal water requirements.",
    farmingTips: [
      "Perform thin plant population spacing at 15-20 days stage to prevent overcrowding.",
      "Spray Neem oil @ 5ml/litre if aphid infestation is noticed during flowering.",
      "Irrigate twice: first at flowering stage (30-35 days) and second at pod filling (60-65 days)."
    ]
  },
  {
    id: "crop-maize",
    name: "Maize / Corn (Hytech 5101)",
    category: "Cereal / Kharif & Rabi",
    season: "Kharif / Spring",
    soilType: "Well-drained Loam / Black Soil",
    waterRequirement: "Medium (500-600 mm)",
    temperature: "18°C - 30°C",
    idealPh: "6.5 - 7.5",
    expectedYield: "24 - 30 quintals/acre",
    growthDuration: "95 - 110 days",
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&q=80&w=600",
    description: "Versatile heavy feeder cereal crop suitable for grain and fodder with fast maturation.",
    farmingTips: [
      "Avoid waterlogging at all stages; ensure field has adequate slope and drainage.",
      "Apply Neem-coated Urea in three equal splits: sowing, knee-high, and tasseling stage.",
      "Scout regularly for Fall Armyworm egg masses on undersides of leaves."
    ]
  },
  {
    id: "crop-cotton",
    name: "Bt Cotton (RCH 659)",
    category: "Fiber / Commercial",
    season: "Kharif (May - Nov)",
    soilType: "Deep Black Soil",
    waterRequirement: "High (700-900 mm)",
    temperature: "21°C - 35°C",
    idealPh: "6.5 - 8.0",
    expectedYield: "12 - 16 quintals/acre",
    growthDuration: "160 - 180 days",
    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&q=80&w=600",
    description: "High-value commercial fiber crop tailored for deep black cotton soils with good water storage capability.",
    farmingTips: [
      "Adopt 90x60 cm or 120x45 cm spacing to prevent humidity build-up and boll rot.",
      "Spray Potassium Nitrate (13-0-45) @ 1% at boll development to increase seed weight.",
      "Pick cotton bolls when fully opened during dry morning hours."
    ]
  }
];

const aiCropPredictions = {
  "farm-1": {
    farmId: "farm-1",
    farmName: "Green Valley Farm",
    recommendedCrop: "Wheat (Sharbati / Lok-1)",
    confidence: 94,
    season: "Rabi Season",
    expectedYield: "21 Quintals / Acre",
    expectedRevenue: "₹ 54,600 / Acre",
    confidenceBreakdown: {
      soilMatch: 98,
      weatherSuitability: 92,
      marketDemandScore: 94,
      waterFeasibility: 92
    },
    explanation: "Deep Black Soil has high Potassium retention (240 kg/ha) and optimal pH (6.8). Given the upcoming mild winter temperature forecast (18°C-22°C) and drip irrigation capability, Wheat is predicted to yield 15% higher profit compared to Soybean or Chickpea.",
    keyAdvantages: [
      "Black soil holds moisture required during crown root initiation phase",
      "High market demand in Indore Mandi with projected price trend of ₹2,600/quintal",
      "Low risk of pest infection in current humidity window (52%)"
    ],
    alternateCrops: [
      { name: "Mustard (Pusa Bold)", confidence: 86, suitability: "High" },
      { name: "Chickpea (Desi)", confidence: 81, suitability: "Moderate" }
    ]
  },
  "farm-2": {
    farmId: "farm-2",
    farmName: "Riverside Farm",
    recommendedCrop: "Basmati Rice (Pusa 1121)",
    confidence: 89,
    season: "Kharif / Late Rabi",
    expectedYield: "24 Quintals / Acre",
    expectedRevenue: "₹ 88,800 / Acre",
    confidenceBreakdown: {
      soilMatch: 95,
      weatherSuitability: 88,
      marketDemandScore: 91,
      waterFeasibility: 85
    },
    explanation: "Alluvial Soil near the river channel provides organic matter (0.78%) and high Nitrogen (210 kg/ha). Abundant canal irrigation access makes Basmati Rice the top value recommendation with expected returns exceeding ₹3,700/quintal.",
    keyAdvantages: [
      "Rich river silt provides essential micronutrients and moisture retention",
      "Proximity to Ujjain Mandi reduces transportation logistics costs by 18%",
      "Excellent soil drainage prevents root rot during heavy rainfall spikes"
    ],
    alternateCrops: [
      { name: "Maize (Hybrid)", confidence: 83, suitability: "High" },
      { name: "Wheat (Lok-1)", confidence: 78, suitability: "Moderate" }
    ]
  }
};

const soilDataByFarm = {
  "farm-1": {
    farmId: "farm-1",
    farmName: "Green Valley Farm",
    soilType: "Black Cotton Soil",
    lastTestedDate: "24 Aug 2026",
    overallHealth: "Optimal",
    healthScore: 88,
    metrics: {
      nitrogen: { val: 195, unit: "kg/ha", status: "Moderate", min: 0, max: 400, ideal: "250-350" },
      phosphorus: { val: 42, unit: "kg/ha", status: "Optimal", min: 0, max: 100, ideal: "30-50" },
      potassium: { val: 240, unit: "kg/ha", status: "High", min: 0, max: 350, ideal: "150-250" },
      ph: { val: 6.8, unit: "pH", status: "Ideal (Neutral)", min: 0, max: 14, ideal: "6.5-7.5" },
      moisture: { val: 32, unit: "%", status: "Adequate", min: 0, max: 100, ideal: "25-35" },
      temperature: { val: 24, unit: "°C", status: "Normal", min: 0, max: 50, ideal: "20-28" },
      organicCarbon: { val: 0.65, unit: "%", status: "Moderate", ideal: "0.75-1.0%" }
    },
    chartData: [
      { nutrient: "Nitrogen (N)", Current: 195, Ideal: 300, unit: "kg/ha" },
      { nutrient: "Phosphorus (P)", Current: 42, Ideal: 40, unit: "kg/ha" },
      { nutrient: "Potassium (K)", Current: 240, Ideal: 200, unit: "kg/ha" },
      { nutrient: "Org. Carbon (*100)", Current: 65, Ideal: 85, unit: "%" }
    ],
    summaryText: "Soil is in rich health with strong Potassium and Phosphorus reserves. Nitrogen is slightly below optimal target for peak wheat germination.",
    recommendations: [
      "Apply 25 kg/acre Urea (Neem-coated) during basal dose to elevate Nitrogen levels.",
      "Incorporate 2 tonnes/acre Farm Yard Manure (FYM) to boost organic carbon from 0.65% to 0.80%.",
      "No additional Potash fertilizer is required as Potassium reserves (240 kg/ha) are surplus."
    ]
  },
  "farm-2": {
    farmId: "farm-2",
    farmName: "Riverside Farm",
    soilType: "Alluvial Silt Loam",
    lastTestedDate: "12 Aug 2026",
    overallHealth: "Good",
    healthScore: 81,
    metrics: {
      nitrogen: { val: 230, unit: "kg/ha", status: "Optimal", min: 0, max: 400, ideal: "250-350" },
      phosphorus: { val: 28, unit: "kg/ha", status: "Low", min: 0, max: 100, ideal: "30-50" },
      potassium: { val: 185, unit: "kg/ha", status: "Optimal", min: 0, max: 350, ideal: "150-250" },
      ph: { val: 7.2, unit: "pH", status: "Slightly Alkaline", min: 0, max: 14, ideal: "6.5-7.5" },
      moisture: { val: 41, unit: "%", status: "High", min: 0, max: 100, ideal: "25-35" },
      temperature: { val: 22, unit: "°C", status: "Cool", min: 0, max: 50, ideal: "20-28" },
      organicCarbon: { val: 0.78, unit: "%", status: "Good", ideal: "0.75-1.0%" }
    },
    chartData: [
      { nutrient: "Nitrogen (N)", Current: 230, Ideal: 300, unit: "kg/ha" },
      { nutrient: "Phosphorus (P)", Current: 28, Ideal: 40, unit: "kg/ha" },
      { nutrient: "Potassium (K)", Current: 185, Ideal: 200, unit: "kg/ha" },
      { nutrient: "Org. Carbon (*100)", Current: 78, Ideal: 85, unit: "%" }
    ],
    summaryText: "High river moisture retention with strong Nitrogen levels. Phosphorus is deficient (28 kg/ha) and requires targeted single superphosphate supplementation.",
    recommendations: [
      "Apply 40 kg/acre Single Super Phosphate (SSP) before rice transplanting.",
      "Ensure proper sub-surface field drainage to avoid root rot from excessive 41% soil moisture.",
      "Zinc Sulphate application @ 10 kg/acre recommended to offset alkaline pH (7.2)."
    ]
  }
};

const weatherDataByFarm = {
  "farm-1": {
    farmId: "farm-1",
    location: "Indore (Sanwer), MP",
    temp: 27,
    feelsLike: 29,
    condition: "Partly Cloudy",
    humidity: 58,
    rainfallProb: 12,
    windSpeed: 14,
    uvIndex: 6,
    airQuality: "Good (AQI 42)",
    farmingTip: "Mild weather with 12% rain chance. Ideal window for land preparation, seed bed leveling, and basal fertilizer application.",
    forecast5Day: [
      { day: "Today", date: "03 Sep", tempMax: 28, tempMin: 19, condition: "Partly Cloudy", rainfall: 0.2, humidity: 58 },
      { day: "Thu", date: "04 Sep", tempMax: 29, tempMin: 20, condition: "Sunny", rainfall: 0.0, humidity: 52 },
      { day: "Fri", date: "05 Sep", tempMax: 31, tempMin: 21, condition: "Clear Sky", rainfall: 0.0, humidity: 48 },
      { day: "Sat", date: "06 Sep", tempMax: 27, tempMin: 18, condition: "Light Rain", rainfall: 4.5, humidity: 72 },
      { day: "Sun", date: "07 Sep", tempMax: 26, tempMin: 17, condition: "Moderate Rain", rainfall: 12.0, humidity: 80 }
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
    humidity: 74,
    rainfallProb: 45,
    windSpeed: 18,
    uvIndex: 5,
    airQuality: "Moderate (AQI 68)",
    farmingTip: "High humidity (74%) and 45% rain chance in Ujjain region. Postpone spray of liquid pesticides by 24 hours to avoid wash-off.",
    forecast5Day: [
      { day: "Today", date: "03 Sep", tempMax: 29, tempMin: 22, condition: "Overcast", rainfall: 2.1, humidity: 74 },
      { day: "Thu", date: "04 Sep", tempMax: 27, tempMin: 21, condition: "Heavy Rain", rainfall: 18.5, humidity: 88 },
      { day: "Fri", date: "05 Sep", tempMax: 26, tempMin: 20, condition: "Thunderstorm", rainfall: 24.0, humidity: 92 },
      { day: "Sat", date: "06 Sep", tempMax: 28, tempMin: 20, condition: "Light Drizzle", rainfall: 3.2, humidity: 78 },
      { day: "Sun", date: "07 Sep", tempMax: 30, tempMin: 21, condition: "Partly Sunny", rainfall: 0.5, humidity: 65 }
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

const marketPricesList = [
  {
    id: "mkt-1",
    crop: "Wheat (Sharbati)",
    mandi: "Indore Mandi (Laxmi Nagar)",
    state: "Madhya Pradesh",
    district: "Indore",
    minPrice: 2450,
    modalPrice: 2600,
    maxPrice: 2780,
    date: "03 Sep 2026",
    changePercent: +3.2,
    trend: "up",
    arrivals: "1,450 Quintals",
    trend7Days: [
      { day: "28 Aug", price: 2510 },
      { day: "29 Aug", price: 2525 },
      { day: "30 Aug", price: 2540 },
      { day: "31 Aug", price: 2530 },
      { day: "01 Sep", price: 2560 },
      { day: "02 Sep", price: 2580 },
      { day: "03 Sep", price: 2600 }
    ]
  },
  {
    id: "mkt-2",
    crop: "Soybean (Yellow)",
    mandi: "Ujjain Mandi",
    state: "Madhya Pradesh",
    district: "Ujjain",
    minPrice: 4200,
    modalPrice: 4550,
    maxPrice: 4720,
    date: "03 Sep 2026",
    changePercent: +1.8,
    trend: "up",
    arrivals: "2,100 Quintals",
    trend7Days: [
      { day: "28 Aug", price: 4420 },
      { day: "29 Aug", price: 4450 },
      { day: "30 Aug", price: 4480 },
      { day: "31 Aug", price: 4500 },
      { day: "01 Sep", price: 4510 },
      { day: "02 Sep", price: 4530 },
      { day: "03 Sep", price: 4550 }
    ]
  },
  {
    id: "mkt-3",
    crop: "Basmati Rice (Pusa 1121)",
    mandi: "Dewas Mandi",
    state: "Madhya Pradesh",
    district: "Dewas",
    minPrice: 3500,
    modalPrice: 3700,
    maxPrice: 3950,
    date: "03 Sep 2026",
    changePercent: +4.5,
    trend: "up",
    arrivals: "890 Quintals",
    trend7Days: [
      { day: "28 Aug", price: 3540 },
      { day: "29 Aug", price: 3580 },
      { day: "30 Aug", price: 3610 },
      { day: "31 Aug", price: 3630 },
      { day: "01 Sep", price: 3650 },
      { day: "02 Sep", price: 3680 },
      { day: "03 Sep", price: 3700 }
    ]
  },
  {
    id: "mkt-4",
    crop: "Mustard (Black)",
    mandi: "Neemuch Mandi",
    state: "Madhya Pradesh",
    district: "Neemuch",
    minPrice: 5100,
    modalPrice: 5350,
    maxPrice: 5600,
    date: "03 Sep 2026",
    changePercent: -0.8,
    trend: "down",
    arrivals: "1,120 Quintals",
    trend7Days: [
      { day: "28 Aug", price: 5410 },
      { day: "29 Aug", price: 5400 },
      { day: "30 Aug", price: 5380 },
      { day: "31 Aug", price: 5390 },
      { day: "01 Sep", price: 5370 },
      { day: "02 Sep", price: 5360 },
      { day: "03 Sep", price: 5350 }
    ]
  },
  {
    id: "mkt-5",
    crop: "Maize (Yellow Hybrid)",
    mandi: "Mandsaur Mandi",
    state: "Madhya Pradesh",
    district: "Mandsaur",
    minPrice: 1980,
    modalPrice: 2150,
    maxPrice: 2280,
    date: "03 Sep 2026",
    changePercent: +2.1,
    trend: "up",
    arrivals: "1,680 Quintals",
    trend7Days: [
      { day: "28 Aug", price: 2090 },
      { day: "29 Aug", price: 2100 },
      { day: "30 Aug", price: 2110 },
      { day: "31 Aug", price: 2120 },
      { day: "01 Sep", price: 2130 },
      { day: "02 Sep", price: 2140 },
      { day: "03 Sep", price: 2150 }
    ]
  },
  {
    id: "mkt-6",
    crop: "Cotton (Medium Staple)",
    mandi: "Khandwa Mandi",
    state: "Madhya Pradesh",
    district: "Khandwa",
    minPrice: 6800,
    modalPrice: 7100,
    maxPrice: 7400,
    date: "03 Sep 2026",
    changePercent: +0.5,
    trend: "up",
    arrivals: "750 Quintals",
    trend7Days: [
      { day: "28 Aug", price: 7050 },
      { day: "29 Aug", price: 7060 },
      { day: "30 Aug", price: 7070 },
      { day: "31 Aug", price: 7080 },
      { day: "01 Sep", price: 7090 },
      { day: "02 Sep", price: 7095 },
      { day: "03 Sep", price: 7100 }
    ]
  }
];

const mandiStateOptions = ["All States", "Madhya Pradesh", "Rajasthan", "Maharashtra", "Gujarat", "Punjab"];
const mandiDistrictOptions = ["All Districts", "Indore", "Ujjain", "Dewas", "Neemuch", "Mandsaur", "Khandwa"];

const marketRecommendationsByFarm = {
  "farm-1": {
    farmId: "farm-1",
    farmName: "Green Valley Farm (Indore)",
    cropName: "Wheat (Sharbati)",
    harvestQuantityQuintals: 105,
    bestMandi: "Indore Mandi (Laxmi Nagar)",
    distanceKm: 18,
    expectedPricePerQuintal: 2600,
    grossRevenue: 273000,
    transportCostPerQuintal: 45,
    totalTransportCost: 4725,
    laborMandiFees: 2100,
    netExpectedProfit: 266175,
    recommendationScore: 96,
    whyWeRecommend: [
      {
        title: "Higher Price Realization (+₹180/quintal)",
        detail: "Indore Mandi is offering ₹2,600/q compared to regional average of ₹2,420/q due to strong flour mill procurement contracts."
      },
      {
        title: "Lowest Transportation Overhead",
        detail: "Farm is located just 18 km from Laxmi Nagar Mandi. Direct tractor trolley dispatch costs only ₹45/quintal."
      },
      {
        title: "High Demand & Fast Payment",
        detail: "Daily arrivals clearance speed is 94% with direct e-NAM bank transfers settled within 24 hours."
      },
      {
        title: "Optimal Soil & Grain Quality Match",
        detail: "High-gluten Sharbati grain grown in Indore Black Soil commands top grading premium at this location."
      }
    ],
    otherMarketsComparison: [
      { mandi: "Indore Mandi", distance: "18 km", price: 2600, transport: 45, netProfitPerQuintal: 2535, score: 96, isBest: true },
      { mandi: "Ujjain Mandi", distance: "45 km", price: 2580, transport: 90, netProfitPerQuintal: 2470, score: 87, isBest: false },
      { mandi: "Dewas Mandi", distance: "52 km", price: 2520, transport: 105, netProfitPerQuintal: 2395, score: 79, isBest: false }
    ]
  },
  "farm-2": {
    farmId: "farm-2",
    farmName: "Riverside Farm (Ujjain)",
    cropName: "Basmati Rice (Pusa 1121)",
    harvestQuantityQuintals: 91,
    bestMandi: "Ujjain Mandi",
    distanceKm: 22,
    expectedPricePerQuintal: 3700,
    grossRevenue: 336700,
    transportCostPerQuintal: 55,
    totalTransportCost: 5005,
    laborMandiFees: 2800,
    netExpectedProfit: 328895,
    recommendationScore: 93,
    whyWeRecommend: [
      {
        title: "Top Exporter Buying Cluster (+₹200/quintal)",
        detail: "Ujjain Mandi has active rice exporter agents offering ₹3,700/q premium for long-grain Pusa 1121."
      },
      {
        title: "Minimal Transit Loss",
        detail: "22 km paved route limits grain shattering during transit to less than 0.2%."
      },
      {
        title: "Instant e-NAM Digital Weighment",
        detail: "Calibrated electronic weighbridges guarantee zero discrepancy on moisture and gross weight."
      }
    ],
    otherMarketsComparison: [
      { mandi: "Ujjain Mandi", distance: "22 km", price: 3700, transport: 55, netProfitPerQuintal: 3615, score: 93, isBest: true },
      { mandi: "Dewas Mandi", distance: "38 km", price: 3650, transport: 80, netProfitPerQuintal: 3540, score: 84, isBest: false },
      { mandi: "Indore Mandi", distance: "62 km", price: 3720, transport: 140, netProfitPerQuintal: 3550, score: 81, isBest: false }
    ]
  }
};

const demoDiseaseResult = {
  diseaseName: "Wheat Leaf Rust (Puccinia triticina)",
  confidence: 87,
  severity: "HIGH SEVERITY",
  severityLevel: "high",
  affectedCrop: "Wheat (Triticum aestivum)",
  detectedOn: "03 Sep 2026",
  symptoms: [
    "Reddish-orange pustules scattered on upper leaf surface",
    "Early leaf senescence causing reduced photosynthetic capacity",
    "Yellow halo surrounding active spore pustules"
  ],
  treatments: {
    chemical: [
      "Spray Propiconazole 25% EC @ 1 ml/litre of water immediately.",
      "Alternative: Tebuconazole 50% + Trifloxystrobin 25% WG @ 0.7 g/litre.",
      "Repeat spray after 12-14 days if humid conditions persist."
    ],
    organic: [
      "Spray fermented Sour Milk/Butter Milk (Lassi) solution @ 50 ml/litre of water.",
      "Apply 5% Neem Seed Kernel Extract (NSKE) with soap solution.",
      "Dust fine Wood Ash on damp leaves in early morning hours."
    ],
    preventiveSteps: [
      "Ensure proper row spacing to reduce crop canopy relative humidity.",
      "Avoid excess split doses of Nitrogenous fertilizers late in the season.",
      "Use rust-resistant varieties like HD-2967 or PBW-550 in upcoming sowing."
    ]
  }
};

const diseaseHistoryLog = [
  {
    id: "diag-101",
    crop: "Wheat",
    farm: "Green Valley Farm",
    disease: "Leaf Rust",
    confidence: 87,
    severity: "HIGH",
    date: "03 Sep 2026",
    status: "Treatment In Progress",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "diag-98",
    crop: "Soybean",
    farm: "Green Valley Farm",
    disease: "Yellow Mosaic Virus",
    confidence: 92,
    severity: "MEDIUM",
    date: "18 Aug 2026",
    status: "Resolved",
    image: "/public/yellow_mosaic_virus.jpg"
  },
  {
    id: "diag-84",
    crop: "Rice",
    farm: "Riverside Farm",
    disease: "Bacterial Leaf Blight",
    confidence: 81,
    severity: "LOW",
    date: "04 Aug 2026",
    status: "Resolved",
    image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&q=80&w=200"
  }
];

const initialNotifications = [
  {
    id: "notif-1",
    category: "Disease",
    title: "High Disease Alert: Leaf Rust Detected",
    message: "Leaf Rust (87% confidence) detected on Green Valley Farm. Immediate Propiconazole spray advised.",
    timestamp: "10 mins ago",
    date: "03 Sep 2026",
    isRead: false,
    targetRoute: "/disease",
    badgeType: "alertRed"
  },
  {
    id: "notif-2",
    category: "Market",
    title: "Market Opportunity: Indore Mandi Price Surge",
    message: "Wheat (Sharbati) price increased by +3.2% to ₹2,600/quintal in Indore Mandi. Best market score is 96.",
    timestamp: "1 hour ago",
    date: "03 Sep 2026",
    isRead: false,
    targetRoute: "/recommendation",
    badgeType: "harvestGold"
  },
  {
    id: "notif-3",
    category: "Weather",
    title: "Rain Advisory for Ujjain Region",
    message: "Moderate rain (18.5 mm) expected tomorrow at Riverside Farm. Delay pesticide application.",
    timestamp: "3 hours ago",
    date: "03 Sep 2026",
    isRead: true,
    targetRoute: "/weather",
    badgeType: "weatherBlue"
  },
  {
    id: "notif-4",
    category: "Soil",
    title: "Soil Test Analysis Ready",
    message: "Green Valley Farm soil report updated. Potassium level is High (240 kg/ha); Nitrogen application recommended.",
    timestamp: "Yesterday",
    date: "02 Sep 2026",
    isRead: true,
    targetRoute: "/soil",
    badgeType: "agriGreen"
  },
  {
    id: "notif-5",
    category: "Crop",
    title: "Optimal Sowing Window Opening",
    message: "Rabi season Wheat sowing window opens in 15 days for Indore Black Soil zone.",
    timestamp: "2 days ago",
    date: "01 Sep 2026",
    isRead: true,
    targetRoute: "/crops",
    badgeType: "agriGreen"
  }
];

// ==========================================
// 2. CONTEXT & STATE PROVIDER
// ==========================================

const AppContext = React.createContext();

function AppProvider({ children }) {
  const [user, setUser] = React.useState(() => {
    const saved = localStorage.getItem('krishi_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return { ...initialFarmerProfile, isLoggedIn: true };
  });

  const [farms, setFarms] = React.useState(() => {
    const saved = localStorage.getItem('krishi_farms');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialFarms;
  });

  const [activeFarmId, setActiveFarmId] = React.useState(() => {
    const saved = localStorage.getItem('krishi_active_farm');
    return saved || "farm-1";
  });

  const [notifications, setNotifications] = React.useState(() => {
    const saved = localStorage.getItem('krishi_notifications');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialNotifications;
  });

  const [currentRoute, setCurrentRoute] = React.useState(() => {
    return localStorage.getItem('krishi_route') || '/';
  });

  const [toast, setToast] = React.useState(null);

  React.useEffect(() => {
    localStorage.setItem('krishi_user', JSON.stringify(user));
  }, [user]);

  React.useEffect(() => {
    localStorage.setItem('krishi_farms', JSON.stringify(farms));
  }, [farms]);

  React.useEffect(() => {
    localStorage.setItem('krishi_active_farm', activeFarmId);
  }, [activeFarmId]);

  React.useEffect(() => {
    localStorage.setItem('krishi_notifications', JSON.stringify(notifications));
  }, [notifications]);

  React.useEffect(() => {
    localStorage.setItem('krishi_route', currentRoute);
  }, [currentRoute]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const navigateTo = (route) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const loginUser = (email, password) => {
    setUser(prev => ({
      ...prev,
      email: email || prev.email,
      isLoggedIn: true
    }));
    showToast(`Welcome back, ${user.name}! Logged in successfully.`);
    navigateTo('/');
  };

  const signupUser = (formData) => {
    setUser({
      ...formData,
      isLoggedIn: true,
      avatarUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=200",
      memberSince: "2026",
      totalFarmsCount: farms.length,
      totalAcresCount: farms.reduce((acc, f) => acc + (parseFloat(f.acres) || 0), 0)
    });
    showToast(`Account created! Welcome to KrishiMitra-AI, ${formData.name}.`);
    navigateTo('/');
  };

  const logoutUser = () => {
    setUser(prev => ({ ...prev, isLoggedIn: false }));
    showToast('Logged out successfully.', 'info');
    navigateTo('/login');
  };

  const updateProfile = (updatedProfile) => {
    setUser(prev => ({ ...prev, ...updatedProfile }));
    showToast('Farmer profile saved successfully!');
  };

  const switchActiveFarm = (farmId) => {
    setActiveFarmId(farmId);
    setFarms(prev => prev.map(f => ({ ...f, isActive: f.id === farmId })));
    const target = farms.find(f => f.id === farmId);
    showToast(`Switched active farm to ${target ? target.name : 'Selected Farm'}`);
  };

  const addFarm = (farmData) => {
    const newId = `farm-${Date.now()}`;
    const newFarm = {
      id: newId,
      name: farmData.name,
      acres: parseFloat(farmData.acres) || 1.0,
      soilType: farmData.soilType || 'Black Soil',
      irrigationType: farmData.irrigationType || 'Borewell',
      location: `${farmData.district || 'Indore'}, ${farmData.state || 'Madhya Pradesh'}`,
      village: farmData.village || 'Local Village',
      surveyNumber: farmData.surveyNumber || `SY-${Math.floor(100 + Math.random() * 800)}`,
      isActive: true,
      establishedYear: new Date().getFullYear()
    };

    setFarms(prev => [...prev.map(f => ({ ...f, isActive: false })), newFarm]);
    setActiveFarmId(newId);
    setUser(prev => ({
      ...prev,
      totalFarmsCount: prev.totalFarmsCount + 1,
      totalAcresCount: prev.totalAcresCount + newFarm.acres
    }));

    showToast(`New farm "${newFarm.name}" added and activated!`);
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    showToast('All notifications marked as read');
  };

  const activeFarm = React.useMemo(() => {
    return farms.find(f => f.id === activeFarmId) || farms[0] || initialFarms[0];
  }, [farms, activeFarmId]);

  const unreadNotificationCount = React.useMemo(() => {
    return notifications.filter(n => !n.isRead).length;
  }, [notifications]);

  const value = {
    user,
    farms,
    activeFarm,
    activeFarmId,
    notifications,
    unreadNotificationCount,
    currentRoute,
    toast,
    showToast,
    navigateTo,
    loginUser,
    signupUser,
    logoutUser,
    updateProfile,
    switchActiveFarm,
    addFarm,
    markNotificationAsRead,
    markAllNotificationsAsRead
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

function useApp() {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

// ==========================================
// 3. REUSABLE UI COMPONENTS
// ==========================================

function Badge({ variant = 'agriGreen', children, className = '' }) {
  const styles = {
    agriGreen: 'bg-agriGreen-bg text-agriGreen-dark border-agriGreen/20',
    harvestGold: 'bg-harvestGold-light text-harvestGold-dark border-harvestGold/30',
    weatherBlue: 'bg-weatherBlue-light text-weatherBlue-dark border-weatherBlue/30',
    alertRed: 'bg-alertRed-light text-alertRed-dark border-alertRed/30',
    neutral: 'bg-earth text-wood border-borderEarth'
  };

  const activeStyle = styles[variant] || styles.neutral;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border ${activeStyle} ${className}`}>
      <span>{children}</span>
    </span>
  );
}

function ConfidenceGauge({ score = 90, size = 160, label = "AI Confidence" }) {
  const radius = 60;
  const circumference = Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center relative select-none">
      <svg width={size} height={size * 0.65} viewBox="0 0 160 100" className="overflow-visible">
        <path
          d="M 20 85 A 60 60 0 0 1 140 85"
          fill="none"
          stroke="#E2DAC8"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d="M 20 85 A 60 60 0 0 1 140 85"
          fill="none"
          stroke={score > 85 ? "#55703B" : score > 70 ? "#C9942F" : "#A8452B"}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
        />
      </svg>
      <div className="absolute top-[32%] flex flex-col items-center">
        <span className="text-3xl font-extrabold font-heading text-wood">
          {score}%
        </span>
        <span className="text-[11px] font-semibold tracking-wider text-mutedEarth uppercase mt-0.5">
          {label}
        </span>
      </div>
    </div>
  );
}

function StatCard({ title, value, subtext, icon, badgeText, badgeVariant = 'agriGreen', onClick }) {
  return (
    <div 
      onClick={onClick}
      className={`krishi-card p-5 flex flex-col justify-between ${onClick ? 'cursor-pointer hover:border-agriGreen' : ''}`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-xs font-bold uppercase tracking-wider text-mutedEarth">
          {title}
        </span>
        {icon && (
          <div className="p-2 rounded-lg bg-earth text-agriGreen border border-borderEarth text-lg">
            {icon}
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

function PredictionCard({ prediction, onExploreDetails }) {
  if (!prediction) return null;

  return (
    <div className="krishi-card p-6 border-2 border-agriGreen/40 bg-gradient-to-br from-white via-white to-agriGreen-bg/40 relative overflow-hidden">
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

        <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-borderEarth">
          <ConfidenceGauge score={prediction.confidence} label="Match Score" />

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

function DiseaseAlert({ disease, onTreatClick }) {
  if (!disease) return null;

  return (
    <div className="krishi-card p-5 border-l-4 border-l-alertRed bg-alertRed-light/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div className="flex items-start gap-3">
        <div className="p-2.5 rounded-lg bg-alertRed text-white shrink-0 mt-0.5">
          ⚠️
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <Badge variant="alertRed">
              {disease.severity}
            </Badge>
            <span className="text-xs font-semibold text-alertRed-dark">
              Confidence: {disease.confidence}%
            </span>
            <span className="text-xs text-mutedEarth">• Detected {disease.detectedOn}</span>
          </div>
          <h4 className="text-base font-bold font-heading text-wood">
            Disease Alert: {disease.diseaseName}
          </h4>
          <p className="text-xs text-wood/90 mt-1 max-w-2xl">
            {disease.symptoms[0]}. Immediate fungicide spray recommended to contain leaf area damage.
          </p>
        </div>
      </div>

      <div className="shrink-0 flex items-center gap-3 w-full md:w-auto">
        <button
          onClick={onTreatClick}
          className="w-full md:w-auto px-4 py-2 bg-alertRed hover:bg-alertRed-dark text-white font-semibold text-xs rounded-lg transition-colors shadow-sm"
        >
          View Recommended Treatment →
        </button>
      </div>
    </div>
  );
}

function MarketCard({ market, onSelect }) {
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
        <span>Arrivals: {market.arrivals}</span>
        <span className="font-semibold text-agriGreen hover:underline">View 7-Day Graph →</span>
      </div>
    </div>
  );
}

function RecommendationCard({ recommendation, onViewFullRecommendation }) {
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
              <span className="text-[11px] font-medium text-mutedEarth block">Expected Rate</span>
              <span className="text-lg font-bold text-wood">₹ {recommendation.expectedPricePerQuintal.toLocaleString('en-IN')}<span className="text-xs font-normal"> /q</span></span>
            </div>
            <div className="bg-earth/80 p-3 rounded-lg border border-borderEarth">
              <span className="text-[11px] font-medium text-mutedEarth block">Transport Cost</span>
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
              Regional Mandi Comparison
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

function WeatherCard({ forecast }) {
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

function SoilGauge({ label, val, unit, status, min = 0, max = 100, ideal }) {
  const isOptimal = status.toLowerCase().includes('optimal') || status.toLowerCase().includes('ideal') || status.toLowerCase().includes('normal') || status.toLowerCase().includes('good') || status.toLowerCase().includes('adequate');
  const isModerate = status.toLowerCase().includes('moderate') || status.toLowerCase().includes('slight');
  
  const percentage = Math.min(Math.max(((val - min) / (max - min)) * 100, 5), 100);

  return (
    <div className="krishi-card p-4 flex flex-col justify-between">
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-xs font-bold uppercase tracking-wider text-mutedEarth">
          {label}
        </span>
        <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${
          isOptimal ? 'bg-agriGreen-bg text-agriGreen-dark border-agriGreen/30' :
          isModerate ? 'bg-harvestGold-light text-harvestGold-dark border-harvestGold/30' :
          'bg-alertRed-light text-alertRed-dark border-alertRed/30'
        }`}>
          {status}
        </span>
      </div>

      <div className="my-2 flex items-baseline gap-1">
        <span className="text-2xl font-extrabold font-heading text-wood">
          {val}
        </span>
        <span className="text-xs font-medium text-mutedEarth">
          {unit}
        </span>
      </div>

      <div className="w-full mt-2">
        <div className="soil-meter-bg">
          <div 
            className={`soil-meter-fill ${
              isOptimal ? 'bg-agriGreen' : isModerate ? 'bg-harvestGold' : 'bg-alertRed'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        {ideal && (
          <div className="flex justify-between text-[10px] text-mutedEarth mt-1.5 font-medium">
            <span>Target Ideal Range:</span>
            <span className="text-wood font-semibold">{ideal}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function NotificationItem({ notification, onMarkRead, onClick }) {
  if (!notification) return null;

  return (
    <div 
      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
        notification.isRead 
          ? 'bg-white border-borderEarth/60 opacity-80 hover:opacity-100' 
          : 'bg-agriGreen-bg/30 border-agriGreen/40 shadow-sm'
      }`}
      onClick={() => onClick && onClick(notification)}
    >
      <div className="flex items-start gap-3.5">
        <div className={`p-2.5 rounded-lg shrink-0 ${
          notification.badgeType === 'alertRed' ? 'bg-alertRed-light text-alertRed-dark' :
          notification.badgeType === 'harvestGold' ? 'bg-harvestGold-light text-harvestGold-dark' :
          notification.badgeType === 'weatherBlue' ? 'bg-weatherBlue-light text-weatherBlue-dark' :
          'bg-agriGreen-bg text-agriGreen-dark'
        }`}>
          {notification.category === 'Disease' ? '⚠️' :
           notification.category === 'Market' ? '📈' :
           notification.category === 'Weather' ? '🌧️' :
           notification.category === 'Soil' ? '🧪' : '🌱'}
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <Badge variant={notification.badgeType || 'agriGreen'}>
              {notification.category}
            </Badge>
            <span className="text-[11px] text-mutedEarth">{notification.timestamp} • {notification.date}</span>
            {!notification.isRead && (
              <span className="inline-block w-2 h-2 rounded-full bg-alertRed"></span>
            )}
          </div>

          <h4 className={`text-sm font-bold text-wood ${!notification.isRead ? 'font-heading' : ''}`}>
            {notification.title}
          </h4>
          <p className="text-xs text-mutedEarth mt-1 leading-relaxed">
            {notification.message}
          </p>
        </div>
      </div>

      <div className="shrink-0 flex flex-col items-end justify-between gap-2">
        {!notification.isRead && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMarkRead(notification.id);
            }}
            className="text-[11px] font-semibold text-agriGreen hover:underline bg-white px-2 py-1 rounded border border-borderEarth"
          >
            Mark read
          </button>
        )}
      </div>
    </div>
  );
}

function Modal({ isOpen, onClose, title, children, maxWidth = "max-w-xl" }) {
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />
      <div className={`relative w-full ${maxWidth} bg-white rounded-2xl border border-borderEarth shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-borderEarth bg-earth/50">
          <h3 className="text-lg font-bold font-heading text-wood">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-earth border border-borderEarth text-wood flex items-center justify-center text-lg font-bold transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

function ChartCard({ title, subtitle, action, children }) {
  return (
    <div className="krishi-card p-5">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-borderEarth">
        <div>
          <h3 className="text-base font-bold font-heading text-wood">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-mutedEarth mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>

      <div className="w-full min-h-[260px]">
        {children}
      </div>
    </div>
  );
}

function Toast({ toast }) {
  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isInfo = toast.type === 'info';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce">
      <div className={`px-4 py-3 rounded-xl border shadow-xl flex items-center gap-3 text-sm font-semibold ${
        isSuccess ? 'bg-agriGreen text-white border-agriGreen-dark' :
        isInfo ? 'bg-weatherBlue text-white border-weatherBlue-dark' :
        'bg-harvestGold text-white border-harvestGold-dark'
      }`}>
        <span className="text-lg">
          {isSuccess ? '✅' : isInfo ? 'ℹ️' : '⚠️'}
        </span>
        <span>{toast.message}</span>
      </div>
    </div>
  );
}

function EmptyState({ title = "No Results Found", message = "Try adjusting your search query or filters.", icon = "🌾", actionLabel, onAction }) {
  return (
    <div className="krishi-card p-10 text-center flex flex-col items-center justify-center my-6">
      <div className="text-4xl mb-3 p-4 rounded-full bg-earth border border-borderEarth">
        {icon}
      </div>
      <h3 className="text-lg font-bold font-heading text-wood mb-1">
        {title}
      </h3>
      <p className="text-xs text-mutedEarth max-w-sm mb-4">
        {message}
      </p>

      {actionLabel && onAction && (
        <button onClick={onAction} className="btn-secondary text-xs">
          {actionLabel}
        </button>
      )}
    </div>
  );
}

function FarmSwitcher({ compact = false }) {
  const { farms, activeFarm, activeFarmId, switchActiveFarm, navigateTo } = useApp();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all text-left ${
          compact 
            ? 'bg-earth text-wood border-borderEarth text-xs hover:border-agriGreen' 
            : 'bg-white text-wood border-borderEarth hover:border-agriGreen shadow-sm text-sm'
        }`}
      >
        <span className="p-1 rounded bg-agriGreen-bg text-agriGreen font-bold text-xs">
          🌾
        </span>
        <div className="leading-tight truncate">
          <div className="font-bold text-wood truncate flex items-center gap-1.5">
            <span>{activeFarm?.name || 'Select Farm'}</span>
            <span className="text-[10px] text-mutedEarth font-normal">({activeFarm?.acres} Acres)</span>
          </div>
          <div className="text-[10px] text-mutedEarth truncate">
            {activeFarm?.soilType} • {activeFarm?.village}
          </div>
        </div>
        <span className="ml-1 text-xs text-mutedEarth font-bold">▼</span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl border border-borderEarth shadow-xl z-50 p-2 space-y-1">
            <div className="px-3 py-1.5 border-b border-borderEarth text-[11px] font-bold uppercase tracking-wider text-mutedEarth">
              Select Active Farm
            </div>

            <div className="max-h-60 overflow-y-auto space-y-1">
              {farms.map((farm) => {
                const isSelected = farm.id === activeFarmId;
                return (
                  <div
                    key={farm.id}
                    onClick={() => {
                      switchActiveFarm(farm.id);
                      setIsOpen(false);
                    }}
                    className={`p-2.5 rounded-lg cursor-pointer transition-colors flex items-center justify-between ${
                      isSelected 
                        ? 'bg-agriGreen-bg border border-agriGreen/40' 
                        : 'hover:bg-earth border border-transparent'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-wood flex items-center gap-1.5">
                        <span>{farm.name}</span>
                        {isSelected && (
                          <span className="text-[10px] bg-agriGreen text-white px-1.5 py-0.2 rounded">Active</span>
                        )}
                      </div>
                      <div className="text-[11px] text-mutedEarth mt-0.5">
                        {farm.acres} Acres • {farm.soilType}
                      </div>
                      <div className="text-[10px] text-mutedEarth">
                        📍 {farm.location}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 border-t border-borderEarth text-center">
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigateTo('/farms');
                }}
                className="w-full text-xs font-semibold text-agriGreen hover:underline py-1.5 text-center flex items-center justify-center gap-1"
              >
                <span>+ Manage / Add New Farm</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function TopBar({ onOpenMobileNav }) {
  const { user, unreadNotificationCount, navigateTo, currentRoute } = useApp();
  const [backendStatus, setBackendStatus] = React.useState({ isOnline: false, checking: true });

  React.useEffect(() => {
    let isMounted = true;
    const checkServer = async () => {
      const res = await AgriApiClient.checkHealth();
      if (isMounted) {
        setBackendStatus({ isOnline: res.isOnline, checking: false });
      }
    };
    checkServer();
    const interval = setInterval(checkServer, 8000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <header className="bg-white border-b border-borderEarth sticky top-0 z-30 shadow-xs">
      <div className="bg-gradient-to-r from-agriGreen to-agriGreen-dark text-white px-4 py-1.5 text-center text-xs font-semibold tracking-wide flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="bg-harvestGold text-white text-[10px] uppercase font-bold px-1.5 py-0.5 rounded">SIH 2026</span>
          <span className="truncate hidden sm:inline">
            KrishiMitra-AI Decision Support System
          </span>
        </div>

        <div className="flex items-center gap-2">
          {backendStatus.isOnline ? (
            <span className="bg-white/20 text-white px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1.5 border border-white/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>🟢 Live ML Server Connected (Port 5000)</span>
            </span>
          ) : (
            <span className="bg-harvestGold text-white px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1.5 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-white"></span>
              <span>🟡 Heuristic Edge Mode</span>
            </span>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileNav}
            className="lg:hidden p-2 rounded-lg text-wood hover:bg-earth border border-borderEarth"
          >
            <span className="text-xl">☰</span>
          </button>

          <div>
            <h1 className="text-base sm:text-lg font-bold font-heading text-wood leading-tight">
              Namaste, {user.name} 👋
            </h1>
            <p className="text-[11px] text-mutedEarth hidden sm:block">
              {user.village}, {user.district} ({user.state})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <FarmSwitcher compact />

          <button
            onClick={() => navigateTo('/notifications')}
            className={`relative p-2 rounded-lg border transition-all ${
              currentRoute === '/notifications' 
                ? 'bg-agriGreen-bg text-agriGreen border-agriGreen' 
                : 'bg-white text-wood border-borderEarth hover:bg-earth'
            }`}
            title="Notifications"
          >
            <span className="text-lg">🔔</span>
            {unreadNotificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-alertRed text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                {unreadNotificationCount}
              </span>
            )}
          </button>

          <button
            onClick={() => navigateTo('/profile')}
            className="flex items-center gap-2 p-1 pl-2 rounded-lg border border-borderEarth hover:border-agriGreen transition-all bg-earth/50"
            title="Farmer Profile"
          >
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-7 h-7 rounded-full object-cover border border-agriGreen"
            />
            <span className="text-xs font-bold text-wood hidden md:inline truncate max-w-[100px]">
              Profile
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

function Sidebar() {
  const { currentRoute, navigateTo, logoutUser, unreadNotificationCount, activeFarm } = useApp();

  const navItems = [
    { label: 'Dashboard', route: '/', icon: '📊' },
    { label: 'My Farms', route: '/farms', icon: '🌾' },
    { label: 'Crop Advisor', route: '/crops', icon: '🌱' },
    { label: 'Soil Health', route: '/soil', icon: '🧪' },
    { label: 'Weather Insights', route: '/weather', icon: '🌧️' },
    { label: 'Market Prices', route: '/market', icon: '📈' },
    { label: 'Market Recommendation', route: '/recommendation', icon: '⚖️' },
    { label: 'Disease Detection', route: '/disease', icon: '🔍' },
    { label: 'Notifications', route: '/notifications', icon: '🔔', badge: unreadNotificationCount },
    { label: 'Farmer Profile', route: '/profile', icon: '👤' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-borderEarth flex flex-col justify-between shrink-0 h-screen sticky top-0">
      <div>
        <div 
          onClick={() => navigateTo('/')}
          className="p-5 border-b border-borderEarth cursor-pointer flex items-center gap-3 bg-earth/40"
        >
          <div className="w-10 h-10 rounded-xl bg-agriGreen text-white flex items-center justify-center font-bold text-xl shadow-xs">
            🚜
          </div>
          <div>
            <h2 className="text-lg font-extrabold font-heading text-wood leading-none">
              KrishiMitra<span className="text-harvestGold">-AI</span>
            </h2>
            <span className="text-[10px] font-bold tracking-wider text-agriGreen uppercase">
              SIH Agriculture Portal
            </span>
          </div>
        </div>

        {activeFarm && (
          <div className="mx-4 mt-4 p-3 rounded-xl bg-agriGreen-bg border border-agriGreen/30">
            <span className="text-[10px] uppercase font-bold text-agriGreen-dark tracking-wider block mb-0.5">
              Active Selected Farm
            </span>
            <div className="text-xs font-bold text-wood truncate">
              {activeFarm.name}
            </div>
            <div className="text-[10px] text-mutedEarth truncate">
              {activeFarm.acres} Acres • {activeFarm.soilType}
            </div>
          </div>
        )}

        <nav className="p-3 space-y-1 mt-2">
          {navItems.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <button
                key={item.route}
                onClick={() => navigateTo(item.route)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-agriGreen text-white font-bold shadow-xs'
                    : 'text-wood hover:bg-earth hover:text-agriGreen-dark'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.badge > 0 && (
                  <span className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-alertRed text-white' : 'bg-alertRed-light text-alertRed-dark'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-borderEarth bg-earth/30">
        <button
          onClick={logoutUser}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold text-alertRed hover:bg-alertRed-light rounded-lg transition-colors border border-alertRed/20"
        >
          <span>🚪</span>
          <span>Logout Account</span>
        </button>
      </div>
    </aside>
  );
}

function MobileNav({ isOpen, onClose }) {
  const { currentRoute, navigateTo, logoutUser, unreadNotificationCount } = useApp();

  const mainNavItems = [
    { label: 'Dashboard', route: '/', icon: '📊' },
    { label: 'My Farms', route: '/farms', icon: '🌾' },
    { label: 'Crop Advisor', route: '/crops', icon: '🌱' },
    { label: 'Soil Health', route: '/soil', icon: '🧪' },
    { label: 'Weather', route: '/weather', icon: '🌧️' },
    { label: 'Market Prices', route: '/market', icon: '📈' },
    { label: 'Market Rec.', route: '/recommendation', icon: '⚖️' },
    { label: 'Disease Test', route: '/disease', icon: '🔍' },
    { label: 'Notifications', route: '/notifications', icon: '🔔', badge: unreadNotificationCount },
    { label: 'Profile', route: '/profile', icon: '👤' },
  ];

  const bottomNavItems = [
    { label: 'Home', route: '/', icon: '📊' },
    { label: 'Farms', route: '/farms', icon: '🌾' },
    { label: 'Crops', route: '/crops', icon: '🌱' },
    { label: 'Market', route: '/recommendation', icon: '⚖️' },
    { label: 'Disease', route: '/disease', icon: '🔍' },
  ];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-wood/50 backdrop-blur-xs" onClick={onClose} />
          
          <div className="relative bg-white w-72 max-w-full h-full flex flex-col justify-between z-10 shadow-2xl overflow-y-auto">
            <div>
              <div className="p-4 border-b border-borderEarth flex items-center justify-between bg-earth">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🚜</span>
                  <span className="font-extrabold font-heading text-wood">KrishiMitra-AI</span>
                </div>
                <button onClick={onClose} className="p-1 rounded text-wood font-bold text-lg">✕</button>
              </div>

              <nav className="p-3 space-y-1">
                {mainNavItems.map((item) => {
                  const isActive = currentRoute === item.route;
                  return (
                    <button
                      key={item.route}
                      onClick={() => {
                        navigateTo(item.route);
                        onClose();
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold ${
                        isActive
                          ? 'bg-agriGreen text-white font-bold'
                          : 'text-wood hover:bg-earth'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-base">{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                      {item.badge > 0 && (
                        <span className="bg-alertRed text-white text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="p-4 border-t border-borderEarth">
              <button
                onClick={() => {
                  logoutUser();
                  onClose();
                }}
                className="w-full btn-secondary text-xs text-alertRed border-alertRed/30"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-borderEarth px-2 py-1 flex items-center justify-around shadow-lg">
        {bottomNavItems.map((item) => {
          const isActive = currentRoute === item.route;
          return (
            <button
              key={item.route}
              onClick={() => navigateTo(item.route)}
              className={`flex flex-col items-center py-1 px-2 rounded-lg transition-all ${
                isActive ? 'text-agriGreen font-bold' : 'text-mutedEarth hover:text-wood'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-[10px] font-medium mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}

function Layout({ children }) {
  const { toast } = useApp();
  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex bg-earth text-wood font-body">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0 pb-16 lg:pb-0">
        <TopBar onOpenMobileNav={() => setIsMobileNavOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />

      <Toast toast={toast} />
    </div>
  );
}

// ==========================================
// 4. PAGES
// ==========================================

function LoginSignup() {
  const { loginUser, signupUser } = useApp();
  const [activeTab, setActiveTab] = React.useState('login');

  const [loginEmail, setLoginEmail] = React.useState('ramesh.patel@krishimitra.in');
  const [loginPassword, setLoginPassword] = React.useState('farmer123');

  const [signupData, setSignupData] = React.useState({
    name: '',
    phone: '',
    email: '',
    state: 'Madhya Pradesh',
    district: 'Indore',
    village: ''
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    loginUser(loginEmail, loginPassword);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!signupData.name || !signupData.phone) {
      alert('Please enter your full name and phone number.');
      return;
    }
    signupUser(signupData);
  };

  return (
    <div className="min-h-screen bg-earth flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md bg-white rounded-2xl border border-borderEarth shadow-xl overflow-hidden">
        <div className="bg-gradient-to-br from-agriGreen to-agriGreen-dark p-6 text-white text-center">
          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-white text-agriGreen font-bold flex items-center justify-center text-3xl shadow-md">
            🚜
          </div>
          <h1 className="text-2xl font-extrabold font-heading tracking-wide">
            KrishiMitra<span className="text-harvestGold">-AI</span>
          </h1>
          <p className="text-xs text-agriGreen-bg/90 mt-1 max-w-xs mx-auto">
            Smart India Hackathon Agriculture Portal for AI-Powered Farming Decisions
          </p>
        </div>

        <div className="flex border-b border-borderEarth bg-earth/40">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-3 text-xs font-bold transition-all ${
              activeTab === 'login'
                ? 'bg-white text-agriGreen-dark border-b-2 border-agriGreen font-heading text-sm'
                : 'text-mutedEarth hover:text-wood'
            }`}
          >
            Farmer Login
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className={`flex-1 py-3 text-xs font-bold transition-all ${
              activeTab === 'signup'
                ? 'bg-white text-agriGreen-dark border-b-2 border-agriGreen font-heading text-sm'
                : 'text-mutedEarth hover:text-wood'
            }`}
          >
            New Farmer Registration
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-mutedEarth mb-1">
                  Email Address or Mobile Number
                </label>
                <input
                  type="text"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="ramesh.patel@krishimitra.in"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-mutedEarth mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full"
                />
              </div>

              <div className="p-3 bg-earth rounded-lg border border-borderEarth text-xs text-mutedEarth">
                <span className="font-bold text-wood block mb-0.5">💡 Demo Login Credentials:</span>
                Email: <code className="text-agriGreen font-bold">ramesh.patel@krishimitra.in</code><br />
                Password: Any password works
              </div>

              <button type="submit" className="w-full btn-primary py-3 text-sm mt-2">
                Log In to KrishiMitra Portal →
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-wood mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={signupData.name}
                  onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                  placeholder="e.g. Ramesh Patel"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-wood mb-1">Phone Number (+91) *</label>
                <input
                  type="tel"
                  required
                  value={signupData.phone}
                  onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-wood mb-1">Email Address</label>
                <input
                  type="email"
                  value={signupData.email}
                  onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                  placeholder="farmer@example.com"
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-wood mb-1">State</label>
                  <select
                    value={signupData.state}
                    onChange={(e) => setSignupData({ ...signupData, state: e.target.value })}
                    className="w-full text-xs"
                  >
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Gujarat">Gujarat</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-wood mb-1">District</label>
                  <input
                    type="text"
                    value={signupData.district}
                    onChange={(e) => setSignupData({ ...signupData, district: e.target.value })}
                    placeholder="Indore"
                    className="w-full text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-wood mb-1">Village / Gram Panchayat</label>
                <input
                  type="text"
                  value={signupData.village}
                  onChange={(e) => setSignupData({ ...signupData, village: e.target.value })}
                  placeholder="Sanwer"
                  className="w-full text-xs"
                />
              </div>

              <button type="submit" className="w-full btn-gold py-3 text-sm mt-3">
                Complete Registration →
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  const { user, farms, activeFarm, activeFarmId, notifications, navigateTo, markNotificationAsRead } = useApp();

  const cropPrediction = aiCropPredictions[activeFarmId] || aiCropPredictions["farm-1"];
  const soilData = soilDataByFarm[activeFarmId] || soilDataByFarm["farm-1"];
  const weatherData = weatherDataByFarm[activeFarmId] || weatherDataByFarm["farm-1"];
  const marketRecommendation = marketRecommendationsByFarm[activeFarmId] || marketRecommendationsByFarm["farm-1"];

  const topMarkets = marketPricesList.slice(0, 3);
  const recentNotifications = notifications.slice(0, 3);

  return (
    <div className="space-y-6">
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

      <PredictionCard
        prediction={cropPrediction}
        onExploreDetails={() => navigateTo('/crops')}
      />

      <DiseaseAlert
        disease={demoDiseaseResult}
        onTreatClick={() => navigateTo('/disease')}
      />

      <RecommendationCard
        recommendation={marketRecommendation}
        onViewFullRecommendation={() => navigateTo('/recommendation')}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
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

function MyFarms() {
  const { farms, activeFarmId, switchActiveFarm, addFarm } = useApp();
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);

  const [newFarmData, setNewFarmData] = React.useState({
    name: '',
    acres: '4.5',
    soilType: 'Black Soil',
    irrigationType: 'Drip Irrigation',
    state: 'Madhya Pradesh',
    district: 'Indore',
    village: '',
    surveyNumber: ''
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newFarmData.name) {
      alert('Please enter a farm name.');
      return;
    }
    addFarm(newFarmData);
    setIsAddModalOpen(false);
    setNewFarmData({
      name: '',
      acres: '4.5',
      soilType: 'Black Soil',
      irrigationType: 'Drip Irrigation',
      state: 'Madhya Pradesh',
      district: 'Indore',
      village: '',
      surveyNumber: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-borderEarth">
        <div>
          <h1 className="text-2xl font-bold font-heading text-wood">
            🌾 My Registered Farms
          </h1>
          <p className="text-xs text-mutedEarth mt-1">
            Manage your land plots, soil profiles, irrigation infrastructure, and active telemetries.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn-primary text-xs"
        >
          ➕ Register & Add New Farm
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {farms.map((farm) => {
          const isActive = farm.id === activeFarmId;
          return (
            <div
              key={farm.id}
              className={`krishi-card p-6 flex flex-col justify-between transition-all ${
                isActive ? 'border-2 border-agriGreen shadow-md bg-white' : 'bg-white'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-lg bg-agriGreen-bg text-agriGreen font-bold text-lg">
                      🏡
                    </span>
                    <div>
                      <h3 className="text-lg font-bold font-heading text-wood">
                        {farm.name}
                      </h3>
                      <p className="text-xs text-mutedEarth">
                        Survey: {farm.surveyNumber || 'SY-102'}
                      </p>
                    </div>
                  </div>

                  {isActive ? (
                    <Badge variant="agriGreen">
                      Active Telemetry
                    </Badge>
                  ) : (
                    <Badge variant="neutral">
                      Inactive
                    </Badge>
                  )}
                </div>

                <div className="space-y-2 bg-earth/60 p-4 rounded-xl border border-borderEarth/60 my-4 text-xs">
                  <div className="flex justify-between">
                    <span className="text-mutedEarth font-medium">Land Area:</span>
                    <strong className="text-wood font-bold">{farm.acres} Acres</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-mutedEarth font-medium">Soil Type:</span>
                    <strong className="text-agriGreen-dark font-bold">{farm.soilType}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-mutedEarth font-medium">Irrigation:</span>
                    <strong className="text-wood font-bold">{farm.irrigationType}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-mutedEarth font-medium">Location:</span>
                    <strong className="text-wood">{farm.location}</strong>
                  </div>
                  {farm.village && (
                    <div className="flex justify-between">
                      <span className="text-mutedEarth font-medium">Village:</span>
                      <strong className="text-wood">{farm.village}</strong>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-borderEarth">
                {isActive ? (
                  <div className="w-full text-center py-2 bg-agriGreen-bg text-agriGreen-dark font-bold text-xs rounded-lg border border-agriGreen/30">
                    ✓ Currently Selected Active Farm
                  </div>
                ) : (
                  <button
                    onClick={() => switchActiveFarm(farm.id)}
                    className="w-full btn-secondary text-xs py-2 hover:border-agriGreen hover:text-agriGreen-dark"
                  >
                    Set as Active Farm →
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Register & Add New Farm Plot"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-wood mb-1">Farm Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Sunrise Organic Farm"
              value={newFarmData.name}
              onChange={(e) => setNewFarmData({ ...newFarmData, name: e.target.value })}
              className="w-full text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-wood mb-1">Area (Acres) *</label>
              <input
                type="number"
                step="0.1"
                required
                value={newFarmData.acres}
                onChange={(e) => setNewFarmData({ ...newFarmData, acres: e.target.value })}
                className="w-full text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-wood mb-1">Soil Type</label>
              <select
                value={newFarmData.soilType}
                onChange={(e) => setNewFarmData({ ...newFarmData, soilType: e.target.value })}
                className="w-full text-xs"
              >
                <option value="Black Soil">Black Soil</option>
                <option value="Alluvial Soil">Alluvial Soil</option>
                <option value="Red Soil">Red Soil</option>
                <option value="Laterite Soil">Laterite Soil</option>
                <option value="Clay Loam">Clay Loam</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-wood mb-1">Irrigation System</label>
              <select
                value={newFarmData.irrigationType}
                onChange={(e) => setNewFarmData({ ...newFarmData, irrigationType: e.target.value })}
                className="w-full text-xs"
              >
                <option value="Drip Irrigation">Drip Irrigation</option>
                <option value="Sprinkler Irrigation">Sprinkler Irrigation</option>
                <option value="Canal Irrigation">Canal Irrigation</option>
                <option value="Borewell & Pump">Borewell & Pump</option>
                <option value="Rainfed">Rainfed</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-wood mb-1">Survey Number</label>
              <input
                type="text"
                placeholder="SY-120/C"
                value={newFarmData.surveyNumber}
                onChange={(e) => setNewFarmData({ ...newFarmData, surveyNumber: e.target.value })}
                className="w-full text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-wood mb-1">District</label>
              <input
                type="text"
                placeholder="Indore"
                value={newFarmData.district}
                onChange={(e) => setNewFarmData({ ...newFarmData, district: e.target.value })}
                className="w-full text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-wood mb-1">Village</label>
              <input
                type="text"
                placeholder="Sanwer"
                value={newFarmData.village}
                onChange={(e) => setNewFarmData({ ...newFarmData, village: e.target.value })}
                className="w-full text-xs"
              />
            </div>
          </div>

          <div className="pt-3 flex justify-end gap-2 border-t border-borderEarth">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="btn-secondary text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary text-xs"
            >
              Save Farm & Set Active →
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

function CropAdvisor() {
  const { activeFarm, activeFarmId } = useApp();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedSeason, setSelectedSeason] = React.useState('All');
  const [selectedSoil, setSelectedSoil] = React.useState('All');
  const [selectedCropDetail, setSelectedCropDetail] = React.useState(null);

  // Live ML Model Interactive State
  const defaultPrediction = aiCropPredictions[activeFarmId] || aiCropPredictions["farm-1"];
  const [livePrediction, setLivePrediction] = React.useState(defaultPrediction);
  const [isPredicting, setIsPredicting] = React.useState(false);
  const [mlParams, setMlParams] = React.useState({
    nitrogen: 45,
    phosphorus: 50,
    potassium: 40,
    ph: 6.8,
    temperature: 21.0,
    humidity: 58,
    rainfall: 140,
    soilType: activeFarm.soilType || 'Black Soil',
    season: 'Rabi'
  });

  const handleRunLivePrediction = async (e) => {
    if (e) e.preventDefault();
    setIsPredicting(true);
    const res = await AgriApiClient.predictCrop(mlParams);
    if (res && res.recommendedCrop) {
      setLivePrediction({
        recommendedCrop: res.recommendedCrop,
        confidence: res.confidence,
        explanation: res.explanation,
        season: mlParams.season,
        expectedYield: res.topRecommendations?.[0]?.expectedYield || '20 - 24 quintals/acre',
        expectedRevenue: res.topRecommendations?.[0]?.estimatedRevenue || '₹45,000 - ₹55,000 / acre',
        alternateCrops: (res.topRecommendations?.slice(1) || []).map(r => ({ name: r.crop, confidence: r.confidence }))
      });
    }
    setIsPredicting(false);
  };

  const filteredCrops = React.useMemo(() => {
    return cropDatabase.filter(crop => {
      const matchesSearch = crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            crop.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            crop.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSeason = selectedSeason === 'All' || crop.season.includes(selectedSeason);
      const matchesSoil = selectedSoil === 'All' || crop.soilType.includes(selectedSoil);

      return matchesSearch && matchesSeason && matchesSoil;
    });
  }, [searchQuery, selectedSeason, selectedSoil]);

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-borderEarth flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold font-heading text-wood">
            🌱 AI Crop Advisor & Crop Directory
          </h1>
          <p className="text-xs text-mutedEarth mt-1">
            Explore AI crop recommendations customized for <strong className="text-wood">{activeFarm.name}</strong> ({activeFarm.soilType}).
          </p>
        </div>

        <span className="bg-agriGreen-bg text-agriGreen-dark px-3 py-1.5 rounded-lg border border-agriGreen/40 text-xs font-bold flex items-center gap-1.5">
          <span>🤖</span>
          <span>Scikit-Learn Random Forest Engine Active</span>
        </span>
      </div>

      {/* TOP AI RECOMMENDATION HIGHLIGHT SPOTLIGHT */}
      <div className="krishi-card p-6 bg-gradient-to-br from-white via-agriGreen-bg/20 to-white border-2 border-agriGreen">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-borderEarth">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-agriGreen text-white font-bold">🎯</span>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-agriGreen-dark">
                Optimal Crop Recommendation
              </h3>
              <p className="text-sm font-semibold text-wood">
                Tailored for {activeFarm.name}
              </p>
            </div>
          </div>
          <Badge variant="agriGreen">
            {livePrediction.confidence}% AI Match
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mt-4">
          <div className="md:col-span-8">
            <h2 className="text-2xl font-extrabold font-heading text-wood mb-2">
              {livePrediction.recommendedCrop}
            </h2>
            <p className="text-xs text-wood leading-relaxed mb-4 bg-white p-3 rounded-lg border border-borderEarth">
              {livePrediction.explanation}
            </p>

            <div className="flex flex-wrap gap-4 text-xs font-semibold">
              <span className="bg-earth px-3 py-1.5 rounded-md border border-borderEarth">
                Season: <strong className="text-wood">{livePrediction.season}</strong>
              </span>
              <span className="bg-earth px-3 py-1.5 rounded-md border border-borderEarth">
                Yield Target: <strong className="text-agriGreen-dark">{livePrediction.expectedYield}</strong>
              </span>
              <span className="bg-earth px-3 py-1.5 rounded-md border border-borderEarth">
                Revenue Est.: <strong className="text-agriGreen-dark">{livePrediction.expectedRevenue}</strong>
              </span>
            </div>
          </div>

          <div className="md:col-span-4 bg-white p-4 rounded-xl border border-borderEarth space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-mutedEarth">
              Alternative High-Yield Options:
            </h4>
            {(livePrediction.alternateCrops || []).map((alt, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs p-2 bg-earth/60 rounded border border-borderEarth/60">
                <span className="font-semibold text-wood">{alt.name}</span>
                <span className="text-[11px] font-bold text-agriGreen-dark">{alt.confidence}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* REAL-TIME ML PARAMETER TUNING SIMULATOR */}
      <div className="krishi-card p-6 bg-gradient-to-r from-earth/50 to-white border border-borderEarth">
        <div className="flex items-center justify-between pb-3 border-b border-borderEarth mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎛️</span>
            <div>
              <h3 className="text-sm font-bold font-heading text-wood">
                Interactive Soil & Climate ML Simulator
              </h3>
              <p className="text-[11px] text-mutedEarth">
                Adjust agro-climatic factors to test live model predictions in real time.
              </p>
            </div>
          </div>
          <button
            onClick={handleRunLivePrediction}
            disabled={isPredicting}
            className="btn-primary text-xs flex items-center gap-1.5"
          >
            <span>{isPredicting ? '⏳ Predicting...' : '⚡ Run Real-Time ML Prediction'}</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-xs">
          <div className="bg-white p-3 rounded-lg border border-borderEarth">
            <label className="block text-[11px] font-bold text-mutedEarth mb-1">Nitrogen (N)</label>
            <input
              type="number"
              value={mlParams.nitrogen}
              onChange={(e) => setMlParams({ ...mlParams, nitrogen: Number(e.target.value) })}
              className="w-full text-xs font-bold"
            />
            <span className="text-[10px] text-mutedEarth block mt-0.5">kg/ha</span>
          </div>

          <div className="bg-white p-3 rounded-lg border border-borderEarth">
            <label className="block text-[11px] font-bold text-mutedEarth mb-1">Phosphorus (P)</label>
            <input
              type="number"
              value={mlParams.phosphorus}
              onChange={(e) => setMlParams({ ...mlParams, phosphorus: Number(e.target.value) })}
              className="w-full text-xs font-bold"
            />
            <span className="text-[10px] text-mutedEarth block mt-0.5">kg/ha</span>
          </div>

          <div className="bg-white p-3 rounded-lg border border-borderEarth">
            <label className="block text-[11px] font-bold text-mutedEarth mb-1">Potassium (K)</label>
            <input
              type="number"
              value={mlParams.potassium}
              onChange={(e) => setMlParams({ ...mlParams, potassium: Number(e.target.value) })}
              className="w-full text-xs font-bold"
            />
            <span className="text-[10px] text-mutedEarth block mt-0.5">kg/ha</span>
          </div>

          <div className="bg-white p-3 rounded-lg border border-borderEarth">
            <label className="block text-[11px] font-bold text-mutedEarth mb-1">Soil pH</label>
            <input
              type="number"
              step="0.1"
              value={mlParams.ph}
              onChange={(e) => setMlParams({ ...mlParams, ph: Number(e.target.value) })}
              className="w-full text-xs font-bold"
            />
            <span className="text-[10px] text-mutedEarth block mt-0.5">pH Level</span>
          </div>

          <div className="bg-white p-3 rounded-lg border border-borderEarth">
            <label className="block text-[11px] font-bold text-mutedEarth mb-1">Temp (°C)</label>
            <input
              type="number"
              step="0.5"
              value={mlParams.temperature}
              onChange={(e) => setMlParams({ ...mlParams, temperature: Number(e.target.value) })}
              className="w-full text-xs font-bold"
            />
            <span className="text-[10px] text-mutedEarth block mt-0.5">Air Temp</span>
          </div>

          <div className="bg-white p-3 rounded-lg border border-borderEarth">
            <label className="block text-[11px] font-bold text-mutedEarth mb-1">Humidity (%)</label>
            <input
              type="number"
              value={mlParams.humidity}
              onChange={(e) => setMlParams({ ...mlParams, humidity: Number(e.target.value) })}
              className="w-full text-xs font-bold"
            />
            <span className="text-[10px] text-mutedEarth block mt-0.5">Relative</span>
          </div>

          <div className="bg-white p-3 rounded-lg border border-borderEarth">
            <label className="block text-[11px] font-bold text-mutedEarth mb-1">Rainfall (mm)</label>
            <input
              type="number"
              value={mlParams.rainfall}
              onChange={(e) => setMlParams({ ...mlParams, rainfall: Number(e.target.value) })}
              className="w-full text-xs font-bold"
            />
            <span className="text-[10px] text-mutedEarth block mt-0.5">Season mm</span>
          </div>
        </div>
      </div>

      <div className="krishi-card p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search crops by name, category, or tips..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <select
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(e.target.value)}
            className="text-xs"
          >
            <option value="All">All Seasons</option>
            <option value="Rabi">Rabi Season</option>
            <option value="Kharif">Kharif Season</option>
          </select>

          <select
            value={selectedSoil}
            onChange={(e) => setSelectedSoil(e.target.value)}
            className="text-xs"
          >
            <option value="All">All Soil Types</option>
            <option value="Black">Black Soil</option>
            <option value="Alluvial">Alluvial Soil</option>
            <option value="Loam">Loam</option>
          </select>
        </div>
      </div>

      {filteredCrops.length === 0 ? (
        <EmptyState
          title="No Crops Match Your Filter"
          message="Try resetting search keywords or selecting 'All Seasons'."
          onAction={() => {
            setSearchQuery('');
            setSelectedSeason('All');
            setSelectedSoil('All');
          }}
          actionLabel="Reset Search Filters"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCrops.map(crop => (
            <div
              key={crop.id}
              className="krishi-card overflow-hidden hover:border-agriGreen flex flex-col justify-between"
            >
              <div>
                <div className="h-40 overflow-hidden relative">
                  <img
                    src={crop.image}
                    alt={crop.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="agriGreen">{crop.season}</Badge>
                  </div>
                </div>

                <div className="p-5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-agriGreen-dark">
                    {crop.category}
                  </span>
                  <h3 className="text-lg font-bold font-heading text-wood mb-2">
                    {crop.name}
                  </h3>
                  <p className="text-xs text-mutedEarth line-clamp-2 mb-4">
                    {crop.description}
                  </p>

                  <div className="space-y-1.5 text-xs bg-earth/60 p-3 rounded-lg border border-borderEarth/60">
                    <div className="flex justify-between">
                      <span className="text-mutedEarth font-medium">Ideal Soil:</span>
                      <span className="text-wood font-semibold truncate max-w-[150px]">{crop.soilType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-mutedEarth font-medium">Water Need:</span>
                      <span className="text-weatherBlue-dark font-semibold">{crop.waterRequirement}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-mutedEarth font-medium">Yield Est.:</span>
                      <span className="text-agriGreen-dark font-bold">{crop.expectedYield}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2">
                <button
                  onClick={() => setSelectedCropDetail(crop)}
                  className="w-full btn-secondary text-xs py-2 hover:border-agriGreen hover:text-agriGreen-dark"
                >
                  View Full Crop Guide & Tips →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={!!selectedCropDetail}
        onClose={() => setSelectedCropDetail(null)}
        title={selectedCropDetail?.name || 'Crop Specification'}
      >
        {selectedCropDetail && (
          <div className="space-y-4">
            <div className="h-48 rounded-xl overflow-hidden relative">
              <img
                src={selectedCropDetail.image}
                alt={selectedCropDetail.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <span className="text-xs font-bold uppercase text-agriGreen-dark tracking-wider">
                {selectedCropDetail.category} • {selectedCropDetail.season}
              </span>
              <p className="text-xs text-wood leading-relaxed mt-1">
                {selectedCropDetail.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-earth p-4 rounded-xl border border-borderEarth text-xs">
              <div>
                <span className="text-mutedEarth block font-medium">Ideal Soil Type</span>
                <strong className="text-wood">{selectedCropDetail.soilType}</strong>
              </div>
              <div>
                <span className="text-mutedEarth block font-medium">Water Requirement</span>
                <strong className="text-weatherBlue-dark">{selectedCropDetail.waterRequirement}</strong>
              </div>
              <div>
                <span className="text-mutedEarth block font-medium">Temperature Range</span>
                <strong className="text-wood">{selectedCropDetail.temperature}</strong>
              </div>
              <div>
                <span className="text-mutedEarth block font-medium">Ideal Soil pH</span>
                <strong className="text-wood">{selectedCropDetail.idealPh}</strong>
              </div>
              <div>
                <span className="text-mutedEarth block font-medium">Growth Duration</span>
                <strong className="text-wood">{selectedCropDetail.growthDuration}</strong>
              </div>
              <div>
                <span className="text-mutedEarth block font-medium">Expected Yield</span>
                <strong className="text-agriGreen-dark font-bold">{selectedCropDetail.expectedYield}</strong>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-wood mb-2">
                🌾 Step-by-Step Farming Tips & Best Practices:
              </h4>
              <ul className="space-y-2 text-xs text-wood">
                {selectedCropDetail.farmingTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-agriGreen-bg/40 p-2.5 rounded-lg border border-agriGreen/20">
                    <span className="text-agriGreen font-bold">1.{idx + 1}</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

function SoilHealth() {
  const { activeFarm, activeFarmId } = useApp();
  const soilData = soilDataByFarm[activeFarmId] || soilDataByFarm["farm-1"];
  const [liveFertilizerPlan, setLiveFertilizerPlan] = React.useState(null);
  const [isCalculating, setIsCalculating] = React.useState(false);

  const calculateCustomSoilPlan = async () => {
    setIsCalculating(true);
    const res = await AgriApiClient.analyzeSoil({
      n: soilData.metrics.nitrogen.val,
      p: soilData.metrics.phosphorus.val,
      k: soilData.metrics.potassium.val,
      ph: soilData.metrics.ph.val
    });
    if (res && res.fertilizerPlan) {
      setLiveFertilizerPlan(res);
    }
    setIsCalculating(false);
  };

  const { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } = window.Recharts || {};

  return (
    <div className="space-y-6">
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
            Health Score: {liveFertilizerPlan ? liveFertilizerPlan.soilQualityIndex : soilData.healthScore} / 100
          </span>
          <button
            onClick={calculateCustomSoilPlan}
            disabled={isCalculating}
            className="btn-primary text-xs"
          >
            {isCalculating ? '⏳ Analyzing...' : '⚡ Run AI Fertilizer Plan'}
          </button>
        </div>
      </div>

      <div className="krishi-card p-5 bg-gradient-to-r from-white via-agriGreen-bg/30 to-white border-l-4 border-l-agriGreen">
        <h3 className="text-xs font-bold uppercase tracking-wider text-agriGreen-dark mb-1">
          Farmer Soil Health Summary:
        </h3>
        <p className="text-sm font-semibold text-wood leading-relaxed">
          "{soilData.summaryText}"
        </p>
      </div>

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

function WeatherPage() {
  const { activeFarm, activeFarmId } = useApp();
  const weather = weatherDataByFarm[activeFarmId] || weatherDataByFarm["farm-1"];

  const { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } = window.Recharts || {};

  return (
    <div className="space-y-6">
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

function MarketPrices() {
  const [searchCrop, setSearchCrop] = React.useState('');
  const [selectedState, setSelectedState] = React.useState('All States');
  const [selectedDistrict, setSelectedDistrict] = React.useState('All Districts');
  const [selectedMarketForTrend, setSelectedMarketForTrend] = React.useState(marketPricesList[0]);

  const { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } = window.Recharts || {};

  const filteredMarkets = React.useMemo(() => {
    return marketPricesList.filter(mkt => {
      const matchesSearch = mkt.crop.toLowerCase().includes(searchCrop.toLowerCase()) ||
                            mkt.mandi.toLowerCase().includes(searchCrop.toLowerCase());
      const matchesState = selectedState === 'All States' || mkt.state === selectedState;
      const matchesDistrict = selectedDistrict === 'All Districts' || mkt.district === selectedDistrict;

      return matchesSearch && matchesState && matchesDistrict;
    });
  }, [searchCrop, selectedState, selectedDistrict]);

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-borderEarth">
        <h1 className="text-2xl font-bold font-heading text-wood">
          📈 Live Mandi Market Prices
        </h1>
        <p className="text-xs text-mutedEarth mt-1">
          Track real-time crop rates, minimum/modal/maximum price ranges across regional mandis in Indian Rupees (₹).
        </p>
      </div>

      <div className="krishi-card p-4 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search crop name or Mandi location..."
            value={searchCrop}
            onChange={(e) => setSearchCrop(e.target.value)}
            className="w-full text-xs"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="text-xs"
          >
            {mandiStateOptions.map(st => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>

          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="text-xs"
          >
            {mandiDistrictOptions.map(dt => (
              <option key={dt} value={dt}>{dt}</option>
            ))}
          </select>
        </div>
      </div>

      {selectedMarketForTrend && (
        <ChartCard
          title={`7-Day Mandi Price Trend: ${selectedMarketForTrend.crop}`}
          subtitle={`Location: ${selectedMarketForTrend.mandi} (${selectedMarketForTrend.state}) • Modal Price: ₹${selectedMarketForTrend.modalPrice}/quintal`}
        >
          {ResponsiveContainer ? (
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={selectedMarketForTrend.trend7Days} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2DAC8" />
                <XAxis dataKey="day" stroke="#6E655F" tick={{ fontSize: 11 }} />
                <YAxis stroke="#6E655F" tick={{ fontSize: 11 }} domain={['dataMin - 100', 'dataMax + 100']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2DAC8', borderRadius: '8px', fontSize: '12px' }}
                  formatter={(value) => [`₹ ${value.toLocaleString('en-IN')}`, 'Modal Price/q']}
                />
                <Line type="monotone" dataKey="price" stroke="#55703B" strokeWidth={3} dot={{ r: 5, fill: "#C9942F" }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="p-8 text-center text-xs text-mutedEarth">Chart loading...</div>
          )}
        </ChartCard>
      )}

      {filteredMarkets.length === 0 ? (
        <EmptyState
          title="No Mandi Market Prices Match"
          message="Try selecting 'All States' or clearing your search term."
          onAction={() => {
            setSearchCrop('');
            setSelectedState('All States');
            setSelectedDistrict('All Districts');
          }}
          actionLabel="Reset Search Filters"
        />
      ) : (
        <div>
          <h3 className="text-lg font-bold font-heading text-wood mb-3">
            Mandi Price Cards (Click any to view 7-Day Graph)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMarkets.map(mkt => (
              <MarketCard
                key={mkt.id}
                market={mkt}
                onSelect={(m) => setSelectedMarketForTrend(m)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MarketRecommendation() {
  const { activeFarm, activeFarmId } = useApp();
  const rec = marketRecommendationsByFarm[activeFarmId] || marketRecommendationsByFarm["farm-1"];

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-borderEarth">
        <h1 className="text-2xl font-bold font-heading text-wood">
          ⚖️ AI Market Recommendation & Net Profit Maximizer
        </h1>
        <p className="text-xs text-mutedEarth mt-1">
          Automated net profit calculator factoring expected mandi prices, transit distances, labor fees, and regional demand for <strong className="text-wood">{activeFarm.name}</strong>.
        </p>
      </div>

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

function DiseaseDetection() {
  const [analyzing, setAnalyzing] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [result, setResult] = React.useState(demoDiseaseResult);
  const [imageStats, setImageStats] = React.useState(null);

  const handleFileUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Data = e.target.result;
      setSelectedImage(base64Data);
      triggerAnalysis(base64Data);
    };
    reader.readAsDataURL(file);
  };

  const triggerAnalysis = async (imgPayload) => {
    setAnalyzing(true);
    const targetPayload = imgPayload || selectedImage;
    
    // Call live ML backend
    const apiRes = await AgriApiClient.detectDisease(targetPayload);

    if (apiRes && apiRes.disease) {
      setResult({
        diseaseName: apiRes.disease,
        confidence: apiRes.confidence || 93,
        severity: apiRes.severity || 'MODERATE SEVERITY',
        affectedCrop: apiRes.crop || 'Diagnosed Crop Leaf',
        detectedOn: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        symptoms: apiRes.symptoms || demoDiseaseResult.symptoms,
        treatments: {
          chemical: apiRes.chemicalRemedies || demoDiseaseResult.treatments.chemical,
          organic: apiRes.organicRemedies || demoDiseaseResult.treatments.organic,
          preventiveSteps: apiRes.preventativeMeasures || demoDiseaseResult.treatments.preventiveSteps
        }
      });
      if (apiRes.imageStats) {
        setImageStats(apiRes.imageStats);
      }
    } else {
      setResult(demoDiseaseResult);
    }
    setAnalyzing(false);
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-borderEarth flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold font-heading text-wood flex items-center gap-2">
            <span>🔍 Leaf Disease Diagnostics</span>
          </h1>
          <p className="text-xs text-mutedEarth mt-1">
            Upload leaf photographs to diagnose crop infections using computer vision AI models.
          </p>
        </div>

        <div className="bg-agriGreen-bg text-agriGreen-dark px-3 py-1.5 rounded-lg border border-agriGreen/40 text-xs font-bold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-agriGreen animate-pulse"></span>
          <span>CV Computer Vision Classifier Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 krishi-card p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold font-heading text-wood mb-3">
              Upload Leaf Sample
            </h3>

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  handleFileUpload(e.dataTransfer.files[0]);
                }
              }}
              className="border-2 border-dashed border-borderEarth hover:border-agriGreen rounded-2xl p-6 text-center cursor-pointer transition-all bg-earth/40 hover:bg-earth/80 flex flex-col items-center justify-center min-h-[220px]"
            >
              {selectedImage ? (
                <div className="space-y-2">
                  <img
                    src={selectedImage}
                    alt="Uploaded Leaf Sample"
                    className="w-36 h-36 object-cover rounded-xl mx-auto border-2 border-agriGreen shadow-xs"
                  />
                  <p className="text-xs font-bold text-agriGreen-dark">Sample Loaded & Classified</p>
                </div>
              ) : (
                <>
                  <div className="w-14 h-14 rounded-full bg-earth border border-borderEarth flex items-center justify-center text-2xl mb-3 text-agriGreen">
                    📷
                  </div>
                  <h4 className="text-sm font-bold text-wood">
                    Drag & Drop leaf photo here
                  </h4>
                  <p className="text-xs text-mutedEarth mt-1">
                    or click to browse image from your device
                  </p>
                  <label className="mt-4 btn-secondary text-xs cursor-pointer">
                    Browse File
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
                    />
                  </label>
                </>
              )}
            </div>

            {imageStats && (
              <div className="mt-4 p-3 bg-earth rounded-xl border border-borderEarth text-xs space-y-1">
                <span className="font-bold text-wood block text-[11px] uppercase tracking-wider">🔬 Computer Vision Telemetry:</span>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-mutedEarth pt-1">
                  <span>Dimensions: <strong className="text-wood">{imageStats.dimensions}</strong></span>
                  <span>Green Ratio: <strong className="text-agriGreen-dark">{imageStats.greenRatio}%</strong></span>
                  <span>Necrotic Score: <strong className="text-alertRed-dark">{imageStats.necroticIndex}</strong></span>
                  <span>Chlorophyll: <strong className="text-wood">{imageStats.chlorophyllIntegrity}</strong></span>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-borderEarth space-y-2">
            <button
              onClick={() => {
                const sampleImg = "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=400";
                setSelectedImage(sampleImg);
                triggerAnalysis(sampleImg);
              }}
              className="w-full btn-primary text-xs py-2.5"
            >
              🧪 Load Sample Leaf Photo & Run AI Diagnostics →
            </button>
          </div>
        </div>

        <div className="lg:col-span-7 krishi-card p-6">
          {analyzing ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-12 h-12 border-4 border-agriGreen border-t-transparent rounded-full animate-spin mx-auto"></div>
              <h3 className="text-base font-bold font-heading text-wood">
                Running Neural Vision Classification...
              </h3>
              <p className="text-xs text-mutedEarth">
                Extracting leaf lesion contours and matching against ICAR plant pathology datasets.
              </p>
            </div>
          ) : result ? (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-borderEarth">
                <div>
                  <Badge variant={result.severity?.includes('HIGH') || result.severity?.includes('Stage 3') ? 'alertRed' : 'harvestGold'}>
                    {result.severity}
                  </Badge>
                  <h2 className="text-2xl font-extrabold font-heading text-wood mt-1">
                    {result.diseaseName}
                  </h2>
                  <p className="text-xs text-mutedEarth">
                    Crop: {result.affectedCrop} • Analyzed on {result.detectedOn}
                  </p>
                </div>
                <ConfidenceGauge score={result.confidence} size={130} label="Match Score" />
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-mutedEarth mb-2">
                  Observed Symptoms:
                </h4>
                <ul className="space-y-1 text-xs text-wood">
                  {result.symptoms.map((symptom, idx) => (
                    <li key={idx} className="flex items-center gap-2 bg-earth p-2 rounded border border-borderEarth">
                      <span className="text-alertRed font-bold">•</span>
                      <span>{symptom}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-alertRed-light/30 p-4 rounded-xl border border-alertRed/30 space-y-2">
                  <h4 className="text-xs font-bold uppercase text-alertRed-dark flex items-center gap-1.5">
                    <span>🧪</span>
                    <span>Chemical Treatment</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-wood">
                    {result.treatments.chemical.map((item, idx) => (
                      <li key={idx} className="leading-snug">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-agriGreen-bg p-4 rounded-xl border border-agriGreen/30 space-y-2">
                  <h4 className="text-xs font-bold uppercase text-agriGreen-dark flex items-center gap-1.5">
                    <span>🌿</span>
                    <span>Organic & Bio Treatment</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-wood">
                    {result.treatments.organic.map((item, idx) => (
                      <li key={idx} className="leading-snug">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-earth p-4 rounded-xl border border-borderEarth">
                <h4 className="text-xs font-bold uppercase tracking-wider text-mutedEarth mb-2">
                  🛡️ Long-Term Preventive Guidelines:
                </h4>
                <ul className="space-y-1 text-xs text-wood">
                  {result.treatments.preventiveSteps.map((step, idx) => (
                    <li key={idx}>✓ {step}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-xs text-mutedEarth">
              Upload a leaf photo to trigger AI analysis.
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold font-heading text-wood mb-3">
          📋 Diagnostic History Log
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {diseaseHistoryLog.map((log) => (
            <div key={log.id} className="krishi-card p-4 flex items-center gap-3">
              <img
                src={log.image}
                alt={log.disease}
                className="w-14 h-14 rounded-lg object-cover border border-borderEarth shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-wood truncate">{log.disease}</span>
                  <Badge variant={log.severity === 'HIGH' ? 'alertRed' : 'harvestGold'}>
                    {log.severity}
                  </Badge>
                </div>
                <p className="text-[11px] text-mutedEarth mt-0.5 truncate">
                  {log.crop} • {log.farm}
                </p>
                <span className="text-[10px] text-agriGreen-dark font-semibold block mt-1">
                  Status: {log.status} ({log.date})
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NotificationsPage() {
  const { notifications, unreadNotificationCount, markNotificationAsRead, markAllNotificationsAsRead, navigateTo } = useApp();
  const [activeCategory, setActiveCategory] = React.useState('All');

  const categories = ['All', 'Unread', 'Disease', 'Market', 'Weather', 'Soil', 'Crop'];

  const filteredNotifications = React.useMemo(() => {
    if (activeCategory === 'All') return notifications;
    if (activeCategory === 'Unread') return notifications.filter(n => !n.isRead);
    return notifications.filter(n => n.category === activeCategory);
  }, [notifications, activeCategory]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-borderEarth">
        <div>
          <h1 className="text-2xl font-bold font-heading text-wood flex items-center gap-2">
            <span>🔔 Notifications & Alerts Inbox</span>
          </h1>
          <p className="text-xs text-mutedEarth mt-1">
            Stay informed on sudden weather shifts, mandi price spikes, disease alerts, and soil health status.
          </p>
        </div>

        {unreadNotificationCount > 0 && (
          <button
            onClick={markAllNotificationsAsRead}
            className="btn-secondary text-xs"
          >
            ✓ Mark All ({unreadNotificationCount}) as Read
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 p-1.5 bg-earth rounded-xl border border-borderEarth">
        {categories.map(cat => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isActive 
                  ? 'bg-agriGreen text-white font-bold shadow-xs' 
                  : 'text-wood hover:bg-white hover:text-agriGreen-dark'
              }`}
            >
              {cat}
              {cat === 'Unread' && unreadNotificationCount > 0 && (
                <span className="ml-1.5 bg-alertRed text-white text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">
                  {unreadNotificationCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {filteredNotifications.length === 0 ? (
        <EmptyState
          title="No Notifications in this Category"
          message="You're all caught up! No active alerts match this filter."
          icon="🔔"
          onAction={() => setActiveCategory('All')}
          actionLabel="Show All Notifications"
        />
      ) : (
        <div className="space-y-3">
          {filteredNotifications.map(notif => (
            <NotificationItem
              key={notif.id}
              notification={notif}
              onMarkRead={markNotificationAsRead}
              onClick={() => navigateTo(notif.targetRoute || '/')}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ProfilePage() {
  const { user, updateProfile, farms } = useApp();
  const [isEditing, setIsEditing] = React.useState(false);

  const [formData, setFormData] = React.useState({
    name: user.name || '',
    phone: user.phone || '',
    email: user.email || '',
    state: user.state || 'Madhya Pradesh',
    district: user.district || 'Indore',
    village: user.village || 'Sanwer'
  });

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || '',
      phone: user.phone || '',
      email: user.email || '',
      state: user.state || 'Madhya Pradesh',
      district: user.district || 'Indore',
      village: user.village || 'Sanwer'
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-borderEarth">
        <div>
          <h1 className="text-2xl font-bold font-heading text-wood">
            👤 Farmer Account Profile
          </h1>
          <p className="text-xs text-mutedEarth mt-1">
            Personal details, contact info, and regional telemetry assignments.
          </p>
        </div>

        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="btn-primary text-xs"
          >
            ✏️ Edit Profile Info
          </button>
        )}
      </div>

      <div className="krishi-card p-6 bg-gradient-to-r from-agriGreen-bg/40 via-white to-earth/60 flex flex-col sm:flex-row items-center gap-6">
        <img
          src={user.avatarUrl}
          alt={user.name}
          className="w-24 h-24 rounded-2xl object-cover border-4 border-agriGreen shadow-md shrink-0"
        />

        <div className="text-center sm:text-left space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-agriGreen-dark bg-agriGreen-bg px-2.5 py-0.5 rounded border border-agriGreen/30">
            Registered KrishiMitra Farmer
          </span>
          <h2 className="text-2xl font-extrabold font-heading text-wood">
            {user.name}
          </h2>
          <p className="text-xs text-mutedEarth">
            📍 {user.village}, {user.district}, {user.state}
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-wood">
            <span>📞 {user.phone}</span>
            <span>✉️ {user.email}</span>
            <span>🌾 {farms.length} Registered Farms</span>
          </div>
        </div>
      </div>

      <div className="krishi-card p-6">
        <h3 className="text-base font-bold font-heading text-wood mb-4 pb-2 border-b border-borderEarth">
          {isEditing ? 'Edit Profile Details' : 'Farmer Registration Particulars'}
        </h3>

        {isEditing ? (
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-wood mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-wood mb-1">Mobile Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-wood mb-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-wood mb-1">State</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-wood mb-1">District</label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-wood mb-1">Village / Gram Panchayat</label>
                <input
                  type="text"
                  value={formData.village}
                  onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                  className="w-full text-xs"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-borderEarth">
              <button
                type="button"
                onClick={handleCancel}
                className="btn-secondary text-xs"
              >
                Cancel Changes
              </button>
              <button
                type="submit"
                className="btn-primary text-xs"
              >
                Save Updated Profile →
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div className="space-y-3">
              <div>
                <span className="text-mutedEarth font-medium block">Farmer Full Name</span>
                <strong className="text-wood text-sm font-bold">{user.name}</strong>
              </div>
              <div>
                <span className="text-mutedEarth font-medium block">Mobile Contact</span>
                <strong className="text-wood text-sm font-bold">{user.phone}</strong>
              </div>
              <div>
                <span className="text-mutedEarth font-medium block">Email Address</span>
                <strong className="text-wood text-sm font-bold">{user.email}</strong>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-mutedEarth font-medium block">State / Region</span>
                <strong className="text-wood text-sm font-bold">{user.state}</strong>
              </div>
              <div>
                <span className="text-mutedEarth font-medium block">District</span>
                <strong className="text-wood text-sm font-bold">{user.district}</strong>
              </div>
              <div>
                <span className="text-mutedEarth font-medium block">Village / Panchayat</span>
                <strong className="text-wood text-sm font-bold">{user.village}</strong>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 5. APPLICATION ROUTER & ROOT MOUNT
// ==========================================

function MainApp() {
  const { user, currentRoute } = useApp();

  if (!user?.isLoggedIn || currentRoute === '/login') {
    return <LoginSignup />;
  }

  const renderPage = () => {
    switch (currentRoute) {
      case '/':
        return <Dashboard />;
      case '/farms':
        return <MyFarms />;
      case '/crops':
        return <CropAdvisor />;
      case '/soil':
        return <SoilHealth />;
      case '/weather':
        return <WeatherPage />;
      case '/market':
        return <MarketPrices />;
      case '/recommendation':
        return <MarketRecommendation />;
      case '/disease':
        return <DiseaseDetection />;
      case '/notifications':
        return <NotificationsPage />;
      case '/profile':
        return <ProfilePage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout>
      {renderPage()}
    </Layout>
  );
}

function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
