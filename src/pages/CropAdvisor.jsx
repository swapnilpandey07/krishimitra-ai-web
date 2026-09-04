// Crop Advisor & Searchable Directory Page
import { useApp } from '../context/AppContext.jsx';
import { Badge } from '../components/Badge.jsx';
import { Modal } from '../components/Modal.jsx';
import { EmptyState } from '../components/EmptyState.jsx';
import { cropDatabase, aiCropPredictions } from '../data/cropData.js';

export function CropAdvisor() {
  const { activeFarm, activeFarmId } = useApp();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedSeason, setSelectedSeason] = React.useState('All');
  const [selectedSoil, setSelectedSoil] = React.useState('All');
  const [selectedCropDetail, setSelectedCropDetail] = React.useState(null);

  const prediction = aiCropPredictions[activeFarmId] || aiCropPredictions["farm-1"];

  // Filter Crops
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
      {/* Page Header */}
      <div className="pb-4 border-b border-borderEarth">
        <h1 className="text-2xl font-bold font-heading text-wood">
          🌱 AI Crop Advisor & Crop Directory
        </h1>
        <p className="text-xs text-mutedEarth mt-1">
          Explore AI crop recommendations customized for <strong className="text-wood">{activeFarm.name}</strong> ({activeFarm.soilType}).
        </p>
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
            {prediction.confidence}% AI Match
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mt-4">
          <div className="md:col-span-8">
            <h2 className="text-2xl font-extrabold font-heading text-wood mb-2">
              {prediction.recommendedCrop}
            </h2>
            <p className="text-xs text-wood leading-relaxed mb-4 bg-white p-3 rounded-lg border border-borderEarth">
              {prediction.explanation}
            </p>

            <div className="flex flex-wrap gap-4 text-xs font-semibold">
              <span className="bg-earth px-3 py-1.5 rounded-md border border-borderEarth">
                Season: <strong className="text-wood">{prediction.season}</strong>
              </span>
              <span className="bg-earth px-3 py-1.5 rounded-md border border-borderEarth">
                Yield Target: <strong className="text-agriGreen-dark">{prediction.expectedYield}</strong>
              </span>
              <span className="bg-earth px-3 py-1.5 rounded-md border border-borderEarth">
                Revenue Est.: <strong className="text-agriGreen-dark">{prediction.expectedRevenue}</strong>
              </span>
            </div>
          </div>

          <div className="md:col-span-4 bg-white p-4 rounded-xl border border-borderEarth space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-mutedEarth">
              Alternative High-Yield Options:
            </h4>
            {prediction.alternateCrops.map((alt, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs p-2 bg-earth/60 rounded border border-borderEarth/60">
                <span className="font-semibold text-wood">{alt.name}</span>
                <span className="text-[11px] font-bold text-agriGreen-dark">{alt.confidence}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SEARCH AND FILTERS TOOLBAR */}
      <div className="krishi-card p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search crops by name, category, or tips..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
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

      {/* CROP LIBRARY GRID */}
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

      {/* CROP DETAIL MODAL */}
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
