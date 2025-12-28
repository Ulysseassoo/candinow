import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { useSettings } from '@/hooks/useSettings';
import { DemoSection } from '@/components/settings/DemoSection';
import { PrivacySection } from '@/components/settings/PrivacySection';
import { ExportSection } from '@/components/settings/ExportSection';
import { ImportSection } from '@/components/settings/ImportSection';
import { DangerSection } from '@/components/settings/DangerSection';
import { StorageSection } from '@/components/settings/StorageSection';

export const Route = createFileRoute('/app/settings')({
  component: SettingsPage,
});

function SettingsPage() {
  const {
    applications,
    fileInputRef,
    isLoading,
    storageUsage,
    handleGenerateTestData,
    handleExportJSON,
    handleExportCSV,
    handleImport,
    handleReset,
    triggerFileInput,
  } = useSettings();

  const isDev = import.meta.env.DEV;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-3xl mx-auto space-y-8 pb-12"
    >
      {isDev && <DemoSection onGenerate={handleGenerateTestData} isLoading={isLoading} />}
      
      <PrivacySection />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ExportSection onExportJSON={handleExportJSON} onExportCSV={handleExportCSV} />
        <ImportSection 
          fileInputRef={fileInputRef}
          onImport={handleImport}
          onTriggerClick={triggerFileInput}
          isLoading={isLoading}
        />
      </div>

      <DangerSection applicationsCount={applications.length} onReset={handleReset} />

      <StorageSection usage={storageUsage} />
    </motion.div>
  );
}
