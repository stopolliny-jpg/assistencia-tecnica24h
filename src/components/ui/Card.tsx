import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glass?: boolean;
}

export function Card({ children, className = '', glass = false }: CardProps) {
  return (
    <div
      className={`
        rounded-2xl border border-white/10 p-6
        ${glass ? 'bg-white/5 backdrop-blur-md' : 'bg-white/[0.03]'}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
