// Notifications Inbox & Category Filter Page
import { useApp } from '../context/AppContext.jsx';
import { NotificationItem } from '../components/NotificationItem.jsx';
import { EmptyState } from '../components/EmptyState.jsx';

export function NotificationsPage() {
  const { notifications, unreadNotificationCount, markNotificationAsRead, markAllNotificationsAsRead, navigateTo } = useApp();
  const [activeCategory, setActiveCategory] = React.useState('All'); // 'All', 'Unread', 'Disease', 'Market', 'Weather'

  const categories = ['All', 'Unread', 'Disease', 'Market', 'Weather', 'Soil', 'Crop'];

  const filteredNotifications = React.useMemo(() => {
    if (activeCategory === 'All') return notifications;
    if (activeCategory === 'Unread') return notifications.filter(n => !n.isRead);
    return notifications.filter(n => n.category === activeCategory);
  }, [notifications, activeCategory]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-borderEarth">
        <div>
          <h1 className="text-2xl font-bold font-heading text-wood flex items-center gap-2">
            <span>🔔 Notifications & Alerts Inbox</span>
          </h1>
          <p className="text-xs text-mutedEarth mt-1">
            Stay informed on sudden weather shifts, mandi price spikes, disease alerts, and soil health status.
          </p>
        </div>

        {unreadNotificationCount > 0 && (
          <button
            onClick={markAllNotificationsAsRead}
            className="btn-secondary text-xs"
          >
            ✓ Mark All ({unreadNotificationCount}) as Read
          </button>
        )}
      </div>

      {/* CATEGORY TABS BAR */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-earth rounded-xl border border-borderEarth">
        {categories.map(cat => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isActive 
                  ? 'bg-agriGreen text-white font-bold shadow-xs' 
                  : 'text-wood hover:bg-white hover:text-agriGreen-dark'
              }`}
            >
              {cat}
              {cat === 'Unread' && unreadNotificationCount > 0 && (
                <span className="ml-1.5 bg-alertRed text-white text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">
                  {unreadNotificationCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* NOTIFICATION TILES LIST */}
      {filteredNotifications.length === 0 ? (
        <EmptyState
          title="No Notifications in this Category"
          message="You're all caught up! No active alerts match this filter."
          icon="🔔"
          onAction={() => setActiveCategory('All')}
          actionLabel="Show All Notifications"
        />
      ) : (
        <div className="space-y-3">
          {filteredNotifications.map(notif => (
            <NotificationItem
              key={notif.id}
              notification={notif}
              onMarkRead={markNotificationAsRead}
              onClick={() => navigateTo(notif.targetRoute || '/')}
            />
          ))}
        </div>
      )}
    </div>
  );
}
