interface LogoIconProps {
  className?: string;
}

export default function LogoIcon({ className = "w-12 h-12" }: LogoIconProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="TalkServe Logo"
    >
      <title>TalkServe</title>
      
      <rect width="100" height="100" rx="20" fill="white"/>
      
      <path
        d="M25 50 Q25 25 50 25 Q75 25 75 50 Q75 75 50 75 Q25 75 25 50 Z"
        fill="url(#gradient)"
      />
      
      <path
        d="M40 45 L50 35 L60 45"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      <circle cx="50" cy="58" r="3" fill="white"/>
      
      <path
        d="M35 60 Q35 70 50 70 Q65 70 65 60"
        stroke="white"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      
      <g opacity="0.3">
        <path d="M20 35 Q15 35 15 40" stroke="url(#gradient)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        <path d="M20 50 Q12 50 12 50" stroke="url(#gradient)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        <path d="M20 65 Q15 65 15 60" stroke="url(#gradient)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      </g>
      
      <g opacity="0.3">
        <path d="M80 35 Q85 35 85 40" stroke="url(#gradient)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        <path d="M80 50 Q88 50 88 50" stroke="url(#gradient)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        <path d="M80 65 Q85 65 85 60" stroke="url(#gradient)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      </g>
      
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>
    </svg>
  );
}
