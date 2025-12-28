import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  colorClass: string;
  bgColorClass: string;
}

export const StatCard = ({ title, value, icon: Icon, colorClass, bgColorClass }: StatCardProps) => {
  return (
    <div className="soft-card p-6 flex flex-col gap-2">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary">
          {title}
        </span>
        <div className={`p-2 rounded-xl ${bgColorClass} ${colorClass}`}>
          <Icon size={18} />
        </div>
      </div>
      <span className="text-3xl font-black text-text-primary tracking-tighter">
        {value}
      </span>
    </div>
  );
};

