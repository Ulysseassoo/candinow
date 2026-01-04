
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { JobApplication } from '@/types/JobApplication';
import { STATUS_CONFIG, FOLLOW_UP_CONFIG } from '@/constants';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { formatDateForInput, getTodayISO } from '@/lib/dateUtils';
import { Download, Loader2 } from 'lucide-react';
import { importJobFromLink } from '@/lib/jobLinkUtils';

const appSchema = z.object({
  title: z.string().min(2, "L'intitulé est trop court"),
  company: z.string().min(1, "L'entreprise est requise"),
  status: z.enum(['applied', 'follow_up', 'interview', 'offer', 'rejected', 'ghosted']),
  appliedAt: z.string().min(1, "La date est requise"),
  source: z.string().optional(),
  jobLink: z.string().url("URL invalide").optional().or(z.literal('')),
  location: z.string().optional(),
  domain: z.string().optional(),
  followUpStatus: z.enum(['none', 'due', 'planned', 'done', 'contacted', 'awaiting', 'responded']),
  followUpDate: z.string().optional(),
  contactName: z.string().optional(),
  contactEmail: z.string().email("Email invalide").optional().or(z.literal('')),
  contactPhone: z.string().optional(),
  contactMethod: z.enum(['email', 'phone']),
  interviewDate: z.string().optional(),
  description: z.string().optional(),
  salary: z.string().optional(),
  notes: z.string().optional(),
  reminderAt: z.string().optional(),
});

type AppFormValues = z.infer<typeof appSchema>;

interface AppFormProps {
  initialData?: JobApplication;
  onSubmit: (data: AppFormValues) => void;
  onCancel: () => void;
}

export const AppForm = ({ initialData, onSubmit, onCancel }: AppFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AppFormValues>({
    resolver: zodResolver(appSchema),
    defaultValues: initialData ? {
      ...initialData,
      appliedAt: formatDateForInput(initialData.appliedAt),
    } : {
      title: '',
      company: '',
      status: 'applied',
      appliedAt: getTodayISO(),
      followUpStatus: 'none',
      contactMethod: 'email',
    },
  });

  const [isImporting, setIsImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);
  const jobLinkValue = watch('jobLink');

  const handleImportFromLink = async () => {
    if (!jobLinkValue || jobLinkValue.trim() === '') {
      setImportError('Veuillez entrer une URL');
      return;
    }

    setIsImporting(true);
    setImportError(null);
    setImportSuccess(false);

    try {
      const importedData = await importJobFromLink(jobLinkValue);

      if (importedData.title && !watch('title')) {
        setValue('title', importedData.title);
      }
      if (importedData.company && !watch('company')) {
        setValue('company', importedData.company);
      }
      if (importedData.location) {
        setValue('location', importedData.location);
      }
      if (importedData.domain) {
        setValue('domain', importedData.domain);
      }
      if (importedData.source) {
        setValue('source', importedData.source);
      }
      if (importedData.description) {
        setValue('description', importedData.description);
      }
      if (importedData.salary) {
        setValue('salary', importedData.salary);
      }

      setImportSuccess(true);
      setTimeout(() => setImportSuccess(false), 3000);

    } catch (error) {
      setImportError(error instanceof Error ? error.message : 'Erreur inconnue');
    } finally {
      setIsImporting(false);
    }
  };

  const labelClasses = "block text-[10px] font-black text-text-secondary uppercase tracking-widest mb-1.5 ml-1";
  const sectionTitle = "text-xs font-black text-primary border-b border-primary-soft pb-2 mb-4 mt-8 first:mt-0 uppercase tracking-[0.15em]";
  const errorClasses = "text-[10px] text-danger font-bold mt-1 ml-1";

  const selectClasses = "w-full px-4 py-2 bg-background border border-border rounded-ui focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm text-foreground appearance-none cursor-pointer";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="max-h-[60vh] lg:max-h-[65vh] overflow-y-auto pr-3 custom-scrollbar no-scrollbar pb-4">
        <h3 className={sectionTitle}>1. Informations du Poste</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className={labelClasses}>Intitulé du Poste *</label>
            <Input {...register('title')} placeholder="ex: Senior Designer" className={errors.title ? 'border-danger/50 bg-danger-soft/10' : ''} />
            {errors.title && <p className={errorClasses}>{errors.title.message}</p>}
          </div>
          <div className="md:col-span-2">
            <label className={labelClasses}>Entreprise *</label>
            <Input {...register('company')} placeholder="ex: Blossom Soft" className={errors.company ? 'border-danger/50 bg-danger-soft/10' : ''} />
            {errors.company && <p className={errorClasses}>{errors.company.message}</p>}
          </div>
          <div>
            <label className={labelClasses}>Localisation</label>
            <Input {...register('location')} placeholder="ex: Paris / Remote" />
          </div>
          <div>
            <label className={labelClasses}>Domaine</label>
            <Input {...register('domain')} placeholder="ex: Tech / Design" />
          </div>
          <div className="md:col-span-2">
            <label className={labelClasses}>Lien de l'offre</label>
            <div className="flex gap-2 items-start">
              <div className="flex-1">
                <Input
                  {...register('jobLink')}
                  placeholder="https://linkedin.com/jobs/..."
                  className={errors.jobLink ? 'border-danger/50 bg-danger-soft/10' : ''}
                />
                {errors.jobLink && <p className={errorClasses}>{errors.jobLink.message}</p>}
                {importError && <p className={errorClasses}>{importError}</p>}
                {importSuccess && (
                  <p className="text-[10px] text-green-600 font-bold mt-1 ml-1">
                    ✓ Données importées avec succès
                  </p>
                )}
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleImportFromLink}
                disabled={isImporting || !jobLinkValue}
                className="min-w-[120px] flex items-center gap-2 shrink-0"
              >
                {isImporting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Import...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Importer
                  </>
                )}
              </Button>
            </div>
          </div>
          <div className="md:col-span-2">
            <label className={labelClasses}>Description de l'offre</label>
            <textarea
              {...register('description')}
              rows={4}
              className="w-full px-4 py-3 bg-background border border-border rounded-ui focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm text-foreground resize-none"
              placeholder="Description complète de l'offre d'emploi (importée automatiquement)"
            />
          </div>
          <div>
            <label className={labelClasses}>Salaire</label>
            <Input {...register('salary')} placeholder="ex: 45k - 55k€" />
          </div>
        </div>

        <h3 className={sectionTitle}>2. Détails du Contact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClasses}>Nom du Contact</label>
            <Input {...register('contactName')} placeholder="Jane Doe" />
          </div>
          <div>
            <label className={labelClasses}>Méthode préférée</label>
            <select {...register('contactMethod')} className={selectClasses}>
              <option value="email">Email</option>
              <option value="phone">Téléphone</option>
            </select>
          </div>
          <div>
            <label className={labelClasses}>Email</label>
            <Input {...register('contactEmail')} placeholder="jane@company.com" />
            {errors.contactEmail && <p className={errorClasses}>{errors.contactEmail.message}</p>}
          </div>
          <div>
            <label className={labelClasses}>Téléphone</label>
            <Input {...register('contactPhone')} placeholder="+33 6 ..." />
          </div>
        </div>

        <h3 className={sectionTitle}>3. Progression & Dates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClasses}>Statut Principal</label>
            <select {...register('status')} className={selectClasses}>
              {Object.entries(STATUS_CONFIG).filter(([k]) => k !== 'all').map(([key, config]) => (
                <option key={key} value={key}>{config.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClasses}>Date de Candidature</label>
            <Input {...register('appliedAt')} type="date" />
          </div>
          <div>
            <label className={labelClasses}>Statut Relance</label>
            <select {...register('followUpStatus')} className={selectClasses}>
              {Object.entries(FOLLOW_UP_CONFIG).map(([key, config]) => (
                <option key={key} value={key}>{config.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClasses}>Prochain Rappel</label>
            <Input {...register('reminderAt')} type="date" />
          </div>
        </div>

        <div className="mt-6">
          <label className={labelClasses}>Notes & Réflexions</label>
          <textarea 
            {...register('notes')}
            rows={4} 
            className="w-full px-4 py-3 bg-background border border-border rounded-ui focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm text-foreground resize-none"
            placeholder="Points clés, questions à poser..."
          />
        </div>
      </div>
      
      <div className="pt-4 flex gap-4 sticky bottom-0 bg-background border-t border-border/20 mt-auto">
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Annuler
        </Button>
        <Button type="submit" className="flex-[2]" disabled={isSubmitting}>
          {initialData ? 'Mettre à jour' : 'Créer la candidature'}
        </Button>
      </div>
    </form>
  );
};
