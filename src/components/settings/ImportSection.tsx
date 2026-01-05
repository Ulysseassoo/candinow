import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/context';

interface ImportSectionProps {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTriggerClick: () => void;
  isLoading: boolean;
}

export const ImportSection = ({ fileInputRef, onImport, onTriggerClick, isLoading }: ImportSectionProps) => {
  const { t } = useTranslation();

  return (
    <div className="bg-background p-6 rounded-ui border border-border shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 text-text-primary mb-2">
          <Upload size={20} className="text-success" />
          <h3 className="font-bold">{t('settings.import.title')}</h3>
        </div>
        <p className="text-text-secondary text-sm mb-6">
          {t('settings.import.description')}
        </p>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={onImport}
        className="hidden"
        accept=".json"
      />
      <Button
        variant="primary"
        disabled={isLoading}
        className="w-full bg-success hover:bg-success/80"
        onClick={onTriggerClick}
      >
        {t('settings.import.button')}
      </Button>
    </div>
  );
};

