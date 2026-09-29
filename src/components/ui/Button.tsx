import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'circle';
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseClass = 'transition-all duration-300 pointer-events-auto select-none outline-none';

  let variantClass = '';
  if (variant === 'primary') {
    variantClass =
      'px-6 py-2.5 bg-ink text-sky-light border border-ink hover:bg-transparent hover:text-ink font-body text-[11px] md:text-xs font-medium tracking-[0.2em] uppercase rounded-full';
  } else if (variant === 'secondary') {
    variantClass =
      'px-6 py-2.5 bg-transparent text-ink border border-ink/30 hover:border-ink hover:bg-ink hover:text-sky-light font-body text-[11px] md:text-xs font-medium tracking-[0.2em] uppercase rounded-full';
  } else if (variant === 'circle') {
    variantClass =
      'flex items-center justify-center w-10 h-10 bg-white/60 border border-white/50 backdrop-blur-md shadow-[0_2px_10px_rgba(18,48,91,0.06)] rounded-full text-ink hover:bg-white/80';
  }

  return (
    <button className={`${baseClass} ${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
}
