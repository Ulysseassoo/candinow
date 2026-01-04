import { motion } from 'framer-motion';
import { LayoutDashboard, ListTodo, Settings as SettingsIcon, Flower2, Sparkles, MessageSquareHeart, CheckSquare } from 'lucide-react';
import { NavItem } from './NavItem';

interface SidebarProps {
  currentView: 'list' | 'dashboard' | 'settings' | 'feedback' | 'actions';
  onViewChange: (view: 'list' | 'dashboard' | 'settings' | 'feedback' | 'actions') => void;
  onLogoClick: () => void;
  actionsDueCount?: number;
}

export const Sidebar = ({ currentView, onViewChange, onLogoClick, actionsDueCount = 0 }: SidebarProps) => {
  return (
    <aside className="hidden lg:flex w-80 soft-card p-8 flex-col gap-12 sticky top-8 h-[calc(100vh-64px)]">
      <motion.button
        whileHover={{ scale: 1.02 }}
        onClick={onLogoClick}
        className="flex items-center gap-4 px-2 hover:opacity-80 transition-opacity text-left"
      >
        <div className="w-14 h-14 bg-primary rounded-3xl flex items-center justify-center text-white shadow-xl shadow-primary/30 transform -rotate-6">
          <Flower2 size={32} />
        </div>
        <div>
          <span className="text-2xl font-extrabold text-text-primary tracking-tight block leading-none">Candinow</span>
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mt-1 block">Candinow</span>
        </div>
      </motion.button>

      <nav className="flex flex-col gap-3">
        <NavItem
          id="list"
          icon={ListTodo}
          label="Candidatures"
          isActive={currentView === 'list'}
          onClick={() => onViewChange('list')}
        />
        <NavItem
          id="actions"
          icon={CheckSquare}
          label="Actions du jour"
          isActive={currentView === 'actions'}
          onClick={() => onViewChange('actions')}
          badge={actionsDueCount}
        />
        <NavItem
          id="dashboard"
          icon={LayoutDashboard}
          label="Dashboard"
          isActive={currentView === 'dashboard'}
          onClick={() => onViewChange('dashboard')}
        />
        <NavItem
          id="settings"
          icon={SettingsIcon}
          label="Paramètres"
          isActive={currentView === 'settings'}
          onClick={() => onViewChange('settings')}
        />

        <div className="border-t border-border/30 my-2"></div>

        <NavItem
          id="feedback"
          icon={MessageSquareHeart}
          label="Ton avis"
          isActive={currentView === 'feedback'}
          onClick={() => onViewChange('feedback')}
        />
      </nav>

      <div className="mt-auto group">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary-soft p-6 rounded-ui border border-primary/10 relative overflow-hidden"
        >
          <div className="absolute -bottom-2 -right-2 text-primary opacity-10 transform scale-150 rotate-12">
            <Flower2 size={100} />
          </div>
          <div className="flex items-center gap-2 text-primary-dark mb-3">
            <Sparkles size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Conseil</span>
          </div>
          <p className="text-xs text-text-primary/70 leading-relaxed font-semibold relative z-10">
            Chaque "non" te rapproche d'un "oui" épanouissant. Garde ton élan !
          </p>
        </motion.div>
      </div>
    </aside>
  );
};

