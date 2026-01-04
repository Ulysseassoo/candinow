export type AppStatus = 'applied' | 'follow_up' | 'interview' | 'offer' | 'rejected' | 'ghosted';

export type FollowUpStatus = 'none' | 'due' | 'planned' | 'done' | 'contacted' | 'awaiting' | 'responded';

export type ContactMethod = 'email' | 'phone';

export interface JobApplication {
    id: string;
    title: string;
    company: string;
    status: AppStatus;
    appliedAt: string;
    source?: string;
    jobLink?: string;
    location?: string;
    domain?: string;

    followUpStatus?: FollowUpStatus;
    followUpDate?: string;
    reminderAt?: string;
    followUpCount?: number;
    lastActionDate?: string;
    nextFollowUpDate?: string | undefined;

    contactName?: string;
    contactEmail?: string;
    contactPhone?: string;
    contactMethod?: ContactMethod;

    interviewDate?: string;
    description?: string;
    salary?: string;
    notes?: string;

    createdAt: string;
    updatedAt: string;
}