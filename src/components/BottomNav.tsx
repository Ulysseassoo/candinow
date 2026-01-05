import { motion } from 'framer-motion';
import { LayoutDashboard, ListTodo, Settings as SettingsIcon, MessageSquareHeart, CheckSquare } from 'lucide-react';
import { NavItem } from './NavItem';
import { useTranslation } from '@/lib/i18n/context';

interface BottomNavProps {
  currentView: 'list' | 'dashboard' | 'settings' | 'feedback' | 'actions';
  onViewChange: (view: 'list' | 'dashboard' | 'settings' | 'feedback' | 'actions') => void;
  actionsDueCount?: number;
}

export const BottomNav = ({ currentView, onViewChange, actionsDueCount = 0 }: BottomNavProps) => {
  const { t } = useTranslation();

  return (
    <motion.nav
      initial={{ y: 120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      className="lg:hidden fixed bottom-6 inset-x-0 mx-auto w-[90%] max-w-md h-20 bg-background/90 backdrop-blur-lg border border-primary/10 rounded-[32px] flex items-center px-2 z-50"
      style={{ boxShadow: 'var(--shadow-colored, 0 20px 50px -10px rgba(0, 0, 0, 0.15))' }}
    >
      <NavItem
        id="list"
        icon={ListTodo}
        label={t('nav.listShort')}
        isActive={currentView === 'list'}
        onClick={() => onViewChange('list')}
        variant="bottom"
      />
      <NavItem
        id="actions"
        icon={CheckSquare}
        label={t('nav.actionsShort')}
        isActive={currentView === 'actions'}
        onClick={() => onViewChange('actions')}
        variant="bottom"
        badge={actionsDueCount}
      />
      <NavItem
        id="dashboard"
        icon={LayoutDashboard}
        label={t('nav.stats')}
        isActive={currentView === 'dashboard'}
        onClick={() => onViewChange('dashboard')}
        variant="bottom"
      />
      <NavItem
        id="settings"
        icon={SettingsIcon}
        label={t('nav.settingsShort')}
        isActive={currentView === 'settings'}
        onClick={() => onViewChange('settings')}
        variant="bottom"
      />
      <NavItem
        id="feedback"
        icon={MessageSquareHeart}
        label={t('nav.feedbackShort')}
        isActive={currentView === 'feedback'}
        onClick={() => onViewChange('feedback')}
        variant="bottom"
      />
    </motion.nav>
  );
};

