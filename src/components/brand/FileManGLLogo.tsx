import React, { useId } from 'react';

interface FileManGLLogoProps {
  size?: number;
  className?: string;
  withGlow?: boolean;
}

/**
 * FileManGL Original 3D Fluent Cascading File-Deck & Ascending S-Wave Mark (v1.0.4)
 * Inspired by the Emerald-Mint (#2FF58E) -> Electric Cyan (#00C8FF) -> Deep Sapphire (#002670) palette
 * and Fluent 3D curved ribbon aesthetic, with an original ascending ('/') dual-crest & stacked card geometry.
 * Zero external drop-shadow bleed.
 */
export const FileManGLLogo: React.FC<FileManGLLogoProps> = ({
  size = 40,
  className = '',
}) => {
  const uid = useId().replace(/:/g, '');

  return (
    <div
      style={{ width: size, height: size }}
      className={`relative inline-flex items-center justify-center select-none shrink-0 ${className}`}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10"
      >
        <defs>
          {/* Outer Silhouette ClipPath — guarantees zero shadow/artifact outside the icon boundary */}
          <clipPath id={`hyp_clip_${uid}`}>
            <path d="M28 12H58C65.5 12 71.2 16.5 74.2 22H90C101.046 22 110 30.9543 110 42V86C110 98.1503 100.15 108 88 108H32C19.8497 108 10 98.1503 10 86V30C10 20.0589 18.0589 12 28 12Z" />
          </clipPath>

          {/* Back Stepped File Vault (Deep Royal & Sapphire Blue) */}
          <linearGradient
            id={`hyp_back_${uid}`}
            x1="14"
            y1="12"
            x2="76"
            y2="82"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#0088FF" />
            <stop offset="50%" stopColor="#0052C8" />
            <stop offset="100%" stopColor="#002266" />
          </linearGradient>

          {/* Back Inner Facet Accent */}
          <linearGradient
            id={`hyp_facet_${uid}`}
            x1="16"
            y1="14"
            x2="58"
            y2="58"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#38C8FF" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#002266" stopOpacity="0.05" />
          </linearGradient>

          {/* Middle Ascending Ribbon Layer (Electric Aqua -> Azure -> Cobalt) */}
          <linearGradient
            id={`hyp_mid_${uid}`}
            x1="88"
            y1="20"
            x2="18"
            y2="98"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#14EEEC" />
            <stop offset="38%" stopColor="#00B8FF" />
            <stop offset="76%" stopColor="#006BE6" />
            <stop offset="100%" stopColor="#00389E" />
          </linearGradient>

          {/* Front Ascending Sculpted Pocket (Vibrant Mint-Emerald -> Turquoise -> Ocean Blue) */}
          <linearGradient
            id={`hyp_front_${uid}`}
            x1="104"
            y1="32"
            x2="16"
            y2="108"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#2FF58E" />
            <stop offset="36%" stopColor="#10DC9E" />
            <stop offset="70%" stopColor="#00B2E8" />
            <stop offset="100%" stopColor="#006AE0" />
          </linearGradient>

          {/* Secondary Lower-Left Sculpted Fold Accent (Emerald-Cyan Harmony) */}
          <linearGradient
            id={`hyp_fold_${uid}`}
            x1="12"
            y1="62"
            x2="82"
            y2="108"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#2FF58E" stopOpacity="0.88" />
            <stop offset="55%" stopColor="#00C4F0" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#004EC2" stopOpacity="0.15" />
          </linearGradient>

          {/* Specular Top Edge Rim Highlights */}
          <linearGradient
            id={`hyp_rim_front_${uid}`}
            x1="106"
            y1="36"
            x2="16"
            y2="88"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#B0FFD4" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#5CEEFF" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#0077FF" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient
            id={`hyp_rim_mid_${uid}`}
            x1="96"
            y1="22"
            x2="14"
            y2="72"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#9EFFFF" stopOpacity="0.9" />
            <stop offset="55%" stopColor="#38C8FF" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0044AA" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        <g clipPath={`url(#hyp_clip_${uid})`}>
          {/* LAYER 4: Top-Left Deep Sapphire Archival Vault Card */}
          <path
            d="M28 12H58C65.5 12 71.2 16.5 74.2 22H90C101.046 22 110 30.9543 110 42V86C110 98.1503 100.15 108 88 108H32C19.8497 108 10 98.1503 10 86V30C10 20.0589 18.0589 12 28 12Z"
            fill={`url(#hyp_back_${uid})`}
          />

          {/* Diagonal Geometric Facet Inside Sapphire Card */}
          <path
            d="M28 12H54L34 62H10V30C10 20.0589 18.0589 12 28 12Z"
            fill={`url(#hyp_facet_${uid})`}
          />

          {/* Glowing Cyan File Header Bar on Top-Left Vault Card */}
          <rect
            x="22"
            y="22"
            width="24"
            height="5"
            rx="2.5"
            fill="#67E8F9"
            fillOpacity="0.55"
          />

          {/* Internal Ambient Seam Behind Middle Ascending Wave */}
          <path
            d="M10 66C18 69 27 66 35 55L55 29C60.5 22 68 19.5 77 19.5H110V45H10V66Z"
            fill="#001238"
            fillOpacity="0.38"
          />

          {/* LAYER 3: Middle Electric Aqua-to-Cobalt Ascending Wave (Sweeps Up-Right '/') */}
          <path
            d="M10 68.5C18.5 71.5 27.5 68 35.8 57.2L56.2 30.8C61.4 24.2 68.6 22 77.5 22H90C101.046 22 110 30.9543 110 42V86C110 98.1503 100.15 108 88 108H32C19.8497 108 10 98.1503 10 86V68.5Z"
            fill={`url(#hyp_mid_${uid})`}
          />
          <path
            d="M11 69.2C18.8 71.8 27.6 68.2 35.8 57.5L56.2 31.2C61.4 24.6 68.6 22.75 77.5 22.75H90"
            stroke={`url(#hyp_rim_mid_${uid})`}
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Internal Ambient Seam Behind Front Mint-Emerald Wing */}
          <path
            d="M10 86C22 89 35 83 45 69L63 44C69 35.8 77.5 32 88 32H110V60H10V86Z"
            fill="#001845"
            fillOpacity="0.36"
          />

          {/* LAYER 2: Front Vibrant Mint-Emerald -> Turquoise -> Ocean Ascending Wing */}
          <path
            d="M10 88C22.5 90.8 35.4 84.8 45.6 70.6L63.8 45.4C69.6 37.4 77.8 34 88.2 34H110V86C110 98.1503 100.15 108 88 108H32C19.8497 108 10 98.1503 10 86V88Z"
            fill={`url(#hyp_front_${uid})`}
          />
          <path
            d="M11 88.5C22.8 91.2 35.5 85.2 45.6 71L63.8 45.8C69.6 37.8 77.8 34.75 88.2 34.75H109"
            stroke={`url(#hyp_rim_front_${uid})`}
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* LAYER 1: Signature Lower-Left Origami Ribbon Fold (Forms Interlocking 'F' / Pocket Base) */}
          <path
            d="M10 54H26C33.5 54 39.8 57.8 44.2 64.2L58.5 85.2C64.2 93.6 73.2 98 84.5 98H106.5C102.8 104 95.9 108 88 108H32C19.8497 108 10 98.1503 10 86V54Z"
            fill={`url(#hyp_fold_${uid})`}
          />
        </g>
      </svg>
    </div>
  );
};
