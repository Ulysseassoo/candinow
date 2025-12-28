import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface DangerSectionProps {
  applicationsCount: number;
  onReset: () => void;
}

export const DangerSection = ({ applicationsCount, onReset }: DangerSectionProps) => {
  return (
    <div className="bg-danger-soft/20 p-6 rounded-ui border border-danger/10">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-danger">
          <Trash2 size={20} />
          <div className="flex flex-col">
            <h3 className="font-bold">Zone de Danger</h3>
            <p className="text-danger/80 text-xs">
              Effacer définitivement tes {applicationsCount} candidatures.
            </p>
          </div>
        </div>
        <Button variant="danger" size="sm" onClick={onReset}>
          Réinitialiser
        </Button>
      </div>
    </div>
  );
};

