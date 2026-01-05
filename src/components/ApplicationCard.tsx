import type { JobApplication } from "@/types/JobApplication";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Calendar, Clock, Edit3, Trash2, AlertCircle } from "lucide-react";
import { Badge } from "./Badge";
import { STATUS_CONFIG } from "@/constants";
import { Button } from "./ui/button";
import { getDaysSince, formatDateShort } from "@/lib/dateUtils";
import { isFollowUpDue, getDaysUntilFollowUp } from "@/lib/followUpUtils";
import { useTranslation } from "@/lib/i18n/context";

interface Props {
    app: JobApplication;
    setViewingApp: (app: JobApplication) => void;
    setEditingApp: (app: JobApplication) => void;
    deleteApplication: (id: string) => void;
}



export const ApplicationCard = ({ app, setViewingApp, setEditingApp, deleteApplication }: Props) => {
    const { t } = useTranslation();
    const getDaysWithoutResponse = (appliedDate: string) => {
        return getDaysSince(appliedDate);
    };


    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ scale: 1.01, y: -4 }}
            onClick={() => setViewingApp(app)}
            className="soft-card p-6 flex flex-col gap-4 cursor-pointer relative z-10 lg:hidden"
        >
            <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                    <h3 className="font-black text-lg text-text-primary leading-tight">{app.title}</h3>
                    <div className="flex items-center gap-2 text-text-secondary font-bold text-sm">
                        <Building2 size={14} className="text-primary/60" />
                        {app.company}
                    </div>
                </div>
                <Badge
                    label={STATUS_CONFIG[app.status].label}
                    colorClass={STATUS_CONFIG[app.status].color}
                    bgColorClass={STATUS_CONFIG[app.status].bgColor}
                    icon={STATUS_CONFIG[app.status].icon}
                />
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-soft/30 rounded-full text-[10px] font-black uppercase tracking-tighter text-text-secondary border border-border/40">
                    <Calendar size={12} />
                    {formatDateShort(app.appliedAt)}
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-success-soft text-success rounded-full text-[10px] font-black uppercase tracking-tighter border border-success/10">
                    <Clock size={12} />
                    {getDaysWithoutResponse(app.appliedAt)}j
                </div>
                {app.nextFollowUpDate && isFollowUpDue(app.nextFollowUpDate) && app.status !== 'ghosted' && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-warning-soft text-warning rounded-full text-[10px] font-black uppercase tracking-tighter border border-warning/20 animate-pulse">
                        <AlertCircle size={12} />
                        {t('app.cardFollowUpDue')}
                    </div>
                )}
                {app.nextFollowUpDate && !isFollowUpDue(app.nextFollowUpDate) && app.status !== 'ghosted' && (() => {
                    const daysUntil = getDaysUntilFollowUp(app.nextFollowUpDate);
                    if (daysUntil && daysUntil <= 2) {
                        return (
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-soft text-primary rounded-full text-[10px] font-black uppercase tracking-tighter border border-primary/10">
                                <Clock size={12} />
                                {t('app.cardFollowUpIn', { count: daysUntil })}
                            </div>
                        );
                    }
                    return null;
                })()}
            </div>

            <div className="flex items-center justify-between mt-2 pt-4 border-t border-border/30" onClick={e => e.stopPropagation()}>
                <div className="flex items-center gap-2">
                    <Button size="icon" variant="secondary" onClick={() => setEditingApp(app)}>
                        <Edit3 size={18} />
                    </Button>
                    <Button size="icon" variant="danger" className="bg-danger-soft text-danger" onClick={() => deleteApplication(app.id)}>
                        <Trash2 size={18} />
                    </Button>
                </div>
                <Button size="sm" variant="ghost" onClick={() => setViewingApp(app)}>
                    {t('app.cardDetails')} <ArrowRight size={14} className="ml-2" />
                </Button>
            </div>
        </motion.div>
    );
};
