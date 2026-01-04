import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface NavItemProps {
  id: string;
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  onClick: () => void;
  variant?: 'sidebar' | 'bottom';
  badge?: number;
}

export const NavItem = ({ icon: Icon, label, isActive, onClick, variant = 'sidebar', badge }: NavItemProps) => {
  if (variant === 'bottom') {
    return (
      <button
        onClick={onClick}
        className={`flex flex-col items-center justify-center gap-1 flex-1 py-2 transition-all duration-300 active:scale-90 relative ${
          isActive ? 'text-primary' : 'text-text-secondary'
        }`}
      >
        {badge !== undefined && badge > 0 && (
          <div className="absolute top-1 right-1/4 bg-danger text-white text-[10px] font-black rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-lg animate-pulse">
            {badge > 99 ? '99+' : badge}
          </div>
        )}
        <div className={`p-2 rounded-2xl transition-all duration-500 ${isActive ? 'bg-primary-soft scale-110' : ''}`}>
          <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
        </div>
        <span className={`text-[10px] font-black uppercase tracking-widest transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-60'}`}>
          {label}
        </span>
      </button>
    );
  }

  return (
    <motion.button
      whileHover={{ x: 5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex items-center gap-3 px-6 py-4 rounded-full text-sm font-bold transition-all duration-500 w-full relative ${
        isActive
          ? 'bg-primary text-white shadow-lg shadow-primary/20'
          : 'text-text-secondary hover:bg-primary-soft hover:text-primary'
      }`}
    >
      <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
      <span>{label}</span>
      {badge !== undefined && badge > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="ml-auto bg-danger text-white text-xs font-black rounded-full min-w-[24px] h-[24px] flex items-center justify-center px-2 shadow-lg animate-pulse"
        >
          {badge > 99 ? '99+' : badge}
        </motion.div>
      )}
    </motion.button>
  );
};

