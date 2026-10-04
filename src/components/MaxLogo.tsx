import React from 'react';

interface MaxLogoProps {
  className?: string;
  size?: number | string;
}

export const MaxLogo: React.FC<MaxLogoProps> = ({ className = "w-6 h-6", size }) => {
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Логотип мессенджера MAX"
    >
      <defs>
        {/* Background gradient: bright blue to rich purple */}
        <linearGradient id="max-bg-grad" x1="0%" y1="15%" x2="100%" y2="85%">
          <stop offset="0%" stopColor="#256dfd" />
          <stop offset="42%" stopColor="#3d56fb" />
          <stop offset="78%" stopColor="#693efb" />
          <stop offset="100%" stopColor="#8d32f9" />
        </linearGradient>

        {/* Center speech bubble gradient */}
        <linearGradient id="max-center-grad" x1="20%" y1="20%" x2="80%" y2="80%">
          <stop offset="0%" stopColor="#1f65fb" />
          <stop offset="50%" stopColor="#3556fa" />
          <stop offset="100%" stopColor="#6739f8" />
        </linearGradient>
      </defs>

      {/* Squircle App Icon Container */}
      <rect width="400" height="400" rx="92" fill="url(#max-bg-grad)" />

      {/* White outer speech bubble shape */}
      <path
        fill="#FFFFFF"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M200 48
           C283.948 48 352 116.052 352 200
           C352 283.948 283.948 352 200 352
           C161.42 352 126.35 337.68 99.8 314.2
           C86.4 332.6 77.2 344.2 71.5 348.6
           C67.8 351.4 64.2 349.8 63.1 345.5
           C61.4 338.8 63.8 316.5 67.2 291.5
           C54.8 264.4 48 233.2 48 200
           C48 116.052 116.052 48 200 48
           Z
           M200 124
           C241.974 124 276 158.026 276 200
           C276 241.974 241.974 276 200 276
           C190.2 276 181.1 274.1 172.5 270.8
           C165.2 276.5 158.8 280.2 153.5 281.8
           C150.2 282.8 147.8 281.4 148.2 277.8
           C148.8 272.2 150.5 264.5 152.8 256.4
           C134.8 243.2 124 222.8 124 200
           C124 158.026 158.026 124 200 124
           Z"
      />

      {/* Center speech bubble matching the brand gradient */}
      <path
        fill="url(#max-center-grad)"
        d="M200 124
           C241.974 124 276 158.026 276 200
           C276 241.974 241.974 276 200 276
           C190.2 276 181.1 274.1 172.5 270.8
           C165.2 276.5 158.8 280.2 153.5 281.8
           C150.2 282.8 147.8 281.4 148.2 277.8
           C148.8 272.2 150.5 264.5 152.8 256.4
           C134.8 243.2 124 222.8 124 200
           C124 158.026 158.026 124 200 124
           Z"
      />
    </svg>
  );
};
