import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

interface ImportSectionProps {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTriggerClick: () => void;
  isLoading: boolean;
}

export const ImportSection = ({ fileInputRef, onImport, onTriggerClick, isLoading }: ImportSectionProps) => {
  return (
    <div className="bg-background p-6 rounded-ui border border-border shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 text-text-primary mb-2">
          <Upload size={20} className="text-success" />
          <h3 className="font-bold">Importer</h3>
        </div>
        <p className="text-text-secondary text-sm mb-6">
          Restaure tes données depuis un fichier.
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
        Importer JSON
      </Button>
    </div>
  );
};

