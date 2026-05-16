import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, error, id, options, className = '', ...props }: SelectProps) {
  const selectId = id || label.toLowerCase().replace(/\s/g, '-');
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={selectId} className="text-sm font-medium text-white/70">
        {label}
      </label>
      <select
        id={selectId}
        className={`
          w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10
          text-white
          focus:outline-none focus:ring-2 focus:ring-apple-blue/60 focus:border-apple-blue/60
          transition-all duration-200 appearance-none cursor-pointer
          ${error ? 'border-red-500/60' : ''}
          ${className}
        `}
        {...props}
      >
        <option value="" className="bg-gray-900">
          Selecione...
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-gray-900">
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-400 text-xs mt-0.5">{error}</p>}
    </div>
  );
}
