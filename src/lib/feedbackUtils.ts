import axios from 'axios';

export interface FeedbackData {
  name: string;
  type: 'feature' | 'bug' | 'love';
  message: string;
}

export const sendFeedbackEmail = async (data: FeedbackData): Promise<void> => {
  try {
    await axios.post('/api/feedback', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.error || error.message || 'Erreur lors de l\'envoi du feedback';
      throw new Error(errorMessage);
    }
    throw new Error('Erreur inconnue lors de l\'envoi du feedback');
  }
};
