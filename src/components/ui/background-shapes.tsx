
import React from 'react';

export const CirclePattern: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="404"
      height="404"
      viewBox="0 0 404 404"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g opacity="0.15">
        <circle cx="202" cy="202" r="10" fill="currentColor" />
        <circle cx="202" cy="162" r="8" fill="currentColor" />
        <circle cx="202" cy="122" r="6" fill="currentColor" />
        <circle cx="202" cy="82" r="4" fill="currentColor" />
        <circle cx="202" cy="42" r="2" fill="currentColor" />
        <circle cx="202" cy="242" r="8" fill="currentColor" />
        <circle cx="202" cy="282" r="6" fill="currentColor" />
        <circle cx="202" cy="322" r="4" fill="currentColor" />
        <circle cx="202" cy="362" r="2" fill="currentColor" />
        <circle cx="162" cy="202" r="8" fill="currentColor" />
        <circle cx="122" cy="202" r="6" fill="currentColor" />
        <circle cx="82" cy="202" r="4" fill="currentColor" />
        <circle cx="42" cy="202" r="2" fill="currentColor" />
        <circle cx="242" cy="202" r="8" fill="currentColor" />
        <circle cx="282" cy="202" r="6" fill="currentColor" />
        <circle cx="322" cy="202" r="4" fill="currentColor" />
        <circle cx="362" cy="202" r="2" fill="currentColor" />
      </g>
    </svg>
  );
};

export const WavyLines: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="520"
      height="520"
      viewBox="0 0 520 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g opacity="0.1">
        <path
          d="M60 120C90 80 150 40 200 40C250 40 310 80 340 120C370 160 430 200 480 200C530 200 590 160 620 120"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M60 220C90 180 150 140 200 140C250 140 310 180 340 220C370 260 430 300 480 300C530 300 590 260 620 220"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M60 320C90 280 150 240 200 240C250 240 310 280 340 320C370 360 430 400 480 400C530 400 590 360 620 320"
          stroke="currentColor"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
};

export const GridPattern: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="404"
      height="404"
      viewBox="0 0 404 404"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g opacity="0.1">
        <rect x="0" y="0" width="404" height="404" fill="none" />
        <path d="M0 60H404" stroke="currentColor" strokeWidth="1" />
        <path d="M0 120H404" stroke="currentColor" strokeWidth="1" />
        <path d="M0 180H404" stroke="currentColor" strokeWidth="1" />
        <path d="M0 240H404" stroke="currentColor" strokeWidth="1" />
        <path d="M0 300H404" stroke="currentColor" strokeWidth="1" />
        <path d="M0 360H404" stroke="currentColor" strokeWidth="1" />
        <path d="M60 0V404" stroke="currentColor" strokeWidth="1" />
        <path d="M120 0V404" stroke="currentColor" strokeWidth="1" />
        <path d="M180 0V404" stroke="currentColor" strokeWidth="1" />
        <path d="M240 0V404" stroke="currentColor" strokeWidth="1" />
        <path d="M300 0V404" stroke="currentColor" strokeWidth="1" />
        <path d="M360 0V404" stroke="currentColor" strokeWidth="1" />
      </g>
    </svg>
  );
};
