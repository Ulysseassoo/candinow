import { Shield } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/context';

export const PrivacySection = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-primary-soft/30 p-6 rounded-ui border border-primary/10">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-background rounded-xl text-primary shadow-sm">
          <Shield size={24} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-text-primary">{t('settings.privacy.title')}</h3>
          <p className="text-text-secondary text-sm mt-1">
            {t('settings.privacy.description')}
          </p>
        </div>
      </div>
    </div>
  );
};

