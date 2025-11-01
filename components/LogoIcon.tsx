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
        d="M50 10 L70 30 L70 70 L50 90 L30 70 L30 30 Z"
        fill="url(#gradient)"
        stroke="url(#gradient)"
        strokeWidth="2"
      />
      
      <circle cx="50" cy="35" r="8" fill="white"/>
      
      <path
        d="M50 45 L50 58"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
      />
      
      <path
        d="M35 65 L50 72 L65 65"
        stroke="white"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      <path
        d="M42 50 Q50 55 58 50"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      
      <circle cx="43" cy="35" r="2" fill="url(#gradient)"/>
      <circle cx="57" cy="35" r="2" fill="url(#gradient)"/>
      
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>
    </svg>
  );
}
