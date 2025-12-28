import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { useDashboard } from '@/hooks/useDashboard';
import { StatsGrid } from '@/components/dashboard/StatsGrid';
import { BarChartSection } from '@/components/dashboard/BarChartSection';
import { PieChartSection } from '@/components/dashboard/PieChartSection';

export const Route = createFileRoute('/app/dashboard')({
  component: DashboardPage,
});

function DashboardPage() {
  const { stats, chartData } = useDashboard();

  return (
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
  );
}
