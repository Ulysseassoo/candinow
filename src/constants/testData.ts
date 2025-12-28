import type { AppStatus, FollowUpStatus, JobApplication } from '@/types/JobApplication';
import { getTodayISOString } from '@/lib/dateUtils';
import moment from 'moment';

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
  };
};

export const generateTestApplications = (count: number = 50): JobApplication[] => {
  return Array.from({ length: count }, (_, i) => generateTestApplication(i));
};

