import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, id, className = '', ...props }: InputProps) {
  const inputId = id || label.toLowerCase().replace(/\s/g, '-');
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-medium text-white/70">
        {label}
      </label>
      <input
        id={inputId}
        className={`
          w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10
          text-white placeholder-white/30
          focus:outline-none focus:ring-2 focus:ring-apple-blue/60 focus:border-apple-blue/60
          transition-all duration-200
          ${error ? 'border-red-500/60 focus:ring-red-500/40' : ''}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-red-400 text-xs mt-0.5">{error}</p>}
    </div>
  );
}
