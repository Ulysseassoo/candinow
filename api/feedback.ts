import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { type, message } = req.body;

    if (!type || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const typeLabels: Record<string, string> = {
      love: '💖 Amour',
      feature: '✨ Idée',
      bug: '🐛 Bug',
    };

    const { data, error } = await resend.emails.send({
      from: 'Candinow <onboarding@resend.dev>',
      to: [process.env.RESEND_EMAIL_TO as string],
      subject: `Feedback Candinow - ${typeLabels[type] || type}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #FFB7C5;">Nouveau feedback Candinow</h2>
          <div style="background: #FFF0F3; padding: 20px; border-radius: 12px; margin: 20px 0;">
            <p><strong>Type:</strong> ${typeLabels[type] || type}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #9A9EB3; font-size: 12px;">
            Envoyé depuis Candinow le ${new Date().toLocaleString('fr-FR')}
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error processing feedback:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

