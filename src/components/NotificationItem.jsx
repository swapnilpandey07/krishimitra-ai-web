// Notification Item Tile Component
import { Badge } from './Badge.jsx';

export function NotificationItem({ notification, onMarkRead, onClick }) {
  if (!notification) return null;

  return (
    <div 
      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
        notification.isRead 
          ? 'bg-white border-borderEarth/60 opacity-80 hover:opacity-100' 
          : 'bg-agriGreen-bg/30 border-agriGreen/40 shadow-sm'
      }`}
      onClick={() => onClick && onClick(notification)}
    >
      <div className="flex items-start gap-3.5">
        <div className={`p-2.5 rounded-lg shrink-0 ${
          notification.badgeType === 'alertRed' ? 'bg-alertRed-light text-alertRed-dark' :
          notification.badgeType === 'harvestGold' ? 'bg-harvestGold-light text-harvestGold-dark' :
          notification.badgeType === 'weatherBlue' ? 'bg-weatherBlue-light text-weatherBlue-dark' :
          'bg-agriGreen-bg text-agriGreen-dark'
        }`}>
          {notification.category === 'Disease' ? '⚠️' :
           notification.category === 'Market' ? '📈' :
           notification.category === 'Weather' ? '🌧️' :
           notification.category === 'Soil' ? '🧪' : '🌱'}
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <Badge variant={notification.badgeType || 'agriGreen'}>
              {notification.category}
            </Badge>
            <span className="text-[11px] text-mutedEarth">{notification.timestamp} • {notification.date}</span>
            {!notification.isRead && (
              <span className="inline-block w-2 h-2 rounded-full bg-alertRed"></span>
            )}
          </div>

          <h4 className={`text-sm font-bold text-wood ${!notification.isRead ? 'font-heading' : ''}`}>
            {notification.title}
          </h4>
          <p className="text-xs text-mutedEarth mt-1 leading-relaxed">
            {notification.message}
          </p>
        </div>
      </div>

      <div className="shrink-0 flex flex-col items-end justify-between gap-2">
        {!notification.isRead && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMarkRead(notification.id);
            }}
            className="text-[11px] font-semibold text-agriGreen hover:underline bg-white px-2 py-1 rounded border border-borderEarth"
          >
            Mark read
          </button>
        )}
      </div>
    </div>
  );
}
