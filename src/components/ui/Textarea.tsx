import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function Textarea({ label, error, id, className = '', ...props }: TextareaProps) {
  const textareaId = id || label.toLowerCase().replace(/\s/g, '-');
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={textareaId} className="text-sm font-medium text-white/70">
        {label}
      </label>
      <textarea
        id={textareaId}
        className={`
          w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10
          text-white placeholder-white/30 resize-none
          focus:outline-none focus:ring-2 focus:ring-apple-blue/60 focus:border-apple-blue/60
          transition-all duration-200
          ${error ? 'border-red-500/60' : ''}
          ${className}
        `}
        rows={4}
        {...props}
      />
      {error && <p className="text-red-400 text-xs mt-0.5">{error}</p>}
    </div>
  );
}
