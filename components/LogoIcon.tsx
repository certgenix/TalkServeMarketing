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
      
      <path
        d="M35 25 C35 20 38 17 42 17 L58 17 C62 17 65 20 65 25 L65 75 C65 80 62 83 58 83 L42 83 C38 83 35 80 35 75 Z"
        fill="url(#gradient)"
        stroke="url(#gradient)"
        strokeWidth="1"
      />
      
      <rect x="38" y="22" width="24" height="40" rx="2" fill="white" opacity="0.95"/>
      
      <circle cx="50" cy="72" r="4" fill="white"/>
      
      <path
        d="M15 35 Q10 35 10 40 L10 45 Q10 50 15 50 L20 50"
        stroke="url(#gradient)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      
      <path
        d="M25 30 Q20 30 18 32"
        stroke="url(#gradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
      
      <path
        d="M25 55 Q20 55 18 53"
        stroke="url(#gradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
      
      <ellipse cx="70" cy="30" rx="8" ry="6" fill="url(#gradient)" opacity="0.9"/>
      <ellipse cx="78" cy="40" rx="10" ry="7" fill="url(#gradient)" opacity="0.7"/>
      <ellipse cx="85" cy="33" rx="7" ry="5" fill="url(#gradient)" opacity="0.5"/>
      
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>
    </svg>
  );
}
