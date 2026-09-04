// Disease Detection Demo Data
export const demoDiseaseResult = {
  diseaseName: "Wheat Leaf Rust (Puccinia triticina)",
  confidence: 87,
  severity: "HIGH SEVERITY",
  severityLevel: "high", // high, medium, low
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

export const diseaseHistoryLog = [
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
