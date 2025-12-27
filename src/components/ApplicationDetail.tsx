
import React from 'react';
import type { JobApplication, FollowUpStatus } from '@/types/JobApplication';
import { STATUS_CONFIG, FOLLOW_UP_CONFIG } from '../constants';
import { Badge } from './Badge';
import { Button } from './ui/button';
import { 
  Building2, MapPin, Globe, Mail, Phone, Calendar, 
  ExternalLink, StickyNote, User, Flower2,
  BellRing, CheckCircle2, Timer, Send
} from 'lucide-react';
import useAppStore from '@/stores/useStore';
import { getTodayISOString, getDaysSince } from '@/lib/dateUtils';

interface ApplicationDetailProps {
  app: JobApplication;
  onEdit: () => void;
  onClose: () => void;
}

export const ApplicationDetail = ({ app, onEdit, onClose }: ApplicationDetailProps) => {
  const { updateApplication } = useAppStore();

  const handleUpdateFollowUp = (status: FollowUpStatus) => {
    updateApplication(app.id, { 
      followUpStatus: status,
      followUpDate: status === 'contacted' ? getTodayISOString() : app.followUpDate 
    });
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

      {/* Système de Tracking Relance Granulaire */}
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
          {infoRow(<ExternalLink size={18} />, "Lien Offre", app.jobLink, true)}
        </div>
        
        <div className="space-y-4">
          <h3 className="text-[10px] font-black text-text-secondary uppercase tracking-widest px-2">Contact Clé</h3>
          {infoRow(<User size={18} />, "Nom", app.contactName)}
          {infoRow(<Mail size={18} />, "Email", app.contactEmail)}
          {infoRow(<Phone size={18} />, "Téléphone", app.contactPhone)}
        </div>
      </div>

      {app.notes && (
        <div className="bg-warning-soft/20 p-8 rounded-ui border border-warning/10 italic text-text-primary/80 font-medium leading-relaxed shadow-inner">
          <div className="flex items-center gap-2 mb-4 text-warning">
            <StickyNote size={18} />
            <span className="text-[10px] font-black uppercase tracking-widest">Réflexions</span>
          </div>
          "{app.notes}"
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
  );
};
