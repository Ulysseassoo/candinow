import { useMemo } from 'react';
import useAppStore from '@/stores/useStore';
import { calculateStats, generateChartData } from '@/lib/dashboardUtils';
import type { DashboardStats, ChartDataItem } from '@/lib/dashboardUtils';

export const useDashboard = () => {
  const { applications } = useAppStore();

  const stats: DashboardStats = useMemo(() => {
    return calculateStats(applications);
  }, [applications]);

  const chartData: ChartDataItem[] = useMemo(() => {
    return generateChartData(applications);
  }, [applications]);

  return {
    stats,
    chartData,
    applicationsCount: applications.length,
  };
};

