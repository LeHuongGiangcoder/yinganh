import React from 'react';

// A photograph in the house frame (.photo-frame in globals.css): pale mat,
// thin ink keyline, soft shadow, resting at a slight hand-laid angle.
// `ratio` is the shape of the picture inside the mat — the build script cuts
// each set of photos to one ratio, so pass the same one for a whole row.
export default function Photo({
  src,
  alt,
  ratio = '4 / 3',
  tilt = 0,
  className = '',
  style,
  ...rest
}: {
  src: string;
  alt: string;
  ratio?: string;
  tilt?: number;
  className?: string;
  style?: React.CSSProperties;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'style'>) {
  return (
    <div
      className={`photo-frame ${className}`}
      style={{ ...style, ['--photo-tilt' as string]: `${tilt}deg` }}
      {...rest}
    >
      <img src={src} alt={alt} loading="lazy" draggable={false} style={{ aspectRatio: ratio }} />
    </div>
  );
}
