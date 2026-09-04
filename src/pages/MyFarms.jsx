// My Farms Management Page
import { useApp } from '../context/AppContext.jsx';
import { Modal } from '../components/Modal.jsx';
import { Badge } from '../components/Badge.jsx';

export function MyFarms() {
  const { farms, activeFarmId, switchActiveFarm, addFarm } = useApp();
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);

  // New Farm Form State
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
      {/* Header */}
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

      {/* Farm Cards Grid */}
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

      {/* ADD FARM MODAL */}
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
              className="w-full"
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
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-wood mb-1">Soil Type</label>
              <select
                value={newFarmData.soilType}
                onChange={(e) => setNewFarmData({ ...newFarmData, soilType: e.target.value })}
                className="w-full"
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
                className="w-full"
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
                className="w-full"
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
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-wood mb-1">Village</label>
              <input
                type="text"
                placeholder="Sanwer"
                value={newFarmData.village}
                onChange={(e) => setNewFarmData({ ...newFarmData, village: e.target.value })}
                className="w-full"
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
