import React from 'react';
import { 
  Briefcase, 
  Send, 
  Clock, 
  UserCheck, 
  CheckCircle, 
  XCircle, 
  Ghost,
  AlertCircle,
  CalendarCheck,
  CheckCircle2,
  MailQuestion
} from 'lucide-react';
import type { AppStatus, FollowUpStatus } from '../types/JobApplication';

export const STATUS_CONFIG: Record<AppStatus | 'all', { label: string; color: string; bgColor: string; icon: React.ReactNode }> = {
  all: { label: 'Tout', color: 'text-text-primary', bgColor: 'bg-background', icon: <Briefcase size={16} /> },
  applied: { label: 'Envoyé', color: 'text-primary-dark', bgColor: 'bg-primary-soft', icon: <Send size={16} /> },
  follow_up: { label: 'Relance', color: 'text-[#D4A373]', bgColor: 'bg-warning-soft', icon: <Clock size={16} /> },
  interview: { label: 'Entretien', color: 'text-[#6A994E]', bgColor: 'bg-success-soft', icon: <UserCheck size={16} /> },
  offer: { label: 'Offre', color: 'text-[#386641]', bgColor: 'bg-[#F2FFE9]', icon: <CheckCircle size={16} /> },
  rejected: { label: 'Refusé', color: 'text-[#BC4749]', bgColor: 'bg-danger-soft', icon: <XCircle size={16} /> },
  ghosted: { label: 'Silence', color: 'text-text-secondary', bgColor: 'bg-primary-soft/30', icon: <Ghost size={16} /> },
};

export const FOLLOW_UP_CONFIG: Record<FollowUpStatus, { label: string; color: string; bgColor: string; icon: React.ReactNode }> = {
  none: { label: 'Aucune', color: 'text-text-secondary', bgColor: 'bg-primary-soft/30', icon: <Clock size={14} /> },
  due: { label: 'À faire', color: 'text-danger', bgColor: 'bg-danger-soft', icon: <AlertCircle size={14} /> },
  planned: { label: 'Planifiée', color: 'text-accent', bgColor: 'bg-accent/10', icon: <CalendarCheck size={14} /> },
  contacted: { label: 'Contacté', color: 'text-primary-dark', bgColor: 'bg-primary-soft', icon: <Send size={14} /> },
  awaiting: { label: 'En attente', color: 'text-warning', bgColor: 'bg-warning-soft', icon: <MailQuestion size={14} /> },
  responded: { label: 'Réponse reçue', color: 'text-success', bgColor: 'bg-success-soft', icon: <CheckCircle2 size={14} /> },
  done: { label: 'Terminée', color: 'text-[#6A994E]', bgColor: 'bg-success-soft', icon: <CheckCircle size={14} /> },
};
