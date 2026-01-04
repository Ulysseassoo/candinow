import type { AppStatus, JobApplication } from "./JobApplication";
import type { ThemeName } from "../lib/themes";

export interface AppState {
    applications: JobApplication[];
    view: 'landing' | 'list' | 'dashboard' | 'settings' | 'feedback';
    searchQuery: string;
    statusFilter: AppStatus | 'all';
    isOnline: boolean;
    theme: ThemeName;
  }
  
  export interface AppActions {
    addApplication: (app: Omit<JobApplication, 'id' | 'createdAt' | 'updatedAt'>) => void;
    updateApplication: (id: string, app: Partial<JobApplication>) => void;
    deleteApplication: (id: string) => void;
    sendFollowUp: (id: string) => void;
    setView: (view: AppState['view']) => void;
    setSearchQuery: (query: string) => void;
    setStatusFilter: (filter: AppState['statusFilter']) => void;
    setTheme: (theme: ThemeName) => void;
    resetData: () => void;
    importData: (data: JobApplication[]) => void;
    setIsOnline: (isOnline: boolean) => void;
  }
  