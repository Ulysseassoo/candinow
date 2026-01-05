import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useDashboard } from '@/hooks/useDashboard';
import { StatsGrid } from '@/components/dashboard/StatsGrid';
import { BarChartSection } from '@/components/dashboard/BarChartSection';
import { PieChartSection } from '@/components/dashboard/PieChartSection';
import { FloatingActionMenu } from '@/components/FloatingActionMenu';
import { Modal } from '@/components/Modal';
import { AppForm } from '@/components/AppForm';
import useAppStore from '@/stores/useStore';
import { useTranslation } from '@/lib/i18n/context';

export const Route = createFileRoute('/app/dashboard')({
  component: DashboardPage,
});

function DashboardPage() {
  const { t } = useTranslation();
  const { stats, chartData } = useDashboard();
  const { addApplication } = useAppStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-8"
      >
        <StatsGrid stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <BarChartSection data={chartData} />
          <PieChartSection data={chartData} />
        </div>
      </motion.div>

      <FloatingActionMenu
        onAddClick={() => setIsAddModalOpen(true)}
      />

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title={t('app.modalNewApplication')}>
        <AppForm onSubmit={(data) => { addApplication(data); setIsAddModalOpen(false); }} onCancel={() => setIsAddModalOpen(false)} />
      </Modal>
    </>
  );
}
