import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="text-sm font-medium text-white/70 ml-1">{label}</label>}
      <input
        className={`w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-apple-blue/60 focus:border-apple-blue/60 transition-all duration-200 placeholder:text-white/20 ${error ? 'border-red-500/50 bg-red-500/5' : ''} ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-400 mt-1 ml-1">{error}</span>}
    </div>
  );
}
