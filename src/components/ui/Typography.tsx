import React from 'react';

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  variant?: 'h1' | 'h2' | 'h3' | 'h4';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'div';
  children?: React.ReactNode;
}

export function Heading({ variant = 'h2', as, children, className = '', ...props }: HeadingProps) {
  const Component = as || variant;

  let styleClass = '';
  if (variant === 'h1') {
    styleClass = 'font-display font-light leading-[0.95] text-ink';
  } else if (variant === 'h2') {
    styleClass = 'font-display font-normal text-[clamp(2.5rem,6.5vw,3.75rem)] leading-tight text-ink';
  } else if (variant === 'h3') {
    styleClass =
      'font-display font-normal text-[clamp(1.75rem,4.5vw,2.25rem)] leading-normal text-ink-soft';
  } else if (variant === 'h4') {
    // Row titles: place names, area names, anything that heads a list item
    styleClass = 'font-display font-normal text-[clamp(1.25rem,2.8vw,1.4rem)] leading-snug text-ink';
  }

  return (
    <Component className={`${styleClass} ${className}`} {...props}>
      {children}
    </Component>
  );
}

interface SubtitleProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: 'p' | 'span' | 'div';
  children?: React.ReactNode;
}

export function Subtitle({ as: Component = 'p', children, className = '', ...props }: SubtitleProps) {
  return (
    <Component
      className={`font-body text-[11px] md:text-[13px] font-medium tracking-[0.35em] uppercase text-ink-soft ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

interface BodyProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: 'regular' | 'small' | 'large';
  as?: 'p' | 'span' | 'div';
  children?: React.ReactNode;
}

export function Body({
  variant = 'regular',
  as: Component = 'p',
  children,
  className = '',
  ...props
}: BodyProps) {
  let sizeClass = 'text-base md:text-lg leading-relaxed text-ink-soft font-normal';
  if (variant === 'small') {
    sizeClass = 'text-sm md:text-base leading-normal text-ink-soft font-normal';
  } else if (variant === 'large') {
    sizeClass = 'text-lg md:text-xl leading-relaxed text-ink font-normal';
  }

  return (
    <Component className={`font-body ${sizeClass} ${className}`} {...props}>
      {children}
    </Component>
  );
}
