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
      
      <circle cx="50" cy="50" r="45" fill="url(#gradient)" opacity="0.1"/>
      
      <path
        d="M35 40c0-8.284 6.716-15 15-15s15 6.716 15 15v10c0 8.284-6.716 15-15 15s-15-6.716-15-15V40z"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      
      <path
        d="M50 65v10M40 75h20"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      
      <path
        d="M28 48c0 12.15 9.85 22 22 22s22-9.85 22-22"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      
      <circle cx="45" cy="45" r="2" fill="currentColor"/>
      <circle cx="55" cy="45" r="2" fill="currentColor"/>
      
      <path
        d="M42 52c2 2 4 3 8 3s6-1 8-3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>
    </svg>
  );
}
