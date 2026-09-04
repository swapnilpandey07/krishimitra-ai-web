// Desktop Navigation Sidebar Component
import { useApp } from '../context/AppContext.jsx';

export function Sidebar() {
  const { currentRoute, navigateTo, logoutUser, unreadNotificationCount, activeFarm } = useApp();

  const navItems = [
    { label: 'Dashboard', route: '/', icon: '📊' },
    { label: 'My Farms', route: '/farms', icon: '🌾' },
    { label: 'Crop Advisor', route: '/crops', icon: '🌱' },
    { label: 'Soil Health', route: '/soil', icon: '🧪' },
    { label: 'Weather Insights', route: '/weather', icon: '🌧️' },
    { label: 'Market Prices', route: '/market', icon: '📈' },
    { label: 'Market Recommendation', route: '/recommendation', icon: '⚖️' },
    { label: 'Disease Detection', route: '/disease', icon: '🔍' },
    { label: 'Notifications', route: '/notifications', icon: '🔔', badge: unreadNotificationCount },
    { label: 'Farmer Profile', route: '/profile', icon: '👤' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-borderEarth flex flex-col justify-between shrink-0 h-screen sticky top-0">
      {/* Top Branding Header */}
      <div>
        <div 
          onClick={() => navigateTo('/')}
          className="p-5 border-b border-borderEarth cursor-pointer flex items-center gap-3 bg-earth/40"
        >
          <div className="w-10 h-10 rounded-xl bg-agriGreen text-white flex items-center justify-center font-bold text-xl shadow-xs">
            🚜
          </div>
          <div>
            <h2 className="text-lg font-extrabold font-heading text-wood leading-none">
              KrishiMitra<span className="text-harvestGold">-AI</span>
            </h2>
            <span className="text-[10px] font-bold tracking-wider text-agriGreen uppercase">
              SIH Agriculture Portal
            </span>
          </div>
        </div>

        {/* Active Farm Status Badge */}
        {activeFarm && (
          <div className="mx-4 mt-4 p-3 rounded-xl bg-agriGreen-bg border border-agriGreen/30">
            <span className="text-[10px] uppercase font-bold text-agriGreen-dark tracking-wider block mb-0.5">
              Active Selected Farm
            </span>
            <div className="text-xs font-bold text-wood truncate">
              {activeFarm.name}
            </div>
            <div className="text-[10px] text-mutedEarth truncate">
              {activeFarm.acres} Acres • {activeFarm.soilType}
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="p-3 space-y-1 mt-2">
          {navItems.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <button
                key={item.route}
                onClick={() => navigateTo(item.route)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-agriGreen text-white font-bold shadow-xs'
                    : 'text-wood hover:bg-earth hover:text-agriGreen-dark'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.badge > 0 && (
                  <span className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-alertRed text-white' : 'bg-alertRed-light text-alertRed-dark'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Logout Button */}
      <div className="p-4 border-t border-borderEarth bg-earth/30">
        <button
          onClick={logoutUser}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold text-alertRed hover:bg-alertRed-light rounded-lg transition-colors border border-alertRed/20"
        >
          <span>🚪</span>
          <span>Logout Account</span>
        </button>
      </div>
    </aside>
  );
}
