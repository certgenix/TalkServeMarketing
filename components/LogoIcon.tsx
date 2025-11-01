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
      
      <circle cx="50" cy="50" r="48" fill="white"/>
      
      <circle cx="50" cy="50" r="45" fill="url(#gradient)"/>
      
      <g transform="translate(50, 50)">
        <path
          d="M-8 -15 L-12 -10 L-8 -5 M8 -15 L12 -10 L8 -5"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        <circle cx="0" cy="0" r="12" fill="white"/>
        
        <path
          d="M-6 -2 Q0 2 6 -2"
          stroke="url(#gradient)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        
        <circle cx="-4" cy="-4" r="1.5" fill="url(#gradient)"/>
        <circle cx="4" cy="-4" r="1.5" fill="url(#gradient)"/>
        
        <path
          d="M-10 5 Q-5 15 0 15 Q5 15 10 5"
          stroke="white"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
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
