import moment from 'moment';
import type { JobApplication, AppStatus } from '../types/JobApplication';
import { getTodayISOString } from './dateUtils';

/**
 * Calculate the number of days until next follow-up based on follow-up count
 * - After application sent (count=0): +5 days
 * - After first follow-up (count=1): +5 days
 * - After second follow-up (count=2): +7 days
 * - After third follow-up (count=3): no more follow-ups
 */
export const getFollowUpDaysInterval = (followUpCount: number): number | null => {
  switch (followUpCount) {
    case 0:
      return 5; // First follow-up after 5 days
    case 1:
      return 5; // Second follow-up after 5 days
    case 2:
      return 7; // Third follow-up after 7 days
    default:
      return null; // No more follow-ups
  }
};

/**
 * Calculate the next follow-up date based on last action date and follow-up count
 */
export const calculateNextFollowUpDate = (
  lastActionDate: string,
  followUpCount: number
): string | null => {
  const daysInterval = getFollowUpDaysInterval(followUpCount);

  if (daysInterval === null) {
    return null; // No more follow-ups needed
  }

  return moment(lastActionDate).add(daysInterval, 'days').toISOString();
};

/**
 * Check if a follow-up is due (today or in the past)
 */
export const isFollowUpDue = (nextFollowUpDate: string | null | undefined): boolean => {
  if (!nextFollowUpDate) {
    return false;
  }

  const today = moment().startOf('day');
  const followUpDate = moment(nextFollowUpDate).startOf('day');

  return followUpDate.isSameOrBefore(today);
};

/**
 * Check if an application should stop follow-ups based on its status
 * Follow-ups stop when:
 * - Application receives a reply (status: interview, offer)
 * - Application is rejected
 * - Application is already ghosted
 */
export const shouldStopFollowUps = (status: AppStatus): boolean => {
  return ['interview', 'offer', 'rejected', 'ghosted'].includes(status);
};

/**
 * Handle "Follow-up sent" action
 * Returns updated application fields
 */
export const handleFollowUpSent = (
  application: JobApplication
): Partial<JobApplication> => {
  const currentCount = application.followUpCount ?? 0;
  const newCount = currentCount + 1;
  const lastActionDate = getTodayISOString();

  // Calculate next follow-up date
  const nextFollowUpDate = calculateNextFollowUpDate(lastActionDate, newCount);

  // If no more follow-ups, mark as ghosted
  if (nextFollowUpDate === null && newCount >= 3) {
    return {
      followUpCount: newCount,
      lastActionDate,
      nextFollowUpDate: null,
      status: 'ghosted',
      followUpStatus: 'done',
      followUpDate: lastActionDate,
      updatedAt: lastActionDate
    };
  }

  // Update follow-up tracking
  return {
    followUpCount: newCount,
    lastActionDate,
    nextFollowUpDate,
    status: 'follow_up',
    followUpStatus: 'done',
    followUpDate: lastActionDate,
    updatedAt: lastActionDate
  };
};

/**
 * Initialize follow-up tracking for a new application
 */
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

/**
 * Get applications that need follow-up today
 */
export const getApplicationsDueToday = (
  applications: JobApplication[]
): JobApplication[] => {
  return applications.filter(app => {
    // Don't include applications that should stop follow-ups
    if (shouldStopFollowUps(app.status)) {
      return false;
    }

    // Check if follow-up is due
    return isFollowUpDue(app.nextFollowUpDate);
  });
};

/**
 * Get days until next follow-up (negative if overdue)
 */
export const getDaysUntilFollowUp = (nextFollowUpDate: string | null | undefined): number | null => {
  if (!nextFollowUpDate) {
    return null;
  }

  const today = moment().startOf('day');
  const followUpDate = moment(nextFollowUpDate).startOf('day');

  return followUpDate.diff(today, 'days');
};
