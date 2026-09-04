// Soil Health Data mapped by Farm ID
export const soilDataByFarm = {
  "farm-1": {
    farmId: "farm-1",
    farmName: "Green Valley Farm",
    soilType: "Black Cotton Soil",
    lastTestedDate: "24 Aug 2026",
    overallHealth: "Optimal",
    healthScore: 88, // out of 100
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
