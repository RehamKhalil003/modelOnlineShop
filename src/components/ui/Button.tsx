'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'soft' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant = 'primary', size = 'md', loading, disabled, ...props }, ref) => {
    const base = 'relative inline-flex items-center justify-center font-semibold tracking-[0.12em] uppercase text-xs overflow-hidden transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed rounded-full';

    const variants: Record<string, string> = {
      /* Gradient violet→pink */
      primary:   'btn-grad text-white',
      /* Deep violet solid */
      secondary: 'text-white',
      /* Gradient border, transparent fill */
      outline:   'grad-border text-[var(--v-500)] hover:shadow-[0_4px_20px_rgba(124,58,237,0.2)]',
      ghost:     'text-[var(--v-500)] hover:text-[var(--v-700)] hover:bg-[var(--v-50)]',
      /* Soft blush fill */
      soft:      'text-[var(--v-700)]',
      /* Dark section use */
      dark:      'text-white border border-white/25 hover:bg-white/10 backdrop-blur-sm',
    };

    const sizes = { sm: 'h-9 px-5 text-[10px]', md: 'h-11 px-7', lg: 'h-13 px-10 text-[11px]' };

    const inlineStyle: React.CSSProperties = {};
    if (variant === 'secondary') {
      inlineStyle.background = 'var(--v-700)';
      inlineStyle.boxShadow = '0 4px 20px rgba(109,40,217,0.3)';
    }
    if (variant === 'soft') {
      inlineStyle.background = 'linear-gradient(135deg,var(--p-100),var(--v-100))';
    }

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.97 }}
        className={cn(base, variants[variant], sizes[size], className)}
        style={inlineStyle}
        disabled={disabled || loading}
        {...(props as any)}
      >
        {loading
          ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          : children}
      </motion.button>
    );
  }
);
Button.displayName = 'Button';
export default Button;
