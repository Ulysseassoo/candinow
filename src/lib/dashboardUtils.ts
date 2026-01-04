import type { JobApplication, AppStatus } from '@/types/JobApplication';
import { STATUS_CONFIG } from '@/constants';

export interface DashboardStats {
  total: number;
  interviews: number;
  ghosted: number;
  offers: number;
  responseRate: number;
}

export const calculateStats = (applications: JobApplication[]): DashboardStats => {
  const total = applications.length;
  const interviews = applications.filter(a => a.status === 'interview').length;
  const ghosted = applications.filter(a => a.status === 'ghosted').length;
  const offers = applications.filter(a => a.status === 'offer').length;
  
  const responseRate = total > 0
    ? Math.round((applications.filter(a => !['applied', 'ghosted'].includes(a.status)).length / total) * 100)
    : 0;

  return {
    total,
    interviews,
    ghosted,
    offers,
    responseRate,
  };
};

export interface ChartDataItem extends Record<string, unknown> {
  name: string;
  value: number;
  key: AppStatus;
}

export const generateChartData = (applications: JobApplication[]): ChartDataItem[] => {
  const statusKeys: AppStatus[] = ['applied', 'follow_up', 'interview', 'offer', 'rejected', 'ghosted'];
  return statusKeys.map(statusKey => ({
    name: STATUS_CONFIG[statusKey].label,
    value: applications.filter(a => a.status === statusKey).length,
    key: statusKey,
  }));
};

