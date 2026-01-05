import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/context';

interface ExportSectionProps {
  onExportJSON: () => void;
  onExportCSV: () => void;
}

export const ExportSection = ({ onExportJSON, onExportCSV }: ExportSectionProps) => {
  const { t } = useTranslation();

  return (
    <div className="bg-background p-6 rounded-ui border border-border shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 text-text-primary mb-2">
          <Download size={20} className="text-primary" />
          <h3 className="font-bold">{t('settings.export.title')}</h3>
        </div>
        <p className="text-text-secondary text-sm mb-6">
          {t('settings.export.description')}
        </p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={onExportJSON} className="flex-1">
          {t('settings.export.jsonButton')}
        </Button>
        <Button variant="outline" size="sm" onClick={onExportCSV} className="flex-1">
          {t('settings.export.csvButton')}
        </Button>
      </div>
    </div>
  );
};

