import { createFileRoute } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import useAppStore from '@/stores/useStore';
import { TodaysActions } from '@/components/TodaysActions';
import { FloatingActionMenu } from '@/components/FloatingActionMenu';
import { Modal } from '@/components/Modal';
import { AppForm } from '@/components/AppForm';
import { getApplicationsDueToday, getDaysUntilFollowUp } from '@/lib/followUpUtils';
import { useTranslation } from '@/lib/i18n/context';
import { AlertCircle, Calendar, CheckCircle, Clock, TrendingUp, Zap } from 'lucide-react';
import type { JobApplication } from '@/types/JobApplication';

export const Route = createFileRoute('/app/actions')({
  component: ActionsPage,
});

function ActionsPage() {
  const { t } = useTranslation();
  const { applications, addApplication, sendFollowUp } = useAppStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  // @ts-ignore
  const [viewingApp, setViewingApp] = useState<JobApplication | null>(null);
  const [filterView, setFilterView] = useState<'all' | 'today' | 'overdue'>('all');

  const dueApplications = getApplicationsDueToday(applications);

  const stats = useMemo(() => {
    const overdueApps = dueApplications.filter(app => {
      const days = getDaysUntilFollowUp(app.nextFollowUpDate);
      return days !== null && days < 0;
    });

    const upcomingApps = applications.filter(app => {
      if (!app.nextFollowUpDate) return false;
      const days = getDaysUntilFollowUp(app.nextFollowUpDate);
      return days !== null && days > 0 && days <= 7;
    });

    const activeFollowUps = applications.filter(app =>
      app.followUpCount !== undefined && app.followUpCount > 0 && app.followUpCount < 3
    );

    return {
      dueToday: dueApplications.length,
      overdue: overdueApps.length,
      upcoming: upcomingApps.length,
      activeFollowUps: activeFollowUps.length,
    };
  }, [applications, dueApplications]);

  const filteredApplications = useMemo(() => {
    if (filterView === 'today') {
      return dueApplications.filter(app => {
        const days = getDaysUntilFollowUp(app.nextFollowUpDate);
        return days === null || days >= 0;
      });
    }
    if (filterView === 'overdue') {
      return dueApplications.filter(app => {
        const days = getDaysUntilFollowUp(app.nextFollowUpDate);
        return days !== null && days < 0;
      });
    }
    return dueApplications;
  }, [dueApplications, filterView]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-8 pb-32"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            icon={AlertCircle}
            label={t('app.actionsToday')}
            value={stats.dueToday}
            color="warning"
            isActive={filterView === 'today'}
            onClick={() => setFilterView('today')}
          />
          <StatsCard
            icon={Clock}
            label={t('app.actionsOverdue')}
            value={stats.overdue}
            color="danger"
            isActive={filterView === 'overdue'}
            onClick={() => setFilterView('overdue')}
          />
          <StatsCard
            icon={Calendar}
            label={t('app.actionsThisWeek')}
            value={stats.upcoming}
            color="info"
            isActive={false}
            onClick={() => {}}
          />
          <StatsCard
            icon={TrendingUp}
            label={t('app.actionsInProgress')}
            value={stats.activeFollowUps}
            color="success"
            isActive={false}
            onClick={() => {}}
          />
        </div>

        {dueApplications.length > 0 && (
          <div className="flex items-center gap-3 flex-wrap">
            <FilterButton
              label={t('app.actionsAll')}
              count={dueApplications.length}
              isActive={filterView === 'all'}
              onClick={() => setFilterView('all')}
            />
            <FilterButton
              label={t('app.actionsToday')}
              count={stats.dueToday - stats.overdue}
              isActive={filterView === 'today'}
              onClick={() => setFilterView('today')}
            />
            <FilterButton
              label={t('app.actionsOverdue')}
              count={stats.overdue}
              isActive={filterView === 'overdue'}
              onClick={() => setFilterView('overdue')}
              variant="danger"
            />
          </div>
        )}

        <AnimatePresence mode="wait">
          {filteredApplications.length === 0 ? (
            <motion.div
              key={`empty-${filterView}`}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="soft-card p-12 lg:p-20 text-center flex flex-col items-center gap-6"
            >
              <div className="w-24 h-24 bg-success-soft rounded-[32px] flex items-center justify-center text-success transform -rotate-6 shadow-inner">
                <CheckCircle size={48} strokeWidth={1.5} />
              </div>
              <div className="max-w-md space-y-2">
                <h3 className="text-2xl font-black text-text-primary tracking-tight">
                  {filterView === 'all'
                    ? t('app.actionsNoActionRequired')
                    : filterView === 'today'
                    ? t('app.actionsNoActionsToday')
                    : t('app.actionsNoOverdue')}
                </h3>
                <p className="text-text-secondary font-semibold text-sm leading-relaxed">
                  {filterView === 'all'
                    ? t('app.actionsAllUpToDate')
                    : t('app.actionsChangeFilter')}
                </p>
              </div>
              {filterView !== 'all' && (
                <button
                  onClick={() => setFilterView('all')}
                  className="text-primary font-bold text-sm hover:underline"
                >
                  {t('app.actionsSeeAll')}
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key={`content-${filterView}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <TodaysActions
                applications={filteredApplications}
                sendFollowUp={sendFollowUp}
                setViewingApp={setViewingApp}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {dueApplications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="soft-card p-6 bg-primary-soft/30 border border-primary/10"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Zap size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-black text-sm text-text-primary mb-1">
                  {t('app.actionsTip')}
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {t('app.actionsTipMessage')}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      <FloatingActionMenu onAddClick={() => setIsAddModalOpen(true)} />

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={t('app.modalNewApplication')}
      >
        <AppForm
          onSubmit={(data) => {
            addApplication(data);
            setIsAddModalOpen(false);
          }}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>
    </>
  );
}

interface StatsCardProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: number;
  color: 'warning' | 'danger' | 'info' | 'success';
  isActive: boolean;
  onClick: () => void;
}

const StatsCard = ({ icon: Icon, label, value, color, isActive, onClick }: StatsCardProps) => {
  const colorClasses = {
    warning: 'bg-warning-soft text-warning border-warning/20',
    danger: 'bg-danger-soft text-danger border-danger/20',
    info: 'bg-blue-50 text-blue-600 border-blue-200',
    success: 'bg-success-soft text-success border-success/20',
  };

  const activeClasses = isActive
    ? 'ring-2 ring-primary/30 scale-105'
    : 'hover:scale-102';

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`soft-card p-4 lg:p-6 flex flex-col gap-3 transition-all duration-300 ${activeClasses} ${
        isActive ? 'bg-primary-soft/20' : ''
      }`}
    >
      <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-2xl flex items-center justify-center ${colorClasses[color]}`}>
        <Icon size={20} className={colorClasses[color].split(' ')[1]} />
      </div>
      <div className="text-left">
        <div className="text-2xl lg:text-3xl font-black text-text-primary">
          {value}
        </div>
        <div className="text-[10px] lg:text-xs font-bold text-text-secondary uppercase tracking-wider mt-1">
          {label}
        </div>
      </div>
    </motion.button>
  );
};

interface FilterButtonProps {
  label: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
  variant?: 'default' | 'danger';
}

const FilterButton = ({ label, count, isActive, onClick, variant = 'default' }: FilterButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`px-5 py-2.5 rounded-full text-sm font-black uppercase tracking-wider transition-all border-2 ${
        isActive
          ? variant === 'danger'
            ? 'bg-danger text-white border-danger shadow-md'
            : 'bg-primary text-white border-primary shadow-md'
          : variant === 'danger'
          ? 'bg-danger-soft/30 text-danger border-danger/20 hover:bg-danger-soft'
          : 'bg-background text-text-secondary border-border hover:border-primary/30 hover:text-primary'
      }`}
    >
      {label} <span className="ml-1.5 opacity-70">({count})</span>
    </motion.button>
  );
};
