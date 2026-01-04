
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { JobApplication, FollowUpStatus } from '@/types/JobApplication';
import { STATUS_CONFIG, FOLLOW_UP_CONFIG } from '../constants';
import { Badge } from './Badge';
import { Button } from './ui/button';
import {
  Building2, MapPin, Globe, Mail, Phone, Calendar,
  ExternalLink, StickyNote, User, Flower2,
  BellRing, CheckCircle2, Timer, Send, AlertCircle, Clock,
  DollarSign, FileText, CalendarClock
} from 'lucide-react';
import useAppStore from '@/stores/useStore';
import { getTodayISOString, getDaysSince, formatDateShort } from '@/lib/dateUtils';
import { getDaysUntilFollowUp, isFollowUpDue, shouldStopFollowUps } from '@/lib/followUpUtils';
import { Toast } from './Toast';

interface ApplicationDetailProps {
  app: JobApplication;
  onEdit: () => void;
  onClose: () => void;
}

export const ApplicationDetail = ({ app: initialApp, onEdit, onClose }: ApplicationDetailProps) => {
  const { applications, updateApplication, sendFollowUp } = useAppStore();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const app = applications.find(a => a.id === initialApp.id) || initialApp;

  const handleUpdateFollowUp = (status: FollowUpStatus) => {
    updateApplication(app.id, {
      followUpStatus: status,
      followUpDate: status === 'contacted' ? getTodayISOString() : app.followUpDate
    });
  };

  const handleSendFollowUp = () => {
    const currentCount = app.followUpCount ?? 0;
    sendFollowUp(app.id);

    const nextCount = currentCount + 1;
    const willBeGhosted = nextCount >= 3;

    setToastMessage(
      willBeGhosted
        ? `✓ 3ème relance envoyée! Candidature marquée comme "ghosted".`
        : `✓ Relance ${nextCount}/3 envoyée! Prochaine relance prévue dans ${nextCount === 1 ? '5 jours' : '7 jours'}.`
    );
    setShowToast(true);
  };

  const infoRow = (icon: React.ReactNode, label: string, value?: string, isLink?: boolean) => {
    if (!value) return null;
    return (
      <div className="flex items-start gap-4 p-5 bg-white rounded-inner border border-border/40 hover:border-primary/30 transition-all hover:shadow-soft">
        <div className="text-primary mt-0.5 opacity-60">{icon}</div>
        <div className="flex-1">
          <p className="text-[9px] font-black text-text-secondary uppercase tracking-[0.2em] mb-1">{label}</p>
          {isLink ? (
            <a href={value} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-primary-dark hover:underline flex items-center gap-1">
              {value.length > 40 ? value.substring(0, 40) + '...' : value} <ExternalLink size={12} />
            </a>
          ) : (
            <p className="text-sm font-bold text-text-primary">{value}</p>
          )}
        </div>
      </div>
    );
  };

  const getDaysSinceApply = () => {
    return getDaysSince(app.appliedAt);
  };

  const needsFollowUp = app.status === 'applied' && getDaysSinceApply() >= 10 && (!app.followUpStatus || app.followUpStatus === 'none' || app.followUpStatus === 'due');

  return (
    <>
      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        type="success"
      />

      <div className="space-y-8 pb-4">
      <div className="bg-primary-soft/40 p-8 rounded-[32px] border border-primary/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 text-primary opacity-5 transform scale-150 translate-x-1/4 -translate-y-1/4">
          <Flower2 size={150} />
        </div>
        <div className="relative z-10 space-y-4">
          <Badge 
            label={STATUS_CONFIG[app.status].label} 
            colorClass={STATUS_CONFIG[app.status].color} 
            bgColorClass={STATUS_CONFIG[app.status].bgColor}
            icon={STATUS_CONFIG[app.status].icon}
          />
          <h2 className="text-3xl font-black text-text-primary tracking-tight">{app.title}</h2>
          <div className="flex items-center gap-3 text-text-secondary font-bold">
            <div className="p-2 bg-white rounded-xl shadow-sm">
              <Building2 size={18} className="text-primary" />
            </div>
            {app.company}
          </div>
        </div>
      </div>

      {!shouldStopFollowUps(app.status) && app.nextFollowUpDate && (
        <motion.div
          key={`follow-up-${app.followUpCount}`}
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 0.4 }}
          className="bg-gradient-to-br from-primary-soft/30 to-accent/10 p-6 rounded-ui border-2 border-primary/20 shadow-soft space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-xl shadow-sm">
                <Clock size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-black text-text-primary">Prochaine relance automatique</h3>
                <p className="text-xs text-text-secondary font-medium">
                  Relance {(app.followUpCount ?? 0) + 1} sur 3
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-text-secondary font-medium">
                {formatDateShort(app.nextFollowUpDate)}
              </p>
              {(() => {
                const daysUntil = getDaysUntilFollowUp(app.nextFollowUpDate);
                if (daysUntil === null) return null;
                if (daysUntil < 0) {
                  return (
                    <p className="text-xs font-black text-danger flex items-center gap-1 justify-end">
                      <AlertCircle size={12} />
                      En retard de {Math.abs(daysUntil)}j
                    </p>
                  );
                }
                if (daysUntil === 0) {
                  return <p className="text-xs font-black text-warning">Aujourd'hui</p>;
                }
                return <p className="text-xs font-black text-primary">Dans {daysUntil}j</p>;
              })()}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              {[0, 1, 2].map((index) => {
                const isCurrent = (app.followUpCount ?? 0) === index;
                const isPast = (app.followUpCount ?? 0) > index;
                return (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <motion.div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs ${
                        isPast ? 'bg-success text-white' :
                        isCurrent ? 'bg-primary text-white animate-pulse' :
                        'bg-gray-200 text-gray-400'
                      }`}
                      animate={isPast ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      {isPast ? '✓' : index + 1}
                    </motion.div>
                    <p className="text-[9px] font-bold text-text-secondary mt-1">
                      {index === 0 ? '+5j' : index === 1 ? '+5j' : '+7j'}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="relative h-1 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((app.followUpCount ?? 0) / 3) * 100}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
          </div>

          {isFollowUpDue(app.nextFollowUpDate) && (
            <Button
              onClick={handleSendFollowUp}
              className="w-full bg-primary text-white hover:bg-primary/90 font-bold flex items-center justify-center gap-2"
            >
              <Send size={16} />
              Marquer la relance comme envoyée
            </Button>
          )}
        </motion.div>
      )}

      {app.status === 'ghosted' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-50 p-6 rounded-ui border-2 border-gray-200 space-y-2"
        >
          <div className="flex items-center gap-3 text-text-secondary">
            <AlertCircle size={20} />
            <div>
              <h3 className="text-sm font-black">Application sans réponse</h3>
              <p className="text-xs font-medium">
                3 relances envoyées sans retour. Cette candidature a été marquée comme abandonnée.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      <div className="bg-white p-6 rounded-ui border-2 border-primary/10 shadow-soft space-y-6">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <BellRing size={20} className="text-primary" />
            <h3 className="text-[12px] font-black text-text-primary uppercase tracking-widest">Tracking Relance</h3>
          </div>
          {app.followUpStatus && app.followUpStatus !== 'none' && (
            <Badge 
              label={FOLLOW_UP_CONFIG[app.followUpStatus].label}
              colorClass={FOLLOW_UP_CONFIG[app.followUpStatus].color}
              bgColorClass={FOLLOW_UP_CONFIG[app.followUpStatus].bgColor}
              icon={FOLLOW_UP_CONFIG[app.followUpStatus].icon}
            />
          )}
        </div>

        {needsFollowUp && (
          <div className="p-5 bg-danger-soft/30 border border-danger/10 rounded-inner flex items-center justify-between">
            <div className="flex items-center gap-3 text-danger">
              <Timer size={24} />
              <p className="text-xs font-bold italic">Plus de 10 jours sans réponse ! C'est le moment idéal pour relancer.</p>
            </div>
            <Button 
              variant="danger"
              size="sm"
              onClick={() => handleUpdateFollowUp('contacted')}
              className="hover:scale-105"
            >
              Relancer maintenant
            </Button>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button 
            onClick={() => handleUpdateFollowUp('planned')}
            className={`flex flex-col items-center justify-center p-4 rounded-inner border-2 transition-all gap-2 ${app.followUpStatus === 'planned' ? 'bg-accent/10 border-accent text-accent' : 'bg-white border-border/40 text-text-secondary hover:border-accent/40'}`}
          >
            <Calendar size={20} />
            <span className="text-[9px] font-black uppercase tracking-tighter">Planifiée</span>
          </button>
          <button 
            onClick={() => handleUpdateFollowUp('contacted')}
            className={`flex flex-col items-center justify-center p-4 rounded-inner border-2 transition-all gap-2 ${app.followUpStatus === 'contacted' ? 'bg-primary-soft border-primary text-primary-dark' : 'bg-white border-border/40 text-text-secondary hover:border-primary/40'}`}
          >
            <Send size={20} />
            <span className="text-[9px] font-black uppercase tracking-tighter">Contacté</span>
          </button>
          <button 
            onClick={() => handleUpdateFollowUp('awaiting')}
            className={`flex flex-col items-center justify-center p-4 rounded-inner border-2 transition-all gap-2 ${app.followUpStatus === 'awaiting' ? 'bg-warning-soft border-warning text-warning' : 'bg-white border-border/40 text-text-secondary hover:border-warning/40'}`}
          >
            <Timer size={20} />
            <span className="text-[9px] font-black uppercase tracking-tighter">Attente</span>
          </button>
          <button 
            onClick={() => handleUpdateFollowUp('responded')}
            className={`flex flex-col items-center justify-center p-4 rounded-inner border-2 transition-all gap-2 ${app.followUpStatus === 'responded' ? 'bg-success-soft border-success text-success' : 'bg-white border-border/40 text-text-secondary hover:border-success/40'}`}
          >
            <CheckCircle2 size={20} />
            <span className="text-[9px] font-black uppercase tracking-tighter">Réponse</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <h3 className="text-[10px] font-black text-text-secondary uppercase tracking-widest px-2">Détails du Poste</h3>
          {infoRow(<MapPin size={18} />, "Localisation", app.location)}
          {infoRow(<Globe size={18} />, "Domaine", app.domain)}
          {infoRow(<Building2 size={18} />, "Source", app.source)}
          {infoRow(<DollarSign size={18} />, "Salaire", app.salary)}
          {infoRow(<ExternalLink size={18} />, "Lien Offre", app.jobLink, true)}
        </div>

        <div className="space-y-4">
          <h3 className="text-[10px] font-black text-text-secondary uppercase tracking-widest px-2">Dates & Contact</h3>
          {infoRow(<Calendar size={18} />, "Date de candidature", formatDateShort(app.appliedAt))}
          {infoRow(<CalendarClock size={18} />, "Date d'entretien", app.interviewDate ? formatDateShort(app.interviewDate) : undefined)}
          {infoRow(<User size={18} />, "Contact", app.contactName)}
          {infoRow(<Mail size={18} />, "Email", app.contactEmail)}
          {infoRow(<Phone size={18} />, "Téléphone", app.contactPhone)}
        </div>
      </div>

      {app.description && (
        <div className="bg-accent/10 p-8 rounded-ui border border-accent/20 space-y-4">
          <div className="flex items-center gap-2 text-accent">
            <FileText size={18} />
            <span className="text-[10px] font-black uppercase tracking-widest">Description de l'offre</span>
          </div>
          <p className="text-sm text-text-primary/90 font-medium leading-relaxed whitespace-pre-wrap">
            {app.description}
          </p>
        </div>
      )}

      {app.notes && (
        <div className="bg-warning-soft/20 p-8 rounded-ui border border-warning/10 italic text-text-primary/80 font-medium leading-relaxed shadow-inner">
          <div className="flex items-center gap-2 mb-4 text-warning">
            <StickyNote size={18} />
            <span className="text-[10px] font-black uppercase tracking-widest">Notes & Réflexions</span>
          </div>
          <p className="whitespace-pre-wrap">"{app.notes}"</p>
        </div>
      )}

      <div className="flex gap-4 pt-6">
        <Button variant="outline" onClick={onClose} className="flex-1">
          Fermer
        </Button>
        <Button onClick={onEdit} className="flex-[2]">
          Modifier les détails
        </Button>
      </div>
      </div>
    </>
  );
};
