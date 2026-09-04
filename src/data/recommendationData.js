// Market Recommendations Data mapped by Farm ID
export const marketRecommendationsByFarm = {
  "farm-1": {
    farmId: "farm-1",
    farmName: "Green Valley Farm (Indore)",
    cropName: "Wheat (Sharbati)",
    harvestQuantityQuintals: 105, // 5.2 acres * 20 quintals
    bestMandi: "Indore Mandi (Laxmi Nagar)",
    distanceKm: 18,
    expectedPricePerQuintal: 2600,
    grossRevenue: 273000,
    transportCostPerQuintal: 45,
    totalTransportCost: 4725,
    laborMandiFees: 2100,
    netExpectedProfit: 266175,
    recommendationScore: 96, // out of 100
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
    harvestQuantityQuintals: 91, // 3.8 acres * 24 quintals
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
