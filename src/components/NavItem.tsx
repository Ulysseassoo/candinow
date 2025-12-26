import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface NavItemProps {
  id: string;
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  onClick: () => void;
  variant?: 'sidebar' | 'bottom';
}

export const NavItem = ({ icon: Icon, label, isActive, onClick, variant = 'sidebar' }: NavItemProps) => {
  if (variant === 'bottom') {
    return (
      <button
        onClick={onClick}
        className={`flex flex-col items-center justify-center gap-1 flex-1 py-2 transition-all duration-300 active:scale-90 ${
          isActive ? 'text-primary' : 'text-text-secondary'
        }`}
      >
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
      className={`flex items-center gap-3 px-6 py-4 rounded-full text-sm font-bold transition-all duration-500 w-full ${
        isActive 
          ? 'bg-primary text-white shadow-lg shadow-primary/20' 
          : 'text-text-secondary hover:bg-primary-soft hover:text-primary'
      }`}
    >
      <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
      <span>{label}</span>
    </motion.button>
  );
};

