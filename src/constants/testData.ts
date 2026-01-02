import type { AppStatus, FollowUpStatus, JobApplication } from '@/types/JobApplication';
import { getTodayISOString } from '@/lib/dateUtils';
import moment from 'moment';
import { calculateNextFollowUpDate } from '@/lib/followUpUtils';

export const TEST_COMPANIES = [
  'Google', 'Meta', 'Apple', 'Blossom Soft', 'Airbnb', 'Stripe', 'Mistral AI', 'Station F', 
  'Veepee', 'LVMH', 'Deezer', 'Alan', 'Back Market', 'Qonto', 'PayFit', 'Doctolib', 'ManoMano',
  'Mirakl', 'ContentSquare', 'Dataiku', 'Spendesk', 'Lydia', 'Swile', 'BlaBlaCar'
] as const;

export const TEST_TITLES = [
  'Senior Product Designer', 'Front-end Engineer', 'React Developer', 'Fullstack JS', 
  'UX Researcher', 'Product Manager', 'Mobile Engineer', 'CTO', 'Lead Dev', 'UI Designer',
  'Engineering Manager', 'Solutions Architect', 'Data Scientist', 'DevOps Specialist'
] as const;

export const TEST_LOCATIONS = ['Paris', 'Lyon', 'Remote', 'London', 'Berlin', 'New York', 'Bordeaux'] as const;

export const TEST_STATUSES: AppStatus[] = ['applied', 'follow_up', 'interview', 'offer', 'rejected', 'ghosted'];

export const TEST_FOLLOW_UP_STATUSES: FollowUpStatus[] = ['none', 'due', 'planned', 'done', 'contacted', 'awaiting', 'responded'];

export const generateTestApplication = (index: number): JobApplication => {
  const company = TEST_COMPANIES[Math.floor(Math.random() * TEST_COMPANIES.length)];
  const title = TEST_TITLES[Math.floor(Math.random() * TEST_TITLES.length)];
  const status = TEST_STATUSES[Math.floor(Math.random() * TEST_STATUSES.length)];

  const daysAgo = Math.floor(Math.random() * 30);
  const appliedDate = moment().subtract(daysAgo, 'days').format('YYYY-MM-DD');

  const id = typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : Math.random().toString(36).substring(2, 11) + Date.now().toString(36);

  const now = getTodayISOString();

  // Generate follow-up tracking for some applications
  let followUpTracking = {};

  // Create different follow-up scenarios
  const scenario = index % 10; // Use index to create predictable scenarios

  if (status === 'applied' || status === 'follow_up') {
    if (scenario === 0 || scenario === 1) {
      // Scenario 1 & 2: Follow-up due today (20% of applied/follow_up apps)
      const lastActionDate = moment().subtract(5, 'days').toISOString();
      followUpTracking = {
        followUpCount: 0,
        lastActionDate,
        nextFollowUpDate: moment().toISOString(), // Due today
        followUpStatus: 'due',
      };
    } else if (scenario === 2 || scenario === 3) {
      // Scenario 3 & 4: Follow-up overdue (20% of applied/follow_up apps)
      const daysOverdue = Math.floor(Math.random() * 3) + 1; // 1-3 days overdue
      const lastActionDate = moment().subtract(5 + daysOverdue, 'days').toISOString();
      followUpTracking = {
        followUpCount: 0,
        lastActionDate,
        nextFollowUpDate: moment().subtract(daysOverdue, 'days').toISOString(), // Overdue
        followUpStatus: 'due',
      };
    } else if (scenario === 4) {
      // Scenario 5: Second follow-up due today (10%)
      const lastActionDate = moment().subtract(5, 'days').toISOString();
      followUpTracking = {
        followUpCount: 1,
        lastActionDate,
        nextFollowUpDate: moment().toISOString(), // Second follow-up due today
        followUpStatus: 'contacted',
      };
    } else if (scenario === 5) {
      // Scenario 6: Third (final) follow-up due today (10%)
      const lastActionDate = moment().subtract(7, 'days').toISOString();
      followUpTracking = {
        followUpCount: 2,
        lastActionDate,
        nextFollowUpDate: moment().toISOString(), // Final follow-up due today
        followUpStatus: 'contacted',
      };
    } else if (scenario === 6 || scenario === 7) {
      // Scenario 7 & 8: Follow-up coming soon (not due yet) (20%)
      const daysUntilDue = Math.floor(Math.random() * 3) + 1; // 1-3 days away
      const lastActionDate = moment().subtract(5 - daysUntilDue, 'days').toISOString();
      const nextFollowUpDate = calculateNextFollowUpDate(lastActionDate, 0);
      followUpTracking = {
        followUpCount: 0,
        lastActionDate,
        nextFollowUpDate,
        followUpStatus: 'planned',
      };
    } else {
      // Scenario 9 & 10: Normal tracking, first follow-up in future (20%)
      const lastActionDate = moment(appliedDate).toISOString();
      const nextFollowUpDate = calculateNextFollowUpDate(lastActionDate, 0);
      followUpTracking = {
        followUpCount: 0,
        lastActionDate,
        nextFollowUpDate,
        followUpStatus: 'none',
      };
    }
  }

  return {
    id,
    title: `${title} #${index + 1}`,
    company,
    status,
    appliedAt: appliedDate,
    location: TEST_LOCATIONS[Math.floor(Math.random() * TEST_LOCATIONS.length)],
    domain: index % 2 === 0 ? 'Tech' : 'Design',
    jobLink: `https://example.com/jobs/${id}`,
    followUpStatus: TEST_FOLLOW_UP_STATUSES[Math.floor(Math.random() * TEST_FOLLOW_UP_STATUSES.length)],
    contactName: 'Jean Dupont',
    contactEmail: `contact@${company.toLowerCase().replace(/\s/g, '')}.com`,
    contactMethod: 'email',
    notes: index % 3 === 0 ? "Entretien technique très intéressant, l'équipe a l'air sympa." : undefined,
    createdAt: now,
    updatedAt: now,
    ...followUpTracking,
  };
};

export const generateTestApplications = (count: number = 50): JobApplication[] => {
  return Array.from({ length: count }, (_, i) => generateTestApplication(i));
};

