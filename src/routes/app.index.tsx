import { AppForm } from '@/components/AppForm';
import { ApplicationCard } from '@/components/ApplicationCard';
import { ApplicationDetail } from '@/components/ApplicationDetail';
import DesktopTable from '@/components/DesktopTable';
import { FeedbackForm } from '@/components/FeedbackForm';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { STATUS_CONFIG } from '@/constants';
import useAppStore from '@/stores/useStore';
import type { AppStatus, JobApplication } from '@/types/JobApplication';
import { createFileRoute } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpDown, Filter, Flower2, Plus, RotateCcw, Search } from 'lucide-react';
import { useState } from 'react';
import { useMemo } from 'react';
import moment from 'moment';
import { FloatingActionMenu } from '@/components/FloatingActionMenu';

type SortOption = 'newest' | 'oldest' | 'company' | 'title';

export const Route = createFileRoute('/app/')({
  component: ApplicationsListPage,
});

function ApplicationsListPage() {
  const {
    applications,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    addApplication,
    updateApplication,
    deleteApplication
  } = useAppStore();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<JobApplication | null>(null);
  const [viewingApp, setViewingApp] = useState<JobApplication | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  const filteredAndSortedApps = useMemo(() => {
    let result = applications.filter((application) => {
      const matchesSearch =
        application.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        application.company.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || application.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    return result.sort((a, b) => {
      if (sortBy === 'newest') return moment(b.appliedAt).valueOf() - moment(a.appliedAt).valueOf();
      if (sortBy === 'oldest') return moment(a.appliedAt).valueOf() - moment(b.appliedAt).valueOf();
      if (sortBy === 'company') return a.company.localeCompare(b.company);
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0;
    });
  }, [applications, searchQuery, statusFilter, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
  };

  const selectClasses = "appearance-none bg-white border border-border px-10 py-3.5 rounded-full text-[11px] font-black text-text-primary uppercase tracking-widest focus:ring-4 focus:ring-primary/5 focus:border-primary/50 transition-all outline-none cursor-pointer shadow-soft w-full sm:w-auto";

  return (
    <div className="space-y-8 pb-32">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col gap-6"
      >
        {applications.length > 0 && (
          <>
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-text-secondary/40 group-focus-within:text-primary transition-colors" size={20} />
              <Input
                placeholder="Rechercher un poste ou une entreprise..."
                className="pl-14 py-5"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-full sm:w-auto">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-primary opacity-40 pointer-events-none" size={16} />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as AppStatus | 'all')}
                  className={selectClasses}
                >
                  <option value="all">Tous les Statuts</option>
                  {(Object.keys(STATUS_CONFIG) as (keyof typeof STATUS_CONFIG)[]).filter(k => k !== 'all').map((key) => (
                    <option key={key} value={key}>{STATUS_CONFIG[key].label}</option>
                  ))}
                </select>
              </div>

              <div className="relative w-full sm:w-auto">
                <ArrowUpDown className="absolute left-4 top-1/2 -translate-y-1/2 text-primary opacity-40 pointer-events-none" size={16} />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className={selectClasses}
                >
                  <option value="newest">Plus récents</option>
                  <option value="company">Entreprise (A-Z)</option>
                </select>
              </div>
            </div>
          </>
        )}
      </motion.div>

      <AnimatePresence mode="wait">
        {filteredAndSortedApps.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="soft-card p-12 lg:p-20 text-center flex flex-col items-center gap-6"
          >
            <div className="w-24 h-24 bg-primary-soft rounded-[32px] flex items-center justify-center text-primary transform -rotate-6 shadow-inner">
              <Flower2 size={48} strokeWidth={1.5} />
            </div>
            <div className="max-w-md space-y-2">
              <h3 className="text-2xl font-black text-text-primary tracking-tight">
                {applications.length === 0 ? "Ton jardin est prêt à fleurir" : "Aucun résultat trouvé"}
              </h3>
              <p className="text-text-secondary font-semibold text-sm leading-relaxed">
                {applications.length === 0
                  ? "Commence à suivre tes candidatures pour ne rater aucune opportunité."
                  : "Ajuste tes filtres pour retrouver tes candidatures."}
              </p>
            </div>
            {applications.length === 0 ? (
              <Button size="lg" onClick={() => setIsAddModalOpen(true)}>
                <Plus size={18} className="mr-2" /> Ajouter ma première candidature
              </Button>
            ) : (
              <Button variant="outline" size="lg" onClick={handleResetFilters}>
                <RotateCcw size={16} className="mr-2" /> Réinitialiser
              </Button>
            )}
          </motion.div>
        ) : (
          <div key="content">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-6">
              {filteredAndSortedApps.map(app => (
                <ApplicationCard key={app.id} app={app} setViewingApp={setViewingApp} setEditingApp={setEditingApp} deleteApplication={deleteApplication} />
              ))}
            </div>

            <DesktopTable filteredAndSortedApps={filteredAndSortedApps} setViewingApp={setViewingApp} setEditingApp={setEditingApp} deleteApplication={deleteApplication} />
          </div>
        )}
      </AnimatePresence>

      <FloatingActionMenu
        onAddClick={() => setIsAddModalOpen(true)}
        onFeedbackClick={() => setIsFeedbackModalOpen(true)}
        hasApplications={applications.length > 0}
      />

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Nouvelle candidature">
        <AppForm onSubmit={(data) => { addApplication(data); setIsAddModalOpen(false); }} onCancel={() => setIsAddModalOpen(false)} />
      </Modal>
      <Modal isOpen={!!editingApp} onClose={() => setEditingApp(null)} title="Modifier">
        {editingApp && <AppForm initialData={editingApp} onSubmit={(data) => { updateApplication(editingApp.id, data); setEditingApp(null); }} onCancel={() => setEditingApp(null)} />}
      </Modal>
      <Modal isOpen={!!viewingApp} onClose={() => setViewingApp(null)} title="Détails">
        {viewingApp && <ApplicationDetail app={viewingApp} onClose={() => setViewingApp(null)} onEdit={() => { setEditingApp(viewingApp); setViewingApp(null); }} />}
      </Modal>
      <Modal isOpen={isFeedbackModalOpen} onClose={() => setIsFeedbackModalOpen(false)} title="Ton avis">
        <FeedbackForm onClose={() => setIsFeedbackModalOpen(false)} />
      </Modal>
    </div>
  );
}
