// Crop Disease Detection Computer Vision Prototype Page
import { Badge } from '../components/Badge.jsx';
import { ConfidenceGauge } from '../components/ConfidenceGauge.jsx';
import { demoDiseaseResult, diseaseHistoryLog } from '../data/diseaseData.js';

export function DiseaseDetection() {
  const [analyzing, setAnalyzing] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [result, setResult] = React.useState(demoDiseaseResult);

  const handleFileUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target.result);
      triggerAnalysis();
    };
    reader.readAsDataURL(file);
  };

  const triggerAnalysis = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setResult(demoDiseaseResult);
    }, 1800);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-borderEarth flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold font-heading text-wood flex items-center gap-2">
            <span>🔍 Leaf Disease Diagnostics</span>
          </h1>
          <p className="text-xs text-mutedEarth mt-1">
            Upload leaf photographs to diagnose crop infections using computer vision AI models.
          </p>
        </div>

        {/* MANDATORY PROTOTYPE / DEMO DISCLAIMER BADGE */}
        <div className="bg-harvestGold-light text-harvestGold-dark px-3 py-1.5 rounded-lg border border-harvestGold/40 text-xs font-bold flex items-center gap-1.5">
          <span>⚠️</span>
          <span>SIH Prototype / Demo Mode — Simulated Diagnostic Pipeline</span>
        </div>
      </div>

      {/* DRAG AND DROP IMAGE UPLOAD SIMULATOR */}
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
                    className="w-32 h-32 object-cover rounded-xl mx-auto border-2 border-agriGreen shadow-xs"
                  />
                  <p className="text-xs font-bold text-agriGreen-dark">Sample Loaded Successfully</p>
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
          </div>

          <div className="mt-4 pt-4 border-t border-borderEarth space-y-2">
            <button
              onClick={() => {
                setSelectedImage("https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=400");
                triggerAnalysis();
              }}
              className="w-full btn-primary text-xs py-2.5"
            >
              🧪 Load Sample Leaf Photo & Run AI Diagnostics →
            </button>
          </div>
        </div>

        {/* ANALYSIS RESULT DISPLAY */}
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
              {/* Header Result Tag */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-borderEarth">
                <div>
                  <Badge variant="alertRed">{result.severity}</Badge>
                  <h2 className="text-2xl font-extrabold font-heading text-wood mt-1">
                    {result.diseaseName}
                  </h2>
                  <p className="text-xs text-mutedEarth">
                    Crop: {result.affectedCrop} • Analyzed on {result.detectedOn}
                  </p>
                </div>
                <ConfidenceGauge score={result.confidence} size={130} label="Match Score" />
              </div>

              {/* SYMPTOMS */}
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

              {/* RECOMMENDED TREATMENTS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Chemical Treatment */}
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

                {/* Organic Treatment */}
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

              {/* Preventive Measures */}
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

      {/* PAST DIAGNOSTIC HISTORY LOG */}
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
