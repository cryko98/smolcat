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
  
  // Custom wiggle vibration for purring
  const wiggleTransition = isPurring
    ? {
        x: {
          type: "spring",
          stiffness: 1000,
          damping: 2,
          repeat: Infinity,
          duration: 0.1,
        },
        y: {
          type: "spring",
          stiffness: 1000,
          damping: 2,
          repeat: Infinity,
          duration: 0.1,
        },
      }
    : undefined;

  const wiggleAnimate = isPurring
    ? {
        x: [0, -1, 1, -1, 0],
        y: [0, 1, -1, 1, 0],
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
        className="w-full h-full drop-shadow-[0_8px_16px_rgba(27,22,37,0.15)]"
      >
        {/* Shadow under the cat */}
        <ellipse cx="200" cy="370" rx="100" ry="12" fill="#E4DBFF" />

        {/* CAT TAIL */}
        <path
          d="M 120 320 C 70 300, 60 220, 80 200 C 95 185, 110 210, 100 230 C 90 250, 100 290, 140 310"
          stroke="#1B1625"
          strokeWidth="10"
          strokeLinecap="round"
          fill="#3D3B40"
        />

        {/* BACK LEGS & FEET */}
        {/* Left foot */}
        <rect x="150" y="340" width="45" height="25" rx="12" fill="#3D3B40" stroke="#1B1625" strokeWidth="8" />
        {/* Right foot */}
        <rect x="215" y="340" width="45" height="25" rx="12" fill="#3D3B40" stroke="#1B1625" strokeWidth="8" />

        {/* SWEATER BODY */}
        <motion.path
          d="M 115 315 C 110 220, 290 220, 285 315 C 280 355, 120 355, 115 315 Z"
          fill="#0B5BF0"
          stroke="#1B1625"
          strokeWidth="8"
          strokeLinejoin="round"
        />

        {/* Sleeves / Arms detail */}
        {/* Left sleeve lines */}
        <path
          d="M 130 270 C 135 300, 135 320, 135 325"
          stroke="#1B1625"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* Left paw cap */}
        <path
          d="M 125 325 C 125 330, 145 330, 145 325"
          stroke="#1B1625"
          strokeWidth="6"
          strokeLinecap="round"
          fill="#3D3B40"
        />

        {/* Right sleeve lines */}
        <path
          d="M 270 270 C 265 300, 265 320, 265 325"
          stroke="#1B1625"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* Right paw cap */}
        <path
          d="M 255 325 C 255 330, 275 330, 275 325"
          stroke="#1B1625"
          strokeWidth="6"
          strokeLinecap="round"
          fill="#3D3B40"
        />

        {/* HEAD AND FACE GROUP - Moved down to sit snugly on the body */}
        <g transform="translate(0, 22)">
          {/* CAT HEAD */}
          <motion.path
            d="M 120 180 C 115 90, 285 90, 280 180 C 275 230, 125 230, 120 180 Z"
            fill="#3D3B40"
            stroke="#1B1625"
            strokeWidth="8"
            strokeLinejoin="round"
          />

          {/* EARS */}
          {/* Left Ear */}
          <path
            d="M 125 125 L 120 60 C 120 50, 135 55, 145 70 L 165 105"
            fill="#3D3B40"
            stroke="#1B1625"
            strokeWidth="8"
            strokeLinejoin="round"
          />
          <path
            d="M 131 115 L 128 75 C 128 70, 137 73, 143 81 L 155 103"
            fill="#FFB4B4"
            stroke="#1B1625"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          {/* Right Ear */}
          <path
            d="M 275 125 L 280 60 C 280 50, 265 55, 255 70 L 235 105"
            fill="#3D3B40"
            stroke="#1B1625"
            strokeWidth="8"
            strokeLinejoin="round"
          />
          <path
            d="M 269 115 L 272 75 C 272 70, 263 73, 257 81 L 245 103"
            fill="#FFB4B4"
            stroke="#1B1625"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          {/* CAT WHISKERS */}
          {/* Left whiskers */}
          <path d="M 115 170 L 80 165" stroke="#1B1625" strokeWidth="6" strokeLinecap="round" />
          <path d="M 110 180 L 75 180" stroke="#1B1625" strokeWidth="6" strokeLinecap="round" />
          <path d="M 115 190 L 80 195" stroke="#1B1625" strokeWidth="6" strokeLinecap="round" />

          {/* Right whiskers */}
          <path d="M 285 170 L 320 165" stroke="#1B1625" strokeWidth="6" strokeLinecap="round" />
          <path d="M 290 180 L 325 180" stroke="#1B1625" strokeWidth="6" strokeLinecap="round" />
          <path d="M 285 190 L 320 195" stroke="#1B1625" strokeWidth="6" strokeLinecap="round" />

          {/* BLUSH CHEEKS */}
          <ellipse cx="150" cy="190" rx="12" ry="7" fill="#FF9E9E" fillOpacity="0.6" />
          <ellipse cx="250" cy="190" rx="12" ry="7" fill="#FF9E9E" fillOpacity="0.6" />

          {/* CAT EYES */}
          {isHappy ? (
            <>
              {/* Left Eye (Happy Curve) */}
              <path
                d="M 135 175 Q 155 155 175 175"
                stroke="#1B1625"
                strokeWidth="10"
                strokeLinecap="round"
                fill="none"
              />
              {/* Right Eye (Happy Curve) */}
              <path
                d="M 225 175 Q 245 155 265 175"
                stroke="#1B1625"
                strokeWidth="10"
                strokeLinecap="round"
                fill="none"
              />
            </>
          ) : (
            <>
              {/* Left Eye */}
              <circle cx="155" cy="170" r="26" fill="#1B1625" />
              {/* Highlights */}
              <circle cx="163" cy="160" r="10" fill="white" />
              <circle cx="147" cy="178" r="4" fill="white" />

              {/* Right Eye */}
              <circle cx="245" cy="170" r="26" fill="#1B1625" />
              {/* Highlights */}
              <circle cx="253" cy="160" r="10" fill="white" />
              <circle cx="237" cy="178" r="4" fill="white" />
            </>
          )}

          {/* NOSE */}
          <path
            d="M 195 185 L 205 185 L 200 191 Z"
            fill="#FF9E9E"
            stroke="#1B1625"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          {/* MOUTH */}
          <path
            d="M 190 194 Q 197 201 200 196 Q 203 201 210 194"
            stroke="#1B1625"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />

          {/* ACCESSORIES LAYER */}
          {accessory === 'sunglasses' && (
            <motion.g
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 12 }}
            >
              {/* Dark cool pixel sunglasses */}
              <path
                d="M 120 155 L 280 155 L 280 178 L 260 178 L 260 167 L 230 167 L 230 178 L 200 178 L 170 178 L 170 167 L 140 167 L 140 178 L 120 178 Z"
                fill="#1B1625"
                stroke="white"
                strokeWidth="4"
              />
              {/* Glossy lens effects */}
              <rect x="130" y="160" width="8" height="8" fill="#0B5BF0" />
              <rect x="240" y="160" width="8" height="8" fill="#0B5BF0" />
            </motion.g>
          )}

          {accessory === 'party-hat' && (
            <motion.g
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transformTemplate={({ scale, rotate }) => `translate(200, 75) scale(${scale}) rotate(${rotate}) translate(-200, -75)`}
              transition={{ type: 'spring', stiffness: 150, damping: 10 }}
            >
              {/* Colorful striped birthday cone */}
              <path
                d="M 160 90 L 200 10 L 240 90 Z"
                fill="#FFB4B4"
                stroke="#1B1625"
                strokeWidth="6"
                strokeLinejoin="round"
              />
              {/* Striped patterns */}
              <path d="M 180 50 L 220 50" stroke="#0B5BF0" strokeWidth="6" strokeLinecap="round" />
              <path d="M 170 70 L 230 70" stroke="#FFFFB4" strokeWidth="6" strokeLinecap="round" />
              {/* Pom-pom */}
              <circle cx="200" cy="5" r="12" fill="#0B5BF0" stroke="#1B1625" strokeWidth="4" />
            </motion.g>
          )}

          {accessory === 'crown' && (
            <motion.g
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              {/* Shiny gold crown */}
              <path
                d="M 150 90 L 140 50 L 175 70 L 200 40 L 225 70 L 260 50 L 250 90 Z"
                fill="#FFFF80"
                stroke="#1B1625"
                strokeWidth="6"
                strokeLinejoin="round"
              />
              {/* Little jewels */}
              <circle cx="140" cy="45" r="5" fill="#0B5BF0" stroke="#1B1625" strokeWidth="3" />
              <circle cx="200" cy="35" r="5" fill="#FF6666" stroke="#1B1625" strokeWidth="3" />
              <circle cx="260" cy="45" r="5" fill="#0B5BF0" stroke="#1B1625" strokeWidth="3" />
              <rect x="193" y="68" width="14" height="10" rx="3" fill="#0B5BF0" stroke="#1B1625" strokeWidth="2" />
            </motion.g>
          )}

          {accessory === 'propeller-hat' && (
            <motion.g
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transformTemplate={({ scale }) => `translate(200, 75) scale(${scale}) translate(-200, -75)`}
              transition={{ type: 'spring', stiffness: 180, damping: 12 }}
            >
              {/* Propeller hat dome */}
              <path
                d="M 160 85 C 160 50, 240 50, 240 85 Z"
                fill="#FF6666"
                stroke="#1B1625"
                strokeWidth="6"
                strokeLinejoin="round"
              />
              {/* Hat peak */}
              <path
                d="M 235 85 L 260 90 C 260 90, 255 98, 235 95 Z"
                fill="#0B5BF0"
                stroke="#1B1625"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              {/* Propeller shaft */}
              <line x1="200" y1="55" x2="200" y2="35" stroke="#1B1625" strokeWidth="6" strokeLinecap="round" />
              {/* Rotating Propeller blades */}
              <motion.path
                d="M 160 35 L 240 35"
                stroke="#FFFF80"
                strokeWidth="8"
                strokeLinecap="round"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                style={{ originX: '200px', originY: '35px' }}
              />
              {/* Little cap bead */}
              <circle cx="200" cy="35" r="6" fill="#0B5BF0" stroke="#1B1625" strokeWidth="3" />
            </motion.g>
          )}
        </g>
      </motion.svg>
    </div>
  );
}
