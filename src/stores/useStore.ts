
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { AppState, AppActions } from '../types/AppState';
import type { JobApplication } from '../types/JobApplication';
import { getTodayISOString } from '../lib/dateUtils';
import { initializeFollowUpTracking, handleFollowUpSent } from '../lib/followUpUtils';
import { defaultTheme, getTheme, applyTheme } from '../lib/themes';

const useAppStore = create<AppState & AppActions>()(
  persist(
    (set) => ({
      applications: [],
      view: 'landing',
      searchQuery: '',
      statusFilter: 'all',
      isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
      theme: defaultTheme,

      setView: (view) => set({ view }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setStatusFilter: (statusFilter) => set({ statusFilter }),
      setIsOnline: (isOnline) => set({ isOnline }),
      setTheme: (themeName) => {
        const theme = getTheme(themeName);
        applyTheme(theme);
        set({ theme: themeName });
      },

      addApplication: (app) => set((state) => {
        const id = typeof crypto.randomUUID === 'function'
          ? crypto.randomUUID()
          : Math.random().toString(36).substring(2, 11) + Date.now().toString(36);

        const followUpTracking = initializeFollowUpTracking(app.appliedAt);

        const newApp: JobApplication = {
          ...app,
          ...followUpTracking,
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

      sendFollowUp: (id) => set((state) => ({
        applications: state.applications.map((app) => {
          if (app.id === id) {
            const followUpUpdates = handleFollowUpSent(app);
            return { ...app, ...followUpUpdates };
          }
          return app;
        }),
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
      onRehydrateStorage: () => (state) => {
        if (state?.theme) {
          let themeName: string = state.theme;
          if (themeName === 'professional') {
            themeName = 'corporate';
          } else if (themeName === 'minimal') {
            themeName = 'classic';
          }
          
          const theme = getTheme(themeName);
          applyTheme(theme);
          
          if (themeName !== state.theme && (themeName === 'corporate' || themeName === 'classic')) {
            state.theme = themeName;
          }
        }
      },
    }
  )
);

export default useAppStore;
