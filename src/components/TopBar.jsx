// Header TopBar Component
import { useApp } from '../context/AppContext.jsx';
import { FarmSwitcher } from './FarmSwitcher.jsx';

export function TopBar({ onOpenMobileNav }) {
  const { user, unreadNotificationCount, navigateTo, currentRoute } = useApp();

  return (
    <header className="bg-white border-b border-borderEarth sticky top-0 z-30 shadow-xs">
      {/* SIH Presentation Banner Bar */}
      <div className="bg-gradient-to-r from-agriGreen to-agriGreen-dark text-white px-4 py-1.5 text-center text-xs font-semibold tracking-wide flex items-center justify-center gap-2">
        <span className="bg-harvestGold text-white text-[10px] uppercase font-bold px-1.5 py-0.5 rounded">SIH 2026</span>
        <span className="truncate">
          KrishiMitra-AI helps farmers make better decisions using AI-powered crop, soil, weather, disease and market insights.
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Mobile Drawer Trigger + Farmer Greeting */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileNav}
            className="lg:hidden p-2 rounded-lg text-wood hover:bg-earth border border-borderEarth"
            aria-label="Open Navigation Menu"
          >
            <span className="text-xl">☰</span>
          </button>

          <div>
            <h1 className="text-base sm:text-lg font-bold font-heading text-wood leading-tight">
              Namaste, {user.name} <span className="inline-block animate-bounce">👋</span>
            </h1>
            <p className="text-[11px] text-mutedEarth hidden sm:block">
              {user.village}, {user.district} ({user.state})
            </p>
          </div>
        </div>

        {/* Right: Farm Switcher + Notifications + Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          <FarmSwitcher compact />

          {/* Notification Pill */}
          <button
            onClick={() => navigateTo('/notifications')}
            className={`relative p-2 rounded-lg border transition-all ${
              currentRoute === '/notifications' 
                ? 'bg-agriGreen-bg text-agriGreen border-agriGreen' 
                : 'bg-white text-wood border-borderEarth hover:bg-earth'
            }`}
            title="Notifications"
          >
            <span className="text-lg">🔔</span>
            {unreadNotificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-alertRed text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                {unreadNotificationCount}
              </span>
            )}
          </button>

          {/* Profile Shortcut */}
          <button
            onClick={() => navigateTo('/profile')}
            className="flex items-center gap-2 p-1 pl-2 rounded-lg border border-borderEarth hover:border-agriGreen transition-all bg-earth/50"
            title="Farmer Profile"
          >
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-7 h-7 rounded-full object-cover border border-agriGreen"
            />
            <span className="text-xs font-bold text-wood hidden md:inline truncate max-w-[100px]">
              Profile
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
