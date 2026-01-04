import axios from 'axios';

export interface JobLinkImportData {
  title?: string;
  company?: string;
  location?: string;
  domain?: string;
  source?: string;
  description?: string;
  salary?: string;
}

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

export const importJobFromLink = async (url: string): Promise<JobLinkImportData> => {
  if (!BACKEND_API_URL) {
    throw new Error('Configuration API manquante');
  }

  try {
    const response = await axios.post(
      `${BACKEND_API_URL}/api/scrape`,
      { url },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.error || error.message || 'Erreur lors de l\'import du lien';
      throw new Error(errorMessage);
    }
    throw new Error('Erreur inconnue lors de l\'import du lien');
  }
};
