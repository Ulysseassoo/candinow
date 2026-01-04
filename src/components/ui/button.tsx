
import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/20 cursor-pointer',
      secondary: 'bg-primary-soft text-primary-dark hover:bg-primary hover:text-white cursor-pointer',
      outline: 'bg-transparent border border-border text-text-primary hover:bg-primary-soft/30 cursor-pointer',
      ghost: 'bg-transparent text-text-secondary hover:text-primary hover:bg-primary-soft cursor-pointer',
      danger: 'bg-danger text-white hover:bg-red-500 shadow-lg shadow-danger/20 cursor-pointer',
    };

    const sizes = {
      sm: 'px-4 py-2 text-[10px]',
      md: 'px-6 py-3.5 text-[11px]',
      lg: 'px-8 py-4 text-xs',
      icon: 'p-2.5',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-full font-black uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
