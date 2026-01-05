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
import type { AppStatus, FollowUpStatus } from '@/types/JobApplication';

// Configuration visuelle (icônes, couleurs) - indépendante de la langue
export const STATUS_VISUAL_CONFIG: Record<AppStatus | 'all', { color: string; bgColor: string; icon: React.ReactNode }> = {
  all: { color: 'text-text-primary', bgColor: 'bg-background', icon: <Briefcase size={16} /> },
  applied: { color: 'text-primary-dark', bgColor: 'bg-primary-soft', icon: <Send size={16} /> },
  follow_up: { color: 'text-[#D4A373]', bgColor: 'bg-warning-soft', icon: <Clock size={16} /> },
  interview: { color: 'text-[#6A994E]', bgColor: 'bg-success-soft', icon: <UserCheck size={16} /> },
  offer: { color: 'text-[#386641]', bgColor: 'bg-[#F2FFE9]', icon: <CheckCircle size={16} /> },
  rejected: { color: 'text-[#BC4749]', bgColor: 'bg-danger-soft', icon: <XCircle size={16} /> },
  ghosted: { color: 'text-text-secondary', bgColor: 'bg-primary-soft/30', icon: <Ghost size={16} /> },
};

export const FOLLOW_UP_VISUAL_CONFIG: Record<FollowUpStatus, { color: string; bgColor: string; icon: React.ReactNode }> = {
  none: { color: 'text-text-secondary', bgColor: 'bg-primary-soft/30', icon: <Clock size={14} /> },
  due: { color: 'text-danger', bgColor: 'bg-danger-soft', icon: <AlertCircle size={14} /> },
  planned: { color: 'text-accent', bgColor: 'bg-accent/10', icon: <CalendarCheck size={14} /> },
  contacted: { color: 'text-primary-dark', bgColor: 'bg-primary-soft', icon: <Send size={14} /> },
  awaiting: { color: 'text-warning', bgColor: 'bg-warning-soft', icon: <MailQuestion size={14} /> },
  responded: { color: 'text-success', bgColor: 'bg-success-soft', icon: <CheckCircle2 size={14} /> },
  done: { color: 'text-[#6A994E]', bgColor: 'bg-success-soft', icon: <CheckCircle size={14} /> },
};

// Fonctions pour obtenir les labels traduits
export function getStatusLabel(status: AppStatus | 'all', t: (key: string) => string): string {
  return t(`status.${status}`);
}

export function getFollowUpLabel(status: FollowUpStatus, t: (key: string) => string): string {
  return t(`status.followUp.${status}`);
}

// Fonctions pour obtenir la config complète avec label traduit
export function getStatusConfig(
  status: AppStatus | 'all',
  t: (key: string) => string
): { label: string; color: string; bgColor: string; icon: React.ReactNode } {
  return {
    ...STATUS_VISUAL_CONFIG[status],
    label: getStatusLabel(status, t),
  };
}

export function getFollowUpConfig(
  status: FollowUpStatus,
  t: (key: string) => string
): { label: string; color: string; bgColor: string; icon: React.ReactNode } {
  return {
    ...FOLLOW_UP_VISUAL_CONFIG[status],
    label: getFollowUpLabel(status, t),
  };
}
