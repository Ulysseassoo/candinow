import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Building2, Calendar, CheckCircle, Clock } from "lucide-react";
import { useState } from "react";
import type { JobApplication } from "@/types/JobApplication";
import { Button } from "./ui/button";
import { getApplicationsDueToday, getDaysUntilFollowUp } from "@/lib/followUpUtils";
import { getDaysSince, formatDateShort } from "@/lib/dateUtils";
import { Badge } from "./Badge";
import { STATUS_CONFIG } from "@/constants";
import { Toast } from "./Toast";
import { useTranslation } from "@/lib/i18n/context";

interface Props {
  applications: JobApplication[];
  sendFollowUp: (id: string) => void;
  setViewingApp: (app: JobApplication) => void;
}

export const TodaysActions = ({ applications, sendFollowUp, setViewingApp }: Props) => {
  const { t } = useTranslation();
  const dueApplications = getApplicationsDueToday(applications);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [showToast, setShowToast] = useState(false);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  const handleFollowUpSent = (app: JobApplication) => {
    sendFollowUp(app.id);
    setCompletedIds(prev => new Set(prev).add(app.id));

    const nextCount = (app.followUpCount ?? 0) + 1;
    const willBeGhosted = nextCount >= 3;

    setToastMessage(
      willBeGhosted
        ? t('app.todayFollowUpSent', { count: nextCount, company: app.company })
        : t('app.todayFollowUpSentNext', { count: nextCount, company: app.company })
    );
    setShowToast(true);
  };

  if (dueApplications.length === 0) {
    return (
      <div className="soft-card p-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-success-soft flex items-center justify-center">
            <CheckCircle size={32} className="text-success" />
          </div>
          <div>
            <h3 className="font-black text-lg text-text-primary mb-2">
              {t('app.todayNoActionRequired')}
            </h3>
            <p className="text-text-secondary text-sm">
              {t('app.todayAllUpToDate')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        type="success"
      />

      <div className="space-y-4">
        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {dueApplications.map((app, index) => (
              <FollowUpActionCard
                key={app.id}
                app={app}
                index={index}
                sendFollowUp={handleFollowUpSent}
                setViewingApp={setViewingApp}
                isCompleted={completedIds.has(app.id)}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

interface FollowUpActionCardProps {
  app: JobApplication;
  index: number;
  sendFollowUp: (app: JobApplication) => void;
  setViewingApp: (app: JobApplication) => void;
  isCompleted: boolean;
}

const FollowUpActionCard = ({ app, index, sendFollowUp, setViewingApp, isCompleted }: FollowUpActionCardProps) => {
  const daysSinceLastAction = app.lastActionDate
    ? getDaysSince(app.lastActionDate)
    : getDaysSince(app.appliedAt);
  const followUpCount = app.followUpCount ?? 0;
  const daysUntil = getDaysUntilFollowUp(app.nextFollowUpDate);
  const isOverdue = daysUntil !== null && daysUntil < 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isCompleted ? 0.5 : 1,
        y: 0,
        scale: isCompleted ? 0.98 : 1
      }}
      exit={{ opacity: 0, x: -30, scale: 0.95 }}
      transition={{
        layout: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
        opacity: { duration: 0.25 },
        scale: { duration: 0.25 },
        y: { duration: 0.3, delay: Math.min(index * 0.03, 0.15) },
        // @ts-ignore
        exit: { duration: 0.2, ease: "easeIn" }
      }}
      className={`soft-card p-5 hover:shadow-lg transition-shadow duration-200 border-l-4 ${
        isCompleted ? 'border-success bg-success-soft/20' : 'border-warning'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0" onClick={() => setViewingApp(app)} role="button" tabIndex={0}>
          <div className="flex items-start gap-3 mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-black text-base text-text-primary leading-tight mb-1 truncate">
                {app.title}
              </h3>
              <div className="flex items-center gap-2 text-text-secondary font-bold text-sm">
                <Building2 size={14} className="text-primary/60 flex-shrink-0" />
                <span className="truncate">{app.company}</span>
              </div>
            </div>
            <Badge
              label={STATUS_CONFIG[app.status].label}
              colorClass={STATUS_CONFIG[app.status].color}
              bgColorClass={STATUS_CONFIG[app.status].bgColor}
              icon={STATUS_CONFIG[app.status].icon}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-primary-soft/30 rounded-full text-[10px] font-black uppercase tracking-tighter text-text-secondary border border-border/40">
              <Calendar size={11} />
              {app.lastActionDate ? formatDateShort(app.lastActionDate) : formatDateShort(app.appliedAt)}
            </div>
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
              isOverdue
                ? 'bg-danger-soft text-danger border border-danger/10'
                : 'bg-warning-soft text-warning border border-warning/10'
            }`}>
              <Clock size={11} />
              {daysSinceLastAction}j
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-primary-soft text-primary rounded-full text-[10px] font-black uppercase tracking-tighter border border-primary/10">
              {t('app.detailFollowUpCount', { count: followUpCount + 1 })}
            </div>
          </div>
        </div>

        <Button
          size="sm"
          onClick={() => sendFollowUp(app)}
          disabled={isCompleted}
          className={`flex-shrink-0 font-bold transition-all ${
            isCompleted
              ? 'bg-success text-white cursor-not-allowed'
              : 'bg-primary text-white hover:bg-primary/90'
          }`}
        >
          {isCompleted ? (
            <>
              <CheckCircle size={16} className="mr-2" />
              {t('app.detailSent')}
            </>
          ) : (
            t('app.detailFollowUpSent')
          )}
        </Button>
      </div>

      {isOverdue && (
        <div className="mt-3 pt-3 border-t border-border/20">
          <p className="text-xs text-danger font-semibold flex items-center gap-1.5">
            <AlertCircle size={12} />
            {t('common.time.lateDays', { count: Math.abs(daysUntil!) })}
          </p>
        </div>
      )}
    </motion.div>
  );
};
