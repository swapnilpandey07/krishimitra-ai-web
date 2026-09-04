// Global Farm Selector Component
import { useApp } from '../context/AppContext.jsx';

export function FarmSwitcher({ compact = false }) {
  const { farms, activeFarm, activeFarmId, switchActiveFarm, navigateTo } = useApp();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      {/* Trigger Button */}
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

      {/* Dropdown Menu */}
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
