import { Inbox, Timer, CheckCircle2, Ghost } from 'lucide-react';
import { StatCard } from './StatCard';
import { useTranslation } from '@/lib/i18n/context';
import type { DashboardStats } from '@/lib/dashboardUtils';

interface StatsGridProps {
  stats: DashboardStats;
}

export const StatsGrid = ({ stats }: StatsGridProps) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title={t('dashboard.totalApps')}
        value={stats.total}
        icon={Inbox}
        colorClass="text-primary-dark"
        bgColorClass="bg-primary-soft"
      />
      <StatCard
        title={t('dashboard.responseRate')}
        value={`${stats.responseRate}%`}
        icon={Timer}
        colorClass="text-[#D4A373]"
        bgColorClass="bg-warning-soft"
      />
      <StatCard
        title={t('dashboard.interviews')}
        value={stats.interviews}
        icon={CheckCircle2}
        colorClass="text-[#6A994E]"
        bgColorClass="bg-success-soft"
      />
      <StatCard
        title={t('dashboard.ghosted')}
        value={stats.ghosted}
        icon={Ghost}
        colorClass="text-text-secondary"
        bgColorClass="bg-primary-soft/30"
      />
    </div>
  );
};

