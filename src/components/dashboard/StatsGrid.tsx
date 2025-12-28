import { Inbox, Timer, CheckCircle2, Ghost } from 'lucide-react';
import { StatCard } from './StatCard';
import type { DashboardStats } from '@/lib/dashboardUtils';

interface StatsGridProps {
  stats: DashboardStats;
}

export const StatsGrid = ({ stats }: StatsGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard 
        title="Total Apps" 
        value={stats.total} 
        icon={Inbox} 
        colorClass="text-primary-dark" 
        bgColorClass="bg-primary-soft" 
      />
      <StatCard 
        title="Taux Réponse" 
        value={`${stats.responseRate}%`} 
        icon={Timer} 
        colorClass="text-[#D4A373]" 
        bgColorClass="bg-warning-soft" 
      />
      <StatCard 
        title="Entretiens" 
        value={stats.interviews} 
        icon={CheckCircle2} 
        colorClass="text-[#6A994E]" 
        bgColorClass="bg-success-soft" 
      />
      <StatCard 
        title="Silence" 
        value={stats.ghosted} 
        icon={Ghost} 
        colorClass="text-text-secondary" 
        bgColorClass="bg-gray-50" 
      />
    </div>
  );
};

