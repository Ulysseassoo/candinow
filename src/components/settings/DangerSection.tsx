import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/context';

interface DangerSectionProps {
  applicationsCount: number;
  onReset: () => void;
}

export const DangerSection = ({ applicationsCount, onReset }: DangerSectionProps) => {
  const { t } = useTranslation();

  return (
    <div className="bg-danger-soft/20 p-6 rounded-ui border border-danger/10">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-danger">
          <Trash2 size={20} />
          <div className="flex flex-col">
            <h3 className="font-bold">{t('settings.danger.title')}</h3>
            <p className="text-danger/80 text-xs">
              {t('settings.danger.description', { count: applicationsCount })}
            </p>
          </div>
        </div>
        <Button variant="danger" size="sm" onClick={onReset}>
          {t('settings.danger.button')}
        </Button>
      </div>
    </div>
  );
};

