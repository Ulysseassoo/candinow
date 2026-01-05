
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
import { useTranslation } from '@/lib/i18n/context';

const createAppSchema = (t: (key: string) => string) => z.object({
  title: z.string().min(2, t('validation.titleTooShort')),
  company: z.string().min(1, t('validation.companyRequired')),
  status: z.enum(['applied', 'follow_up', 'interview', 'offer', 'rejected', 'ghosted']),
  appliedAt: z.string().min(1, t('validation.dateRequired')),
  source: z.string().optional(),
  jobLink: z.string().url(t('validation.invalidUrl')).optional().or(z.literal('')),
  location: z.string().optional(),
  domain: z.string().optional(),
  followUpStatus: z.enum(['none', 'due', 'planned', 'done', 'contacted', 'awaiting', 'responded']),
  followUpDate: z.string().optional(),
  contactName: z.string().optional(),
  contactEmail: z.string().email(t('validation.invalidEmail')).optional().or(z.literal('')),
  contactPhone: z.string().optional(),
  contactMethod: z.enum(['email', 'phone']),
  interviewDate: z.string().optional(),
  description: z.string().optional(),
  salary: z.string().optional(),
  notes: z.string().optional(),
  reminderAt: z.string().optional(),
});

type AppFormValues = z.infer<ReturnType<typeof createAppSchema>>;

interface AppFormProps {
  initialData?: JobApplication;
  onSubmit: (data: AppFormValues) => void;
  onCancel: () => void;
}

export const AppForm = ({ initialData, onSubmit, onCancel }: AppFormProps) => {
  const { t } = useTranslation();
  const appSchema = createAppSchema(t);
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
      setImportError(t('validation.pleaseEnterUrl'));
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
      setImportError(error instanceof Error ? error.message : t('validation.unknownError'));
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
        <h3 className={sectionTitle}>{t('app.formSection1')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className={labelClasses}>{t('app.titleLabel')}</label>
            <Input {...register('title')} placeholder={t('app.titlePlaceholder')} className={errors.title ? 'border-danger/50 bg-danger-soft/10' : ''} />
            {errors.title && <p className={errorClasses}>{errors.title.message}</p>}
          </div>
          <div className="md:col-span-2">
            <label className={labelClasses}>{t('app.companyLabel')}</label>
            <Input {...register('company')} placeholder={t('app.companyPlaceholder')} className={errors.company ? 'border-danger/50 bg-danger-soft/10' : ''} />
            {errors.company && <p className={errorClasses}>{errors.company.message}</p>}
          </div>
          <div>
            <label className={labelClasses}>{t('app.locationLabel')}</label>
            <Input {...register('location')} placeholder={t('app.locationPlaceholder')} />
          </div>
          <div>
            <label className={labelClasses}>{t('app.domainLabel')}</label>
            <Input {...register('domain')} placeholder={t('app.domainPlaceholder')} />
          </div>
          <div className="md:col-span-2">
            <label className={labelClasses}>{t('app.urlLabel')}</label>
            <div className="flex gap-2 items-start">
              <div className="flex-1">
                <Input
                  {...register('jobLink')}
                  placeholder={t('app.urlPlaceholder')}
                  className={errors.jobLink ? 'border-danger/50 bg-danger-soft/10' : ''}
                />
                {errors.jobLink && <p className={errorClasses}>{errors.jobLink.message}</p>}
                {importError && <p className={errorClasses}>{importError}</p>}
                {importSuccess && (
                  <p className="text-[10px] text-green-600 font-bold mt-1 ml-1">
                    ✓ {t('app.importSuccess')}
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
                    {t('app.importShortButton')}
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    {t('app.importButton')}
                  </>
                )}
              </Button>
            </div>
          </div>
          <div className="md:col-span-2">
            <label className={labelClasses}>{t('app.descriptionLabel')}</label>
            <textarea
              {...register('description')}
              rows={4}
              className="w-full px-4 py-3 bg-background border border-border rounded-ui focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm text-foreground resize-none"
              placeholder={t('validation.descriptionPlaceholder')}
            />
          </div>
          <div>
            <label className={labelClasses}>{t('app.salaryLabel')}</label>
            <Input {...register('salary')} placeholder={t('app.salaryPlaceholder')} />
          </div>
        </div>

        <h3 className={sectionTitle}>{t('app.formSection2')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClasses}>{t('app.contactNameLabel')}</label>
            <Input {...register('contactName')} placeholder={t('app.contactNamePlaceholder')} />
          </div>
          <div>
            <label className={labelClasses}>{t('app.preferredContactLabel')}</label>
            <select {...register('contactMethod')} className={selectClasses}>
              <option value="email">{t('app.contactMethodEmail')}</option>
              <option value="phone">{t('app.contactMethodPhone')}</option>
            </select>
          </div>
          <div>
            <label className={labelClasses}>{t('app.contactEmailLabel')}</label>
            <Input {...register('contactEmail')} placeholder={t('app.contactEmailPlaceholder')} />
            {errors.contactEmail && <p className={errorClasses}>{errors.contactEmail.message}</p>}
          </div>
          <div>
            <label className={labelClasses}>{t('app.contactPhoneLabel')}</label>
            <Input {...register('contactPhone')} placeholder={t('app.contactPhonePlaceholder')} />
          </div>
        </div>

        <h3 className={sectionTitle}>{t('app.formSection3')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClasses}>{t('app.statusLabel')}</label>
            <select {...register('status')} className={selectClasses}>
              {Object.entries(STATUS_CONFIG).filter(([k]) => k !== 'all').map(([key, config]) => (
                <option key={key} value={key}>{config.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClasses}>{t('app.appliedAtLabel')}</label>
            <Input {...register('appliedAt')} type="date" />
          </div>
          <div>
            <label className={labelClasses}>{t('app.followUpStatusLabel')}</label>
            <select {...register('followUpStatus')} className={selectClasses}>
              {Object.entries(FOLLOW_UP_CONFIG).map(([key, config]) => (
                <option key={key} value={key}>{config.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClasses}>{t('app.nextFollowUpLabel')}</label>
            <Input {...register('reminderAt')} type="date" />
          </div>
        </div>

        <div className="mt-6">
          <label className={labelClasses}>{t('app.notesLabel')}</label>
          <textarea 
            {...register('notes')}
            rows={4} 
            className="w-full px-4 py-3 bg-background border border-border rounded-ui focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm text-foreground resize-none"
            placeholder={t('validation.notesPlaceholder')}
          />
        </div>
      </div>
      
      <div className="pt-4 flex gap-4 sticky bottom-0 bg-background border-t border-border/20 mt-auto">
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          {t('app.cancelButton')}
        </Button>
        <Button type="submit" className="flex-[2]" disabled={isSubmitting}>
          {initialData ? t('app.updateButton') : t('app.createButton')}
        </Button>
      </div>
    </form>
  );
};
