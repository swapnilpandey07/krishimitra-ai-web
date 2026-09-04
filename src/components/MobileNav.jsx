// Mobile Navigation Drawer & Bottom Bar Component
import { useApp } from '../context/AppContext.jsx';

export function MobileNav({ isOpen, onClose }) {
  const { currentRoute, navigateTo, logoutUser, unreadNotificationCount } = useApp();

  const mainNavItems = [
    { label: 'Dashboard', route: '/', icon: '📊' },
    { label: 'My Farms', route: '/farms', icon: '🌾' },
    { label: 'Crop Advisor', route: '/crops', icon: '🌱' },
    { label: 'Soil Health', route: '/soil', icon: '🧪' },
    { label: 'Weather', route: '/weather', icon: '🌧️' },
    { label: 'Market Prices', route: '/market', icon: '📈' },
    { label: 'Market Rec.', route: '/recommendation', icon: '⚖️' },
    { label: 'Disease Test', route: '/disease', icon: '🔍' },
    { label: 'Notifications', route: '/notifications', icon: '🔔', badge: unreadNotificationCount },
    { label: 'Profile', route: '/profile', icon: '👤' },
  ];

  const bottomNavItems = [
    { label: 'Home', route: '/', icon: '📊' },
    { label: 'Farms', route: '/farms', icon: '🌾' },
    { label: 'Crops', route: '/crops', icon: '🌱' },
    { label: 'Market', route: '/recommendation', icon: '⚖️' },
    { label: 'Disease', route: '/disease', icon: '🔍' },
  ];

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-wood/50 backdrop-blur-xs" onClick={onClose} />
          
          <div className="relative bg-white w-72 max-w-full h-full flex flex-col justify-between z-10 shadow-2xl overflow-y-auto">
            <div>
              <div className="p-4 border-b border-borderEarth flex items-center justify-between bg-earth">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🚜</span>
                  <span className="font-extrabold font-heading text-wood">KrishiMitra-AI</span>
                </div>
                <button onClick={onClose} className="p-1 rounded text-wood font-bold text-lg">✕</button>
              </div>

              <nav className="p-3 space-y-1">
                {mainNavItems.map((item) => {
                  const isActive = currentRoute === item.route;
                  return (
                    <button
                      key={item.route}
                      onClick={() => {
                        navigateTo(item.route);
                        onClose();
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold ${
                        isActive
                          ? 'bg-agriGreen text-white font-bold'
                          : 'text-wood hover:bg-earth'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-base">{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                      {item.badge > 0 && (
                        <span className="bg-alertRed text-white text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="p-4 border-t border-borderEarth">
              <button
                onClick={() => {
                  logoutUser();
                  onClose();
                }}
                className="w-full btn-secondary text-xs text-alertRed border-alertRed/30"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Mobile Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-borderEarth px-2 py-1 flex items-center justify-around shadow-lg">
        {bottomNavItems.map((item) => {
          const isActive = currentRoute === item.route;
          return (
            <button
              key={item.route}
              onClick={() => navigateTo(item.route)}
              className={`flex flex-col items-center py-1 px-2 rounded-lg transition-all ${
                isActive ? 'text-agriGreen font-bold' : 'text-mutedEarth hover:text-wood'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-[10px] font-medium mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
