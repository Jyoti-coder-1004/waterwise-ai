import React from 'react';
import { cn } from './Button';

export const Input = React.forwardRef(({ className, label, error, ...props }, ref) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-textMain">{label}</label>}
      <input
        ref={ref}
        className={cn(
          "w-full h-11 px-4 rounded-xl bg-cream border border-sage/50 text-textMain placeholder:text-textMuted/60",
          "focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition-all",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          error && "border-red-500 focus:ring-red-500",
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-red-500 mt-0.5">{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';
