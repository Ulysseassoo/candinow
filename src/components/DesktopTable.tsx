import type { FollowUpStatus, JobApplication } from '@/types/JobApplication';
import { motion } from 'framer-motion';
import { Building2, Edit3, Trash2 } from 'lucide-react';
import { Badge } from './Badge';
import { STATUS_CONFIG } from '@/constants';
import { FOLLOW_UP_CONFIG } from '@/constants';
import { Button } from './ui/button';
import { getDaysSince, formatDate } from '@/lib/dateUtils';

interface DesktopTableProps {
    filteredAndSortedApps: JobApplication[];
    setViewingApp: (app: JobApplication) => void;
    setEditingApp: (app: JobApplication) => void;
    deleteApplication: (id: string) => void;
}

const DesktopTable = ({ filteredAndSortedApps, setViewingApp, setEditingApp, deleteApplication }: DesktopTableProps) => {
    const getDaysWithoutResponse = (appliedDate: string) => {
        return getDaysSince(appliedDate);
    };

    const getDaysWithoutFollowUp = (app: JobApplication): number => {
        if (app.followUpDate) {
            return getDaysSince(app.followUpDate);
        }
        return getDaysSince(app.appliedAt);
    };

    const getEffectiveFollowUpStatus = (app: JobApplication): FollowUpStatus => {
        if (app.followUpStatus && app.followUpStatus !== 'none') return app.followUpStatus;
        const days = getDaysWithoutResponse(app.appliedAt);
        if (app.status === 'applied' && days >= 10) return 'due';
        return 'none';
    };

    return (
        <div className="hidden lg:block soft-card overflow-hidden border-none shadow-lg">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-primary-soft/30 border-b border-border/40">
                        <th className="px-8 py-5 text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">Poste & Entreprise</th>
                        <th className="px-8 py-5 text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">Statut</th>
                        <th className="px-8 py-5 text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">Appliqué le</th>
                        <th className="px-8 py-5 text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">Relance</th>
                        <th className="px-8 py-5 text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">Jours sans relance</th>
                        <th className="px-8 py-5 text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border/20">
                    {filteredAndSortedApps.map((app) => {
                        const followUp = getEffectiveFollowUpStatus(app);
                        return (
                            <motion.tr
                                key={app.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="group cursor-pointer transition-colors hover:bg-primary-soft/10"
                                onClick={() => setViewingApp(app)}
                            >
                                <td className="px-8 py-6">
                                    <div className="flex flex-col">
                                        <span className="font-black text-text-primary text-base leading-none mb-1.5">{app.title}</span>
                                        <span className="text-text-secondary text-xs font-bold flex items-center gap-1.5 uppercase tracking-wider opacity-70">
                                            <Building2 size={12} className="text-primary" /> {app.company}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <Badge
                                        label={STATUS_CONFIG[app.status].label}
                                        colorClass={STATUS_CONFIG[app.status].color}
                                        bgColorClass={STATUS_CONFIG[app.status].bgColor}
                                        icon={STATUS_CONFIG[app.status].icon}
                                    />
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-text-primary">{formatDate(app.appliedAt)}</span>
                                        <span className="text-[10px] font-black text-text-secondary/50 uppercase">Il y a {getDaysWithoutResponse(app.appliedAt)} jours</span>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    {followUp !== 'none' ? (
                                        <Badge
                                            label={FOLLOW_UP_CONFIG[followUp].label}
                                            colorClass={FOLLOW_UP_CONFIG[followUp].color}
                                            bgColorClass={FOLLOW_UP_CONFIG[followUp].bgColor}
                                            icon={FOLLOW_UP_CONFIG[followUp].icon}
                                        />
                                    ) : (
                                        <span className="text-[10px] font-black text-text-secondary/30 uppercase tracking-widest">—</span>
                                    )}
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-text-primary">{getDaysWithoutFollowUp(app)} jours</span>
                                        {app.followUpDate && (
                                            <span className="text-[10px] font-black text-text-secondary/50 uppercase">Depuis relance</span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-8 py-6" onClick={e => e.stopPropagation()}>
                                    <div className="flex items-center justify-end gap-2">
                                        <Button size="icon" variant="ghost" className="hover:bg-primary-soft hover:text-primary" onClick={() => setEditingApp(app)}>
                                            <Edit3 size={18} />
                                        </Button>
                                        <Button size="icon" variant="ghost" className="hover:bg-danger-soft hover:text-danger" onClick={() => deleteApplication(app.id)}>
                                            <Trash2 size={18} />
                                        </Button>
                                    </div>
                                </td>
                            </motion.tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default DesktopTable;