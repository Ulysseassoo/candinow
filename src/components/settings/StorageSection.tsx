import { Database } from 'lucide-react';

interface StorageSectionProps {
  usage: number;
}

export const StorageSection = ({ usage }: StorageSectionProps) => {
  return (
    <div className="pt-8 border-t border-border flex flex-col items-center gap-2">
      <div className="flex items-center gap-2 text-text-secondary text-xs uppercase tracking-widest font-bold">
        <Database size={14} /> Stockage Local Utilisé
      </div>
      <div className="w-full max-w-xs h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary rounded-full transition-all duration-1000" 
          style={{ width: `${usage}%` }} 
        />
      </div>
    </div>
  );
};

