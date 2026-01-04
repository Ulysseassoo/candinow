import { motion } from 'framer-motion';
import { LayoutDashboard, ListTodo, Settings as SettingsIcon, MessageSquareHeart, CheckSquare } from 'lucide-react';
import { NavItem } from './NavItem';

interface BottomNavProps {
  currentView: 'list' | 'dashboard' | 'settings' | 'feedback' | 'actions';
  onViewChange: (view: 'list' | 'dashboard' | 'settings' | 'feedback' | 'actions') => void;
  actionsDueCount?: number;
}

export const BottomNav = ({ currentView, onViewChange, actionsDueCount = 0 }: BottomNavProps) => {
  return (
    <motion.nav
      initial={{ y: 120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      className="lg:hidden fixed bottom-6 inset-x-0 mx-auto w-[90%] max-w-md h-20 bg-white/90 backdrop-blur-lg border border-primary/10 rounded-[32px] shadow-[0_20px_50px_-10px_rgba(255,183,197,0.3)] flex items-center px-2 z-50"
    >
      <NavItem
        id="list"
        icon={ListTodo}
        label="Liste"
        isActive={currentView === 'list'}
        onClick={() => onViewChange('list')}
        variant="bottom"
      />
      <NavItem
        id="actions"
        icon={CheckSquare}
        label="Actions"
        isActive={currentView === 'actions'}
        onClick={() => onViewChange('actions')}
        variant="bottom"
        badge={actionsDueCount}
      />
      <NavItem
        id="dashboard"
        icon={LayoutDashboard}
        label="Stats"
        isActive={currentView === 'dashboard'}
        onClick={() => onViewChange('dashboard')}
        variant="bottom"
      />
      <NavItem
        id="settings"
        icon={SettingsIcon}
        label="Réglages"
        isActive={currentView === 'settings'}
        onClick={() => onViewChange('settings')}
        variant="bottom"
      />
      <NavItem
        id="feedback"
        icon={MessageSquareHeart}
        label="Avis"
        isActive={currentView === 'feedback'}
        onClick={() => onViewChange('feedback')}
        variant="bottom"
      />
    </motion.nav>
  );
};

