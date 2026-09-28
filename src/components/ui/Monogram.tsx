// Y & A, drawn rather than set, so it matches the ink of the sketches
export default function Monogram({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-label="Y and A" role="img">
      <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="0.9" opacity="0.35" />
      <text
        x="20"
        y="41"
        textAnchor="middle"
        className="font-display"
        fontSize="26"
        fontWeight="300"
        fill="currentColor"
      >
        Y
      </text>
      <text
        x="32"
        y="41"
        textAnchor="middle"
        className="font-display"
        fontSize="16"
        fontStyle="italic"
        fontWeight="300"
        fill="currentColor"
        opacity="0.6"
      >
        &amp;
      </text>
      <text
        x="45"
        y="41"
        textAnchor="middle"
        className="font-display"
        fontSize="26"
        fontWeight="300"
        fill="currentColor"
      >
        A
      </text>
    </svg>
  );
}
