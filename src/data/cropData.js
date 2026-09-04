// Crop Library & Recommendations Data
export const cropDatabase = [
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
    icon: "Wheat",
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
    icon: "Sprout",
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
    icon: "Wheat",
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
    icon: "Flower2",
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
    icon: "Kernel",
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
    icon: "Sun",
    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&q=80&w=600",
    description: "High-value commercial fiber crop tailored for deep black cotton soils with good water storage capability.",
    farmingTips: [
      "Adopt 90x60 cm or 120x45 cm spacing to prevent humidity build-up and boll rot.",
      "Spray Potassium Nitrate (13-0-45) @ 1% at boll development to increase seed weight.",
      "Pick cotton bolls when fully opened during dry morning hours."
    ]
  }
];

// Farm-specific AI Crop Predictions
export const aiCropPredictions = {
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
