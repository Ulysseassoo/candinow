import type { AppStatus, JobApplication } from "./JobApplication";

export interface AppState {
    applications: JobApplication[];
    view: 'landing' | 'list' | 'dashboard' | 'settings';
    searchQuery: string;
    statusFilter: AppStatus | 'all';
  }
  
  export interface AppActions {
    addApplication: (app: Omit<JobApplication, 'id' | 'createdAt' | 'updatedAt'>) => void;
    updateApplication: (id: string, app: Partial<JobApplication>) => void;
    deleteApplication: (id: string) => void;
    setView: (view: AppState['view']) => void;
    setSearchQuery: (query: string) => void;
    setStatusFilter: (filter: AppState['statusFilter']) => void;
    resetData: () => void;
    importData: (data: JobApplication[]) => void;
  }
  