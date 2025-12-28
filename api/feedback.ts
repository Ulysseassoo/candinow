import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { type, message } = await req.json();

    if (!type || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const typeLabels: Record<string, string> = {
      love: '💖 Amour',
      feature: '✨ Idée',
      bug: '🐛 Bug',
    };

    const { data, error } = await resend.emails.send({
      from: 'Candinow <feedback@candinow.com>',
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
      return new Response(JSON.stringify({ error: 'Failed to send email' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error processing feedback:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

