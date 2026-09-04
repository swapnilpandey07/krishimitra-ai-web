// Main Application Entry & Routing Component
import { AppProvider, useApp } from './context/AppContext.jsx';
import { Layout } from './components/Layout.jsx';

import { LoginSignup } from './pages/LoginSignup.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import { MyFarms } from './pages/MyFarms.jsx';
import { CropAdvisor } from './pages/CropAdvisor.jsx';
import { SoilHealth } from './pages/SoilHealth.jsx';
import { WeatherPage } from './pages/WeatherPage.jsx';
import { MarketPrices } from './pages/MarketPrices.jsx';
import { MarketRecommendation } from './pages/MarketRecommendation.jsx';
import { DiseaseDetection } from './pages/DiseaseDetection.jsx';
import { NotificationsPage } from './pages/NotificationsPage.jsx';
import { ProfilePage } from './pages/ProfilePage.jsx';

function MainApp() {
  const { user, currentRoute } = useApp();

  // If user is logged out or route is login, render LoginSignup page directly
  if (!user?.isLoggedIn || currentRoute === '/login') {
    return <LoginSignup />;
  }

  // Render Page Content inside App Shell Layout
  const renderPage = () => {
    switch (currentRoute) {
      case '/':
        return <Dashboard />;
      case '/farms':
        return <MyFarms />;
      case '/crops':
        return <CropAdvisor />;
      case '/soil':
        return <SoilHealth />;
      case '/weather':
        return <WeatherPage />;
      case '/market':
        return <MarketPrices />;
      case '/recommendation':
        return <MarketRecommendation />;
      case '/disease':
        return <DiseaseDetection />;
      case '/notifications':
        return <NotificationsPage />;
      case '/profile':
        return <ProfilePage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout>
      {renderPage()}
    </Layout>
  );
}

// Root Component
export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}

// Mount to DOM
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
