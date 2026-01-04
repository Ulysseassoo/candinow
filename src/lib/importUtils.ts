import type { JobApplication } from '@/types/JobApplication';

export const parseJSONFile = async (file: File): Promise<JobApplication[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const result = event.target?.result;
        if (typeof result !== 'string') {
          reject(new Error('Erreur lors de la lecture du fichier'));
          return;
        }
        const json = JSON.parse(result);
        if (Array.isArray(json)) {
          resolve(json);
        } else {
          reject(new Error('Le fichier doit contenir un tableau de candidatures'));
        }
      } catch (error) {
        reject(new Error('Erreur lors de la lecture du fichier JSON'));
      }
    };
    
    reader.onerror = () => reject(new Error('Erreur lors de la lecture du fichier'));
    reader.readAsText(file);
  });
};

export const validateJobApplication = (data: unknown): data is JobApplication[] => {
  if (!Array.isArray(data)) return false;
  
  return data.every(item => 
    typeof item === 'object' &&
    item !== null &&
    'id' in item &&
    'title' in item &&
    'company' in item &&
    'status' in item &&
    'appliedAt' in item
  );
};

