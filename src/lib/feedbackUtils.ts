export interface FeedbackData {
  type: 'feature' | 'bug' | 'love';
  message: string;
}

export const sendFeedbackEmail = async (data: FeedbackData): Promise<void> => {
  const response = await fetch('/api/feedback', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Erreur lors de l\'envoi du feedback');
  }
};

