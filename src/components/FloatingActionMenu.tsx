import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

interface FloatingActionMenuProps {
  onAddClick: () => void;
}

const Tooltip = ({ children, text }: { children: React.ReactNode; text: string }) => {
  return (
    <div className="relative group">
      {children}
      <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        <div className="bg-text-primary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
          {text}
        </div>
        <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-text-primary"></div>
      </div>
    </div>
  );
};

export const FloatingActionMenu = ({ onAddClick }: FloatingActionMenuProps) => {
  return (
    <div className="fixed bottom-28 lg:bottom-12 right-6 z-[70]">
      <Tooltip text="Ajouter">
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAddClick}
          className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center shadow-[0_15px_30px_-5px_rgba(255,183,197,0.5)] transition-all"
          aria-label="Ajouter une candidature"
        >
          <Plus size={28} strokeWidth={2.5} />
        </motion.button>
      </Tooltip>
    </div>
  );
};

