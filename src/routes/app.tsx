import { useEffect, useMemo } from 'react';
import { createFileRoute, Outlet, useLocation, useNavigate } from '@tanstack/react-router';
import useAppStore from '../stores/useStore';
import { Sidebar } from '../components/Sidebar';
import { BottomNav } from '../components/BottomNav';
import { AppHeader } from '../components/AppHeader';
import { getTodayISO } from '../lib/dateUtils';
import moment from 'moment';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { getApplicationsDueToday } from '../lib/followUpUtils';

export const Route = createFileRoute('/app')({
  component: AppLayout,
});

function AppLayout() {
  const navigate = useNavigate({ from: '/app' });
  const location = useLocation();
  const { applications } = useAppStore();

  useOnlineStatus();

  const getCurrentView = (): 'list' | 'dashboard' | 'settings' | 'feedback' | 'actions' => {
    const path = location.pathname;
    if (path === '/app/dashboard') return 'dashboard';
    if (path === '/app/settings') return 'settings';
    if (path === '/app/feedback') return 'feedback';
    if (path === '/app/actions') return 'actions';
    return 'list';
  };

  const currentView = getCurrentView();

  const actionsDueCount = useMemo(() => {
    return getApplicationsDueToday(applications).length;
  }, [applications]);

  useEffect(() => {
    if (typeof Notification === 'undefined') {
      return;
    }

    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }

    const checkReminders = () => {
      const today = getTodayISO();
      applications.forEach(app => {
        if (app.reminderAt && moment(app.reminderAt).isSameOrBefore(today, 'day') && app.followUpStatus !== 'done' && app.followUpStatus !== 'responded') {
          if (Notification.permission === 'granted') {
            new Notification('Candinow - Rappel Relance', {
              body: `Il est temps de relancer ta candidature chez ${app.company} pour le poste de ${app.title}.`,
              icon: '/favicon.ico'
            });
          }
        }
      });
    };

    checkReminders();
  }, [applications]);

  const handleViewChange = (newView: 'list' | 'dashboard' | 'settings' | 'feedback' | 'actions') => {
    if (newView === 'list') {
      navigate({ to: '/app' });
    } else {
      navigate({ to: `/app/${newView}` });
    }
  };

  const handleLogoClick = () => {
    navigate({ to: '/' });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row p-0 lg:p-8 gap-0 lg:gap-8 bg-[#FFF9FA]">
      <Sidebar
        currentView={currentView}
        onViewChange={handleViewChange}
        onLogoClick={handleLogoClick}
        actionsDueCount={actionsDueCount}
      />

      <main className="flex-1 flex flex-col min-w-0 pb-28 lg:pb-0 p-4 md:p-8 lg:p-0">
        <AppHeader
          currentView={currentView}
          onLogoClick={handleLogoClick}
        />

        <div className="flex-1 overflow-y-auto no-scrollbar">
          <Outlet />
        </div>
      </main>

      <BottomNav
        currentView={currentView}
        onViewChange={handleViewChange}
        actionsDueCount={actionsDueCount}
      />
    </div>
  );
}
