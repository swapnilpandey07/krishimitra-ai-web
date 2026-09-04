// Notifications Data
export const initialNotifications = [
  {
    id: "notif-1",
    category: "Disease",
    title: "High Disease Alert: Leaf Rust Detected",
    message: "Leaf Rust (87% confidence) detected on Green Valley Farm. Immediate Propiconazole spray advised.",
    timestamp: "10 mins ago",
    date: "03 Sep 2026",
    isRead: false,
    icon: "AlertTriangle",
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
    icon: "TrendingUp",
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
    icon: "CloudRain",
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
    icon: "Layers",
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
    icon: "Sprout",
    targetRoute: "/crops",
    badgeType: "agriGreen"
  }
];
