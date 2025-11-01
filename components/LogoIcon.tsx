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
        d="M20 30 C20 25 23 20 30 20 L55 20 C62 20 65 25 65 30 L65 50 C65 55 62 60 55 60 L35 60 L25 70 L25 60 C22 60 20 57 20 50 Z"
        fill="url(#gradient)"
      />
      
      <circle cx="35" cy="38" r="3.5" fill="white"/>
      <circle cx="50" cy="38" r="3.5" fill="white"/>
      
      <path
        d="M75 50 C75 45 78 40 85 40 L95 40 C98 40 100 43 100 48 L100 65 C100 70 98 73 95 73 L90 73 L85 80 L85 73 C82 73 75 70 75 65 Z"
        fill="url(#gradient)"
        opacity="0.85"
      />
      
      <circle cx="87" cy="57" r="2.5" fill="white"/>
      
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>
    </svg>
  );
}
