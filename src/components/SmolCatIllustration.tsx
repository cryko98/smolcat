/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

interface SmolCatIllustrationProps {
  className?: string;
  isPurring?: boolean;
  isHappy?: boolean;
  accessory?: 'none' | 'party-hat' | 'sunglasses' | 'crown' | 'propeller-hat';
  onClick?: () => void;
}

export default function SmolCatIllustration({
  className = '',
  isPurring = false,
  isHappy = false,
  accessory = 'none',
  onClick,
}: SmolCatIllustrationProps) {
  
  // Custom wiggle vibration for "purring" / snorting
  const wiggleTransition = isPurring
    ? {
        x: {
          type: "spring",
          stiffness: 1100,
          damping: 2,
          repeat: Infinity,
          duration: 0.1,
        },
        y: {
          type: "spring",
          stiffness: 1100,
          damping: 2,
          repeat: Infinity,
          duration: 0.1,
        },
      }
    : undefined;

  const wiggleAnimate = isPurring
    ? {
        x: [0, -1.5, 1.5, -1.5, 0],
        y: [0, 1.5, -1.5, 1.5, 0],
      }
    : undefined;

  return (
    <div 
      className={`relative select-none cursor-pointer ${className}`} 
      onClick={onClick}
    >
      <motion.svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={wiggleAnimate}
        transition={wiggleTransition}
        className="w-full h-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)]"
      >
        {/* Shadow under Bullothy */}
        <ellipse cx="200" cy="375" rx="110" ry="14" fill="#000000" fillOpacity="0.45" />

        {/* GOLD ACCENT RADIANCE GLOW (ONLY WHEN HAPPY / PURRING) */}
        {(isHappy || isPurring) && (
          <motion.circle 
            cx="200" 
            cy="210" 
            r="160" 
            fill="#FBBF24" 
            fillOpacity="0.08" 
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}

        {/* BULL TAIL (CHUBBY, COMPACT, SHORT SPINE STYLE) */}
        <path
          d="M 110 320 C 80 320, 60 290, 70 260 C 72 250, 85 250, 85 262 C 80 280, 92 295, 110 295"
          stroke="#1E1B18"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />
        {/* Golden tail tuft */}
        <circle cx="68" cy="260" r="10" fill="#FBBF24" stroke="#000000" strokeWidth="3" />

        {/* STUBBY FEET WITH GOLD HOOVES (CHUBBY BABY BULL STYLE) */}
        {/* Left Foot */}
        <g>
          <rect x="135" y="325" width="45" height="42" rx="10" fill="#1E1B18" stroke="#000000" strokeWidth="7" />
          {/* Gold Hoof bottom */}
          <path d="M 135 352 Q 157.5 348 180 352 L 180 367 L 135 367 Z" fill="#FBBF24" stroke="#000000" strokeWidth="4" />
        </g>
        {/* Right Foot */}
        <g>
          <rect x="220" y="325" width="45" height="42" rx="10" fill="#1E1B18" stroke="#000000" strokeWidth="7" />
          {/* Gold Hoof bottom */}
          <path d="M 220 352 Q 242.5 348 265 352 L 265 367 L 220 367 Z" fill="#FBBF24" stroke="#000000" strokeWidth="4" />
        </g>

        {/* COMPRESSED SHORT-SPINE BODY (RESTS DIRECTLY BELOW HEAD) */}
        <path
          d="M 105 315 C 100 240, 300 240, 295 315 C 290 345, 110 345, 105 315 Z"
          fill="#111115"
          stroke="#000000"
          strokeWidth="8"
          strokeLinejoin="round"
        />
        {/* Gold medallion neck chain for Web3 flex */}
        <path d="M 140 255 Q 200 290 260 255" stroke="#FBBF24" strokeWidth="7" fill="none" strokeLinecap="round" />
        <circle cx="200" cy="282" r="14" fill="#FBBF24" stroke="#000000" strokeWidth="4" />
        {/* Medallion engraving: "$" */}
        <text x="200" y="287" fontFamily="monospace" fontWeight="900" fontSize="15" fill="#000000" textAnchor="middle">$</text>

        {/* SHINY GOLDEN HORNS (CURVED, CUTE BUT POWERFUL) */}
        {/* Left Horn */}
        <g>
          <path
            d="M 135 150 C 110 110, 80 110, 60 125 C 80 145, 105 165, 122 172"
            fill="#FBBF24"
            stroke="#000000"
            strokeWidth="7"
            strokeLinejoin="round"
          />
          {/* Horn ring accents */}
          <path d="M 105 137 Q 95 145 102 153" stroke="#000000" strokeWidth="3" fill="none" />
        </g>
        {/* Right Horn */}
        <g>
          <path
            d="M 265 150 C 290 110, 320 110, 340 125 C 320 145, 295 165, 278 172"
            fill="#FBBF24"
            stroke="#000000"
            strokeWidth="7"
            strokeLinejoin="round"
          />
          {/* Horn ring accents */}
          <path d="M 295 137 Q 305 145 298 153" stroke="#000000" strokeWidth="3" fill="none" />
        </g>

        {/* HEAD AND FACE (CHUBBY CUTE BABY BULL) */}
        <g transform="translate(0, 15)">
          {/* BIG HEAD */}
          <path
            d="M 115 190 C 110 100, 290 100, 285 190 C 280 245, 120 245, 115 190 Z"
            fill="#1E1B18"
            stroke="#000000"
            strokeWidth="8"
            strokeLinejoin="round"
          />

          {/* FLOPPY CUTE EARS */}
          {/* Left Ear */}
          <path
            d="M 120 160 C 80 150, 70 185, 95 195 Z"
            fill="#111115"
            stroke="#000000"
            strokeWidth="6"
            strokeLinejoin="round"
          />
          <path d="M 110 168 C 85 162, 80 180, 95 186" fill="#F9A8D4" opacity="0.75" />

          {/* Right Ear */}
          <path
            d="M 280 160 C 320 150, 330 185, 305 195 Z"
            fill="#111115"
            stroke="#000000"
            strokeWidth="6"
            strokeLinejoin="round"
          />
          <path d="M 290 168 C 315 162, 320 180, 305 186" fill="#F9A8D4" opacity="0.75" />

          {/* BLUSH CHEEKS */}
          <ellipse cx="145" cy="205" rx="14" ry="8" fill="#EF4444" fillOpacity="0.45" />
          <ellipse cx="255" cy="205" rx="14" ry="8" fill="#EF4444" fillOpacity="0.45" />

          {/* BULLOTHY'S ADORABLE EYES */}
          {isHappy ? (
            <>
              {/* Left Eye (Happy arc blink) */}
              <path
                d="M 130 188 Q 152 165 174 188"
                stroke="#000000"
                strokeWidth="9"
                strokeLinecap="round"
                fill="none"
              />
              {/* Right Eye (Happy arc blink) */}
              <path
                d="M 226 188 Q 248 165 270 188"
                stroke="#000000"
                strokeWidth="9"
                strokeLinecap="round"
                fill="none"
              />
            </>
          ) : (
            <>
              {/* Left Cute Big Eye */}
              <circle cx="152" cy="182" r="25" fill="#000000" />
              {/* Star/Bubble Highlights */}
              <circle cx="160" cy="172" r="10" fill="#FFFFFF" />
              <circle cx="142" cy="190" r="5" fill="#FFFFFF" />
              <circle cx="160" cy="192" r="2.5" fill="#FFFFFF" />

              {/* Right Cute Big Eye */}
              <circle cx="248" cy="182" r="25" fill="#000000" />
              {/* Star/Bubble Highlights */}
              <circle cx="256" cy="172" r="10" fill="#FFFFFF" />
              <circle cx="238" cy="190" r="5" fill="#FFFFFF" />
              <circle cx="256" cy="192" r="2.5" fill="#FFFFFF" />
            </>
          )}

          {/* GOLD CUTE BULL SNOUT / MUZZLE */}
          <ellipse cx="200" cy="216" rx="42" ry="26" fill="#F59E0B" stroke="#000000" strokeWidth="6" />

          {/* NOSTRILES */}
          <ellipse cx="188" cy="210" rx="4" ry="6" fill="#000000" />
          <ellipse cx="212" cy="210" rx="4" ry="6" fill="#000000" />

          {/* SHINY GOLDEN NOSE RING (THE ABSOLUTE SYMBOL OF BULLOTHY) */}
          <motion.circle 
            cx="200" 
            cy="234" 
            r="15" 
            fill="none" 
            stroke="#FBBF24" 
            strokeWidth="5.5" 
            animate={isPurring ? { rotate: [0, -10, 10, -10, 0] } : undefined}
            transition={{ duration: 0.5, repeat: Infinity }}
          />

          {/* CUTE MOUTH UNDER SNOUT */}
          <path
            d="M 188 222 Q 200 232 212 222"
            stroke="#000000"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />

          {/* ACCESSORIES LAYER */}
          {accessory === 'sunglasses' && (
            <motion.g
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 220, damping: 12 }}
            >
              {/* Dark cool golden-rimmed pixel sunglasses */}
              <path
                d="M 115 168 L 285 168 L 285 192 L 265 192 L 265 180 L 235 180 L 235 192 L 200 192 L 165 192 L 165 180 L 135 180 L 135 192 L 115 192 Z"
                fill="#111115"
                stroke="#FBBF24"
                strokeWidth="4"
              />
              {/* Gold lens shine */}
              <rect x="125" y="174" width="10" height="10" fill="#F59E0B" />
              <rect x="245" y="174" width="10" height="10" fill="#F59E0B" />
            </motion.g>
          )}

          {accessory === 'party-hat' && (
            <motion.g
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transformTemplate={({ scale, rotate }) => `translate(200, 100) scale(${scale}) rotate(${rotate}) translate(-200, -100)`}
              transition={{ type: 'spring', stiffness: 150, damping: 10 }}
            >
              {/* Gold and black striped birthday cone */}
              <path
                d="M 165 110 L 200 15 L 235 110 Z"
                fill="#1E1B18"
                stroke="#FBBF24"
                strokeWidth="5"
                strokeLinejoin="round"
              />
              {/* Shiny Gold Stripes */}
              <path d="M 180 70 L 220 70" stroke="#FBBF24" strokeWidth="6" strokeLinecap="round" />
              <path d="M 170 92 L 230 92" stroke="#FBBF24" strokeWidth="6" strokeLinecap="round" />
              {/* Pom-pom */}
              <circle cx="200" cy="12" r="11" fill="#FBBF24" stroke="#000000" strokeWidth="3.5" />
            </motion.g>
          )}

          {accessory === 'crown' && (
            <motion.g
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 220, damping: 14 }}
            >
              {/* Shiny royal gold crown */}
              <path
                d="M 145 110 L 135 65 L 172 88 L 200 52 L 228 88 L 265 65 L 255 110 Z"
                fill="#FBBF24"
                stroke="#000000"
                strokeWidth="5.5"
                strokeLinejoin="round"
              />
              {/* Ruby Jewels */}
              <circle cx="135" cy="60" r="5" fill="#EF4444" stroke="#000000" strokeWidth="2.5" />
              <circle cx="200" cy="46" r="5" fill="#EF4444" stroke="#000000" strokeWidth="2.5" />
              <circle cx="265" cy="60" r="5" fill="#EF4444" stroke="#000000" strokeWidth="2.5" />
            </motion.g>
          )}

          {accessory === 'propeller-hat' && (
            <motion.g
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transformTemplate={({ scale }) => `translate(200, 100) scale(${scale}) translate(-200, -100)`}
              transition={{ type: 'spring', stiffness: 180, damping: 12 }}
            >
              {/* Propeller hat dome in Gold */}
              <path
                d="M 165 105 C 165 65, 235 65, 235 105 Z"
                fill="#FBBF24"
                stroke="#000000"
                strokeWidth="5.5"
                strokeLinejoin="round"
              />
              {/* Hat peak */}
              <path
                d="M 230 105 L 255 110 Q 250 118 230 115 Z"
                fill="#111115"
                stroke="#000000"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              {/* Propeller shaft */}
              <line x1="200" y1="72" x2="200" y2="48" stroke="#000000" strokeWidth="5.5" strokeLinecap="round" />
              {/* Rotating Propeller blades */}
              <motion.path
                d="M 160 48 L 240 48"
                stroke="#111115"
                strokeWidth="7"
                strokeLinecap="round"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                style={{ originX: '200px', originY: '48px' }}
              />
              {/* Little cap bead */}
              <circle cx="200" cy="48" r="6.5" fill="#FBBF24" stroke="#000000" strokeWidth="3" />
            </motion.g>
          )}
        </g>
      </motion.svg>
    </div>
  );
}
