import { createFileRoute } from '@tanstack/react-router';
import { FeedbackForm } from '@/components/FeedbackForm';
import { MessageSquareHeart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n/context';

export const Route = createFileRoute('/app/feedback')({
  component: FeedbackPage,
});

function FeedbackPage() {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-2xl mx-auto pb-8">
      <div className="soft-card p-8 lg:p-12">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary-soft rounded-2xl flex items-center justify-center text-primary">
              <MessageSquareHeart size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-text-primary tracking-tight">{t('feedback.title')}</h1>
            </div>
          </div>
          <p className="text-text-secondary font-medium leading-relaxed">
            {t('feedback.description')}
          </p>
        </div>

        <FeedbackForm />
      </div>
    </motion.div>
  );
}
