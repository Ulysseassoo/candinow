import { useRef, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import useAppStore from '@/stores/useStore';
import { generateTestApplications } from '@/constants/testData';
import { exportToJSON, exportToCSV } from '@/lib/exportUtils';
import { parseJSONFile } from '@/lib/importUtils';

export const useSettings = () => {
  const { applications, resetData, importData } = useAppStore();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateTestData = async () => {
    if (!window.confirm("Voulez-vous générer 50 candidatures de test ? Vos données actuelles seront remplacées.")) {
      return;
    }

    try {
      setIsLoading(true);
      const testApps = generateTestApplications(50);
      importData(testApps);
      navigate({ to: '/app' });
    } catch (error) {
      console.error("Erreur lors de la génération :", error);
      alert("Une erreur est survenue lors de la génération des données.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportJSON = () => {
    exportToJSON(applications);
  };

  const handleExportCSV = () => {
    exportToCSV(applications);
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      const importedData = await parseJSONFile(file);
      importData(importedData);
      alert('Données importées avec succès !');
      navigate({ to: '/app' });
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Erreur lors de l\'importation.');
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleReset = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer toutes vos données ? Cette action est irréversible.')) {
      resetData();
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const storageUsage = Math.min(100, (applications.length / 500) * 100);

  return {
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
  };
};

