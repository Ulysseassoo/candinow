import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquareHeart, Plus, MoreVertical } from 'lucide-react';
import { useState } from 'react';

interface FloatingActionMenuProps {
  onAddClick: () => void;
  onFeedbackClick: () => void;
  hasApplications: boolean;
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

export const FloatingActionMenu = ({ onAddClick, onFeedbackClick, hasApplications }: FloatingActionMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-28 lg:bottom-12 right-6 flex flex-col items-end gap-4 z-[70]">
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            <Tooltip text="Ton avis">
              <motion.button
                initial={{ opacity: 0, scale: 0.3, y: 10, x: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, scale: 0.3, y: 10, x: -10 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 25,
                  duration: 0.3
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setIsOpen(false);
                  onFeedbackClick();
                }}
                className="w-14 h-14 bg-accent text-white rounded-2xl flex items-center justify-center shadow-lg shadow-accent/20 transition-all"
              >
                <MessageSquareHeart size={24} />
              </motion.button>
            </Tooltip>

            {hasApplications && (
              <Tooltip text="Ajouter">
                <motion.button
                  initial={{ opacity: 0, scale: 0.3, y: 10, x: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                  exit={{ opacity: 0, scale: 0.3, y: 10, x: -10 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 25,
                    duration: 0.3,
                    delay: 0.05
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setIsOpen(false);
                    onAddClick();
                  }}
                  className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center shadow-[0_15px_30px_-5px_rgba(255,183,197,0.5)] transition-all"
                >
                  <Plus size={24} />
                </motion.button>
              </Tooltip>
            )}
          </>
        )}
      </AnimatePresence>

      <Tooltip text={isOpen ? "Fermer" : "Menu"}>
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all ${
            isOpen 
              ? 'bg-text-primary text-white' 
              : 'bg-primary text-white'
          }`}
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 20,
              duration: 0.3
            }}
          >
            <MoreVertical size={24} />
          </motion.div>
        </motion.button>
      </Tooltip>
    </div>
  );
};

