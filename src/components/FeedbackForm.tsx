import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from './ui/button';
import { Sparkles, Bug, Heart, CheckCircle2 } from 'lucide-react';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { sendFeedbackEmail } from '@/lib/feedbackUtils';

const FEEDBACK_TYPES = [
  { id: 'love', icon: Heart, label: 'Love', color: 'text-primary' },
  { id: 'feature', icon: Sparkles, label: 'Idée', color: 'text-accent' },
  { id: 'bug', icon: Bug, label: 'Bug', color: 'text-danger' },
];

const feedbackSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  type: z.enum(['feature', 'bug', 'love']),
  message: z.string().min(5, "Le message est trop court pour être utile !"),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

interface FeedbackFormProps {
  onClose?: () => void;
}

export const FeedbackForm = ({ onClose }: FeedbackFormProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isOnline = useOnlineStatus();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: { type: 'love' },
  });

  const onSubmit = async (data: FeedbackFormValues) => {
    setError(null);
    
    if (!isOnline) {
      setError('Vous êtes actuellement hors ligne. Veuillez vous connecter à Internet pour envoyer votre message.');
      return;
    }
    
    try {
      await sendFeedbackEmail(data);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue lors de l\'envoi');
    }
  };

  if (submitted) {
    return (
      <div className="py-12 flex flex-col items-center text-center space-y-6 animate-in zoom-in-95 duration-500">
        <div className="w-20 h-20 bg-success-soft rounded-full flex items-center justify-center text-success">
          <CheckCircle2 size={48} />
        </div>
        <div>
          <h3 className="text-2xl font-black text-text-primary tracking-tight">Merci beaucoup !</h3>
          <p className="text-text-secondary font-medium mt-2">Tes retours aident Candinow à grandir.</p>
        </div>
        {onClose && (
          <Button onClick={onClose} variant="outline" className="mt-4">
            Fermer
          </Button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-4">
        {onClose && (
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-text-secondary leading-relaxed">
              Une idée ? Un bug ? Ou juste envie de partager ton expérience ? Dis-nous tout.
            </p>
          </div>
        )}

        {error && (
          <div className="p-4 bg-danger-soft/30 border border-danger/20 rounded-ui">
            <p className="text-sm font-bold text-danger">{error}</p>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest ml-1">Ton Nom</label>
          <input
            type="text"
            {...register('name')}
            placeholder="Ex: Marie Dupont"
            className={`w-full px-5 py-4 bg-background border rounded-ui focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all text-sm text-foreground ${errors.name ? 'border-danger/50' : 'border-border focus:border-primary'}`}
          />
          {errors.name && <p className="text-[10px] text-danger font-bold mt-1 ml-1">{errors.name.message}</p>}
        </div>

        <div className="grid grid-cols-3 gap-3">
          {FEEDBACK_TYPES.map((item) => (
            <label key={item.id} className="cursor-pointer group">
              <input 
                type="radio" 
                value={item.id} 
                {...register('type')} 
                className="hidden peer"
              />
              <div className="flex flex-col items-center gap-2 p-4 rounded-inner border-2 border-border peer-checked:border-primary peer-checked:bg-primary-soft/30 group-hover:bg-primary-soft/10 transition-all">
                <item.icon className={item.color} size={20} />
                <span className="text-[10px] font-black uppercase tracking-widest text-text-primary">{item.label}</span>
              </div>
            </label>
          ))}
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest ml-1">Ton Message</label>
          <textarea 
            {...register('message')}
            placeholder="J'aimerais beaucoup voir une vue calendrier..."
            rows={5}
            className={`w-full px-5 py-4 bg-background border rounded-ui focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all text-sm text-foreground resize-none ${errors.message ? 'border-danger/50' : 'border-border focus:border-primary'}`}
          />
          {errors.message && <p className="text-[10px] text-danger font-bold mt-1 ml-1">{errors.message.message}</p>}
        </div>
      </div>

      <div className="flex gap-4">
        {onClose && (
          <Button type="button" variant="ghost" onClick={onClose} className="flex-1">Plus tard</Button>
        )}
        <Button type="submit" disabled={isSubmitting} className={onClose ? "flex-[2]" : "w-full"}>
          Envoyer mon avis
        </Button>
      </div>
    </form>
  );
};
