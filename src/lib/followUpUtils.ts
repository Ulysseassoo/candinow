import moment from 'moment';
import type { JobApplication, AppStatus } from '../types/JobApplication';
import { getTodayISOString } from './dateUtils';

export const getFollowUpDaysInterval = (followUpCount: number): number | null => {
  switch (followUpCount) {
    case 0:
      return 5;
    case 1:
      return 5;
    case 2:
      return 7;
    default:
      return null;
  }
};

export const calculateNextFollowUpDate = (
  lastActionDate: string,
  followUpCount: number
): string | null => {
  const daysInterval = getFollowUpDaysInterval(followUpCount);

  if (daysInterval === null) {
    return null;
  }

  return moment(lastActionDate).add(daysInterval, 'days').toISOString();
};

export const isFollowUpDue = (nextFollowUpDate: string | null | undefined): boolean => {
  if (!nextFollowUpDate) {
    return false;
  }

  const today = moment().startOf('day');
  const followUpDate = moment(nextFollowUpDate).startOf('day');

  return followUpDate.isSameOrBefore(today);
};

export const shouldStopFollowUps = (status: AppStatus): boolean => {
  return ['interview', 'offer', 'rejected', 'ghosted'].includes(status);
};

export const handleFollowUpSent = (
  application: JobApplication
): Partial<JobApplication> => {
  const currentCount = application.followUpCount ?? 0;
  const newCount = currentCount + 1;
  const lastActionDate = getTodayISOString();

  const nextFollowUpDate = calculateNextFollowUpDate(lastActionDate, newCount);

  if (nextFollowUpDate === null && newCount >= 3) {
    return {
      followUpCount: newCount,
      lastActionDate,
      nextFollowUpDate: undefined,
      status: 'ghosted',
      followUpStatus: 'done',
      followUpDate: lastActionDate,
      updatedAt: lastActionDate
    };
  }

  return {
    followUpCount: newCount,
    lastActionDate,
    nextFollowUpDate: nextFollowUpDate ?? undefined,
    status: 'follow_up',
    followUpStatus: 'done',
    followUpDate: lastActionDate,
    updatedAt: lastActionDate
  };
};

export const initializeFollowUpTracking = (
  appliedAt: string
): Partial<JobApplication> => {
  const lastActionDate = appliedAt;
  const followUpCount = 0;
  const nextFollowUpDate = calculateNextFollowUpDate(lastActionDate, followUpCount);

  return {
    followUpCount,
    lastActionDate,
    nextFollowUpDate,
    followUpStatus: nextFollowUpDate ? 'planned' : 'none'
  };
};

export const getApplicationsDueToday = (
  applications: JobApplication[]
): JobApplication[] => {
  return applications.filter(app => {
    if (shouldStopFollowUps(app.status)) {
      return false;
    }

    return isFollowUpDue(app.nextFollowUpDate);
  });
};

export const getDaysUntilFollowUp = (nextFollowUpDate: string | null | undefined): number | null => {
  if (!nextFollowUpDate) {
    return null;
  }

  const today = moment().startOf('day');
  const followUpDate = moment(nextFollowUpDate).startOf('day');

  return followUpDate.diff(today, 'days');
};
