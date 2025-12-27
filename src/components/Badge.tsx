import React from 'react';

interface BadgeProps {
  label: string;
  colorClass: string;
  bgColorClass: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ label, colorClass, bgColorClass, icon }) => {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${colorClass} ${bgColorClass} border border-transparent`}>
      {icon}
      {label}
    </span>
  );
};
