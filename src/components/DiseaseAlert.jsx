// Disease Alert Component for Dashboard
import { Badge } from './Badge.jsx';

export function DiseaseAlert({ disease, onTreatClick }) {
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
