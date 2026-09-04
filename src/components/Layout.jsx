// Application Shell Layout Component
import { useApp } from '../context/AppContext.jsx';
import { Sidebar } from './Sidebar.jsx';
import { TopBar } from './TopBar.jsx';
import { MobileNav } from './MobileNav.jsx';
import { Toast } from './Toast.jsx';

export function Layout({ children }) {
  const { toast } = useApp();
  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex bg-earth text-wood font-body">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Main Content Column */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 lg:pb-0">
        <TopBar onOpenMobileNav={() => setIsMobileNavOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Mobile Drawer & Bottom Navigation */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />

      {/* System Toast Notifications */}
      <Toast toast={toast} />
    </div>
  );
}
