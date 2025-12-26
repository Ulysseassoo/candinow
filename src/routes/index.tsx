import { useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import useAppStore from '../stores/useStore';
import { Sidebar } from '../components/Sidebar';
import { BottomNav } from '../components/BottomNav';
import { AppHeader } from '../components/AppHeader';
import { Landing } from '@/pages/Landing';
// TODO: Importer les composants de vues une fois créés
// import { ApplicationsList } from '../views/ApplicationsList';
// import { Dashboard } from '../views/Dashboard';
// import { Settings } from '../views/Settings';
// import { Landing } from '../views/Landing';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  const { view, setView, applications } = useAppStore();

  useEffect(() => {
    if (Notification.permission === 'default' && view !== 'landing') {
      Notification.requestPermission();
    }

    const checkReminders = () => {
      const today = new Date().toISOString().split('T')[0];
      applications.forEach(app => {
        if (app.reminderAt && app.reminderAt <= today && app.followUpStatus !== 'done' && app.followUpStatus !== 'responded') {
          if (Notification.permission === 'granted') {
            new Notification('Candinow - Rappel Relance', {
              body: `Il est temps de relancer ta candidature chez ${app.company} pour le poste de ${app.title}.`,
              icon: '/favicon.ico'
            });
          }
        }
      });
    };

    if (view !== 'landing') checkReminders();
  }, [applications, view]);

  const renderView = () => {
    switch (view) {
      case 'list': 
        // return <ApplicationsList />;
        return <div className="p-8">ApplicationsList - À implémenter</div>;
      case 'dashboard': 
        // return <Dashboard />;
        return <div className="p-8">Dashboard - À implémenter</div>;
      case 'settings': 
        // return <Settings />;
        return <div className="p-8">Settings - À implémenter</div>;
      case 'landing':
        return <Landing />;
      default: 
        // return <ApplicationsList />;
        return <div className="p-8">ApplicationsList - À implémenter</div>;
    }
  };

  if (view === 'landing') {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          {renderView()}
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row p-0 lg:p-8 gap-0 lg:gap-8 bg-[#FFF9FA]">
      {/* Sidebar - Desktop */}
      <Sidebar 
        currentView={view} 
        onViewChange={setView}
        onLogoClick={() => setView('landing')}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 pb-28 lg:pb-0 p-4 md:p-8 lg:p-0">
        <AppHeader 
          currentView={view}
          onLogoClick={() => setView('landing')}
        />

        <div className="flex-1 overflow-y-auto no-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Bottom Navigation - Mobile */}
      <BottomNav 
        currentView={view}
        onViewChange={setView}
      />
    </div>
  );
}
