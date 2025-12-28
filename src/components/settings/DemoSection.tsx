import { Button } from '@/components/ui/button';
import { Beaker, Sparkles } from 'lucide-react';

interface DemoSectionProps {
  onGenerate: () => void;
  isLoading: boolean;
}

export const DemoSection = ({ onGenerate, isLoading }: DemoSectionProps) => {
  return (
    <div className="bg-accent/10 p-6 rounded-ui border-2 border-dashed border-accent/40">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-xl text-accent shadow-sm">
            <Beaker size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-text-primary">Mode Démonstration</h3>
            <p className="text-text-secondary text-sm">Remplis l'application avec 50 candidatures pour tester le design.</p>
          </div>
        </div>
        <Button 
          onClick={onGenerate}
          variant="primary"
          disabled={isLoading}
          className="bg-accent hover:bg-accent/80 shadow-accent/20 whitespace-nowrap"
        >
          <Sparkles size={16} className="mr-2" /> Générer 50 tests
        </Button>
      </div>
    </div>
  );
};

