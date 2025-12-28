import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface ExportSectionProps {
  onExportJSON: () => void;
  onExportCSV: () => void;
}

export const ExportSection = ({ onExportJSON, onExportCSV }: ExportSectionProps) => {
  return (
    <div className="bg-white p-6 rounded-ui border border-border shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 text-text-primary mb-2">
          <Download size={20} className="text-primary" />
          <h3 className="font-bold">Exporter</h3>
        </div>
        <p className="text-text-secondary text-sm mb-6">
          Sauvegarde tes données localement.
        </p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={onExportJSON} className="flex-1">
          JSON
        </Button>
        <Button variant="outline" size="sm" onClick={onExportCSV} className="flex-1">
          CSV
        </Button>
      </div>
    </div>
  );
};

