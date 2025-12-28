
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { AppState, AppActions } from '../types/AppState';
import type { JobApplication } from '../types/JobApplication';
import { getTodayISOString } from '../lib/dateUtils';

const useAppStore = create<AppState & AppActions>()(
  persist(
    (set) => ({
      applications: [],
      view: 'landing',
      searchQuery: '',
      statusFilter: 'all',
      isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,

      setView: (view) => set({ view }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setStatusFilter: (statusFilter) => set({ statusFilter }),
      setIsOnline: (isOnline) => set({ isOnline }),

      addApplication: (app) => set((state) => {
        const id = typeof crypto.randomUUID === 'function' 
          ? crypto.randomUUID() 
          : Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
          
        const newApp: JobApplication = {
          ...app,
          id,
          createdAt: getTodayISOString(),
          updatedAt: getTodayISOString(),
        };
        return { applications: [newApp, ...state.applications] };
      }),

      updateApplication: (id, updatedFields) => set((state) => ({
        applications: state.applications.map((app) => 
          app.id === id ? { ...app, ...updatedFields, updatedAt: getTodayISOString() } : app
        ),
      })),

      deleteApplication: (id) => set((state) => ({
        applications: state.applications.filter((app) => app.id !== id),
      })),

      resetData: () => set({ applications: [] }),

      importData: (data) => set({ applications: data }),
    }),
    {
      name: 'candinow-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAppStore;
