import type { AppStatus } from '@/types/JobApplication';

export const CHART_COLORS: Record<AppStatus, string> = {
  applied: '#F06292',
  follow_up: '#D4A373',
  interview: '#6A994E',
  offer: '#386641',
  rejected: '#BC4749',
  ghosted: '#9A9EB3',
};

