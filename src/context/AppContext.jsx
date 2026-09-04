// Global Application Context & State Provider with LocalStorage Persistence
import { initialFarmerProfile } from '../data/farmerData.js';
import { initialFarms } from '../data/farmData.js';
import { initialNotifications } from '../data/notificationData.js';

const AppContext = React.createContext();

export function AppProvider({ children }) {
  // 1. Auth & User Profile State
  const [user, setUser] = React.useState(() => {
    const saved = localStorage.getItem('krishi_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return { ...initialFarmerProfile, isLoggedIn: true };
  });

  // 2. Farms State
  const [farms, setFarms] = React.useState(() => {
    const saved = localStorage.getItem('krishi_farms');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialFarms;
  });

  // 3. Active Farm ID State
  const [activeFarmId, setActiveFarmId] = React.useState(() => {
    const saved = localStorage.getItem('krishi_active_farm');
    if (saved) return saved;
    return "farm-1";
  });

  // 4. Notifications State
  const [notifications, setNotifications] = React.useState(() => {
    const saved = localStorage.getItem('krishi_notifications');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialNotifications;
  });

  // 5. Current Navigation Route State
  const [currentRoute, setCurrentRoute] = React.useState(() => {
    const savedRoute = localStorage.getItem('krishi_route');
    return savedRoute || '/';
  });

  // 6. Toast Notification System
  const [toast, setToast] = React.useState(null);

  // Sync to LocalStorage on state updates
  React.useEffect(() => {
    localStorage.setItem('krishi_user', JSON.stringify(user));
  }, [user]);

  React.useEffect(() => {
    localStorage.setItem('krishi_farms', JSON.stringify(farms));
  }, [farms]);

  React.useEffect(() => {
    localStorage.setItem('krishi_active_farm', activeFarmId);
  }, [activeFarmId]);

  React.useEffect(() => {
    localStorage.setItem('krishi_notifications', JSON.stringify(notifications));
  }, [notifications]);

  React.useEffect(() => {
    localStorage.setItem('krishi_route', currentRoute);
  }, [currentRoute]);

  // Helper Actions
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const navigateTo = (route) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const loginUser = (email, password) => {
    setUser(prev => ({
      ...prev,
      email: email || prev.email,
      isLoggedIn: true
    }));
    showToast(`Welcome back, ${user.name}! Logged in successfully.`);
    navigateTo('/');
  };

  const signupUser = (formData) => {
    setUser({
      ...formData,
      isLoggedIn: true,
      avatarUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=200",
      memberSince: "2026",
      totalFarmsCount: farms.length,
      totalAcresCount: farms.reduce((acc, f) => acc + (parseFloat(f.acres) || 0), 0)
    });
    showToast(`Account created! Welcome to KrishiMitra-AI, ${formData.name}.`);
    navigateTo('/');
  };

  const logoutUser = () => {
    setUser(prev => ({ ...prev, isLoggedIn: false }));
    showToast('Logged out successfully.', 'info');
    navigateTo('/login');
  };

  const updateProfile = (updatedProfile) => {
    setUser(prev => ({ ...prev, ...updatedProfile }));
    showToast('Farmer profile saved successfully!');
  };

  const switchActiveFarm = (farmId) => {
    setActiveFarmId(farmId);
    setFarms(prevFarms => prevFarms.map(f => ({
      ...f,
      isActive: f.id === farmId
    })));
    const target = farms.find(f => f.id === farmId);
    showToast(`Switched active farm to ${target ? target.name : 'Selected Farm'}`);
  };

  const addFarm = (farmData) => {
    const newId = `farm-${Date.now()}`;
    const newFarm = {
      id: newId,
      name: farmData.name,
      acres: parseFloat(farmData.acres) || 1.0,
      soilType: farmData.soilType || 'Black Soil',
      irrigationType: farmData.irrigationType || 'Borewell',
      location: `${farmData.district || 'Indore'}, ${farmData.state || 'Madhya Pradesh'}`,
      village: farmData.village || 'Local Village',
      surveyNumber: farmData.surveyNumber || `SY-${Math.floor(100 + Math.random() * 800)}`,
      isActive: true,
      establishedYear: new Date().getFullYear()
    };

    setFarms(prev => [
      ...prev.map(f => ({ ...f, isActive: false })),
      newFarm
    ]);
    setActiveFarmId(newId);
    setUser(prev => ({
      ...prev,
      totalFarmsCount: prev.totalFarmsCount + 1,
      totalAcresCount: prev.totalAcresCount + newFarm.acres
    }));

    showToast(`New farm "${newFarm.name}" added and activated!`);
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    showToast('All notifications marked as read');
  };

  // Compute active farm object
  const activeFarm = React.useMemo(() => {
    return farms.find(f => f.id === activeFarmId) || farms[0] || initialFarms[0];
  }, [farms, activeFarmId]);

  const unreadNotificationCount = React.useMemo(() => {
    return notifications.filter(n => !n.isRead).length;
  }, [notifications]);

  const value = {
    user,
    farms,
    activeFarm,
    activeFarmId,
    notifications,
    unreadNotificationCount,
    currentRoute,
    toast,
    showToast,
    navigateTo,
    loginUser,
    signupUser,
    logoutUser,
    updateProfile,
    switchActiveFarm,
    addFarm,
    markNotificationAsRead,
    markAllNotificationsAsRead
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
