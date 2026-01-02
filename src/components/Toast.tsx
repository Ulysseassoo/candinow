import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X, AlertCircle, Info } from 'lucide-react';
import { useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type?: ToastType;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export const Toast = ({ message, type = 'success', isVisible, onClose, duration = 4000 }: ToastProps) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const icons = {
    success: <CheckCircle size={20} />,
    error: <AlertCircle size={20} />,
    info: <Info size={20} />,
  };

  const styles = {
    success: 'bg-success text-white',
    error: 'bg-danger text-white',
    info: 'bg-primary text-white',
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] max-w-md w-full mx-4"
        >
          <div className={`${styles[type]} px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4`}>
            <div className="flex-shrink-0">
              {icons[type]}
            </div>
            <p className="flex-1 font-bold text-sm">
              {message}
            </p>
            <button
              onClick={onClose}
              className="flex-shrink-0 hover:bg-white/20 rounded-lg p-1 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
