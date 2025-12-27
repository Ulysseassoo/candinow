
import React, { useEffect } from 'react';
import { X, Flower2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end lg:items-center justify-center p-0 lg:p-4">
          {/* Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-primary/10 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative bg-white rounded-t-[40px] lg:rounded-[40px] shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden border border-primary/10 mb-0 lg:mb-0"
          >
            {/* Drag Handle for Mobile */}
            <div className="lg:hidden w-12 h-1.5 bg-gray-100 rounded-full mx-auto mt-4 mb-2"></div>

            <div className="flex items-center justify-between p-6 lg:p-10 pb-4 lg:pb-6">
              <div className="flex items-center gap-4">
                <div className="p-2.5 lg:p-3 bg-primary-soft rounded-2xl text-primary">
                  <Flower2 size={24} />
                </div>
                <h2 className="text-xl lg:text-3xl font-black text-text-primary tracking-tighter">{title}</h2>
              </div>
              <motion.button 
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-3 bg-gray-50 hover:bg-primary-soft rounded-full transition-all text-text-secondary hover:text-primary-dark"
              >
                <X size={20} />
              </motion.button>
            </div>

            <div className="px-6 lg:px-10 pb-8 lg:pb-10 overflow-y-auto no-scrollbar">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {children}
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
