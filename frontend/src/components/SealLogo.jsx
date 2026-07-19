
import React from 'react';

/**
 * Country of Christ Seal — TIV-TEK Human Edification.
 * Responsive Vector Graphic Implementation.
 */

const WIDTHS = {
  hero: 520,
  header: 340,
  watermark: 420,
};

const SealLogo = ({ variant = 'header', className = '', style: extraStyle = {} }) => {
  const width = WIDTHS[variant] || WIDTHS.header;

  return (
    <div 
      className={`flex flex-col items-center justify-center ${className}`}
      style={{
        width: width,
        maxWidth: '92vw',
        height: 'auto',
        display: 'block',
        ...extraStyle,
      }}
    >
      <svg
        viewBox="0 0 200 200"
        className="w-full h-auto animate-pulse"
        style={{ filter: 'drop-shadow(0 0 15px rgba(212,175,55,0.5))' }}
        data-testid={`country-of-christ-seal-${variant}`}
      >
        <defs>
          {/* G5 Royal Gold Gradient */}
          <linearGradient id="g5GoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE066" />
            <stop offset="40%" stopColor="#F5C842" />
            <stop offset="70%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#AA8A29" />
          </linearGradient>
        </defs>

        {/* Outer Ring Geometry */}
        <circle cx="100" cy="100" r="90" fill="none" stroke="url(#g5GoldGrad)" strokeWidth="4" />
        <circle cx="100" cy="100" r="82" fill="none" stroke="url(#g5GoldGrad)" strokeWidth="1" strokeDasharray="4,4" />
        
        {/* Core Geometry Cross Symbolic Insignia */}
        <path 
          d="M 100,35 L 100,165 M 35,75 L 165,75" 
          stroke="url(#g5GoldGrad)" 
          strokeWidth="3" 
          strokeLinecap="round" 
        />
        
        {/* Central Seal Hub Geometry */}
        <circle cx="100" cy="100" r="22" fill="#050505" stroke="url(#g5GoldGrad)" strokeWidth="2" />
        <polygon points="100,85 111,108 135,100 116,116 125,140 100,125 75,140 84,116 65,100 89,108" fill="url(#g5GoldGrad)" />
      </svg>
      
      <p className="text-[#D4AF37] text-xs font-semibold tracking-[0.2em] mt-3 uppercase font-serif text-center">
        Country Of Christ Official Seal
      </p>
    </div>
  );
};

export default SealLogo;
