/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import SmolCatIllustration from './SmolCatIllustration';
import { playMeow } from '../lib/sound';
import { Sparkles, Download, RefreshCw, Type, Palette } from 'lucide-react';

export default function MemeMachine() {
  const [accessory, setAccessory] = useState<'none' | 'party-hat' | 'sunglasses' | 'crown' | 'propeller-hat'>('sunglasses');
  const [caption, setCaption] = useState('SAVE THE TRENCHES');
  const [textColor, setTextColor] = useState('#0B5BF0');
  const [isHappy, setIsHappy] = useState(false);

  const accessoriesList = [
    { id: 'none', label: 'Classic' },
    { id: 'sunglasses', label: 'Cool Shades' },
    { id: 'party-hat', label: 'Party Cone' },
    { id: 'crown', label: 'Trench King' },
    { id: 'propeller-hat', label: 'Propeller' },
  ] as const;

  const quickCaptions = [
    'SAVE THE TRENCHES',
    'SMOL BUT POWERFUL',
    'HAPPY TRADERS ONLY',
    'HOLD $smolcat',
    'COMMUNITY IS SMOL',
    'NO MORE RECT TIMES',
  ];

  const handleDownloadSVG = () => {
    playMeow();
    
    // Assemble custom SVG representation for export
    const accessoryElement = (() => {
      if (accessory === 'sunglasses') {
        return `
          <!-- Sunglasses -->
          <path d="M 120 155 L 280 155 L 280 178 L 260 178 L 260 167 L 230 167 L 230 178 L 200 178 L 170 178 L 170 167 L 140 167 L 140 178 L 120 178 Z" fill="#1B1625" stroke="white" stroke-width="4" />
          <rect x="130" y="160" width="8" height="8" fill="#0B5BF0" />
          <rect x="240" y="160" width="8" height="8" fill="#0B5BF0" />
        `;
      }
      if (accessory === 'party-hat') {
        return `
          <!-- Party Hat -->
          <path d="M 160 90 L 200 10 L 240 90 Z" fill="#FFB4B4" stroke="#1B1625" stroke-width="6" stroke-linejoin="round" />
          <path d="M 180 50 L 220 50" stroke="#0B5BF0" stroke-width="6" stroke-linecap="round" />
          <path d="M 170 70 L 230 70" stroke="#FFFFB4" stroke-width="6" stroke-linecap="round" />
          <circle cx="200" cy="5" r="12" fill="#0B5BF0" stroke="#1B1625" stroke-width="4" />
        `;
      }
      if (accessory === 'crown') {
        return `
          <!-- Crown -->
          <path d="M 150 90 L 140 50 L 175 70 L 200 40 L 225 70 L 260 50 L 250 90 Z" fill="#FFFF80" stroke="#1B1625" stroke-width="6" stroke-linejoin="round" />
          <circle cx="140" cy="45" r="5" fill="#0B5BF0" stroke="#1B1625" stroke-width="3" />
          <circle cx="200" cy="35" r="5" fill="#FF6666" stroke="#1B1625" stroke-width="3" />
          <circle cx="260" cy="45" r="5" fill="#0B5BF0" stroke="#1B1625" stroke-width="3" />
        `;
      }
      if (accessory === 'propeller-hat') {
        return `
          <!-- Propeller Hat -->
          <path d="M 160 85 C 160 50, 240 50, 240 85 Z" fill="#FF6666" stroke="#1B1625" stroke-width="6" stroke-linejoin="round" />
          <path d="M 235 85 L 260 90 C 260 90, 255 98, 235 95 Z" fill="#0B5BF0" stroke="#1B1625" stroke-width="4" stroke-linejoin="round" />
          <line x1="200" y1="55" x2="200" y2="35" stroke="#1B1625" stroke-width="6" stroke-linecap="round" />
          <path d="M 160 35 L 240 35" stroke="#FFFF80" stroke-width="8" stroke-linecap="round" />
          <circle cx="200" cy="35" r="6" fill="#0B5BF0" stroke="#1B1625" stroke-width="3" />
        `;
      }
      return '';
    })();

    const eyesSvg = isHappy
      ? `
          <path d="M 135 175 Q 155 155 175 175" stroke="#1B1625" stroke-width="10" stroke-linecap="round" fill="none" />
          <path d="M 225 175 Q 245 155 265 175" stroke="#1B1625" stroke-width="10" stroke-linecap="round" fill="none" />
        `
      : `
          <circle cx="155" cy="170" r="26" fill="#1B1625" />
          <circle cx="163" cy="160" r="10" fill="white" />
          <circle cx="147" cy="178" r="4" fill="white" />
          <circle cx="245" cy="170" r="26" fill="#1B1625" />
          <circle cx="253" cy="160" r="10" fill="white" />
          <circle cx="237" cy="178" r="4" fill="white" />
        `;

    const fullSvgContent = `
<svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Rounded Purple Frame -->
  <rect width="600" height="600" rx="36" fill="#E4DBFF" stroke="#1B1625" stroke-width="12" />
  
  <!-- Subtle Paw Prints Pattern -->
  <circle cx="80" cy="120" r="14" fill="#C5B4FF" />
  <circle cx="65" cy="98" r="8" fill="#C5B4FF" />
  <circle cx="80" cy="92" r="8" fill="#C5B4FF" />
  <circle cx="95" cy="98" r="8" fill="#C5B4FF" />

  <circle cx="520" cy="480" r="14" fill="#C5B4FF" />
  <circle cx="505" cy="458" r="8" fill="#C5B4FF" />
  <circle cx="520" cy="452" r="8" fill="#C5B4FF" />
  <circle cx="535" cy="458" r="8" fill="#C5B4FF" />

  <!-- Shifted CAT Drawing to Center at Y:100-500 -->
  <g transform="translate(100, 80)">
    <!-- Shadow -->
    <ellipse cx="200" cy="370" rx="100" ry="12" fill="#C5B4FF" />
    
    <!-- Tail -->
    <path d="M 120 320 C 70 300, 60 220, 80 200 C 95 185, 110 210, 100 230 C 90 250, 100 290, 140 310" stroke="#1B1625" stroke-width="10" stroke-linecap="round" fill="#3D3B40" />
    
    <!-- Back legs -->
    <rect x="150" y="340" width="45" height="25" rx="12" fill="#3D3B40" stroke="#1B1625" stroke-width="8" />
    <rect x="215" y="340" width="45" height="25" rx="12" fill="#3D3B40" stroke="#1B1625" stroke-width="8" />

    <!-- Sweater body -->
    <path d="M 115 315 C 110 220, 290 220, 285 315 C 280 355, 120 355, 115 315 Z" fill="#0B5BF0" stroke="#1B1625" stroke-width="8" stroke-linejoin="round" />
    <path d="M 130 270 C 135 300, 135 320, 135 325" stroke="#1B1625" stroke-width="6" stroke-linecap="round" />
    <path d="M 125 325 C 125 330, 145 330, 145 325" stroke="#1B1625" stroke-width="6" stroke-linecap="round" fill="#3D3B40" />
    <path d="M 270 270 C 265 300, 265 320, 265 325" stroke="#1B1625" stroke-width="6" stroke-linecap="round" />
    <path d="M 255 325 C 255 330, 275 330, 275 325" stroke="#1B1625" stroke-width="6" stroke-linecap="round" fill="#3D3B40" />

    <!-- Head -->
    <path d="M 120 180 C 115 90, 285 90, 280 180 C 275 230, 125 230, 120 180 Z" fill="#3D3B40" stroke="#1B1625" stroke-width="8" stroke-linejoin="round" />

    <!-- Ears -->
    <path d="M 125 125 L 120 60 C 120 50, 135 55, 145 70 L 165 105" fill="#3D3B40" stroke="#1B1625" stroke-width="8" stroke-linejoin="round" />
    <path d="M 131 115 L 128 75 C 128 70, 137 73, 143 81 L 155 103" fill="#FFB4B4" stroke="#1B1625" stroke-width="4" stroke-linejoin="round" />
    <path d="M 275 125 L 280 60 C 280 50, 265 55, 255 70 L 235 105" fill="#3D3B40" stroke="#1B1625" stroke-width="8" stroke-linejoin="round" />
    <path d="M 269 115 L 272 75 C 272 70, 263 73, 257 81 L 245 103" fill="#FFB4B4" stroke="#1B1625" stroke-width="4" stroke-linejoin="round" />

    <!-- Whiskers -->
    <path d="M 115 170 L 80 165" stroke="#1B1625" stroke-width="6" stroke-linecap="round" />
    <path d="M 110 180 L 75 180" stroke="#1B1625" stroke-width="6" stroke-linecap="round" />
    <path d="M 115 190 L 80 195" stroke="#1B1625" stroke-width="6" stroke-linecap="round" />
    <path d="M 285 170 L 320 165" stroke="#1B1625" stroke-width="6" stroke-linecap="round" />
    <path d="M 290 180 L 325 180" stroke="#1B1625" stroke-width="6" stroke-linecap="round" />
    <path d="M 285 190 L 320 195" stroke="#1B1625" stroke-width="6" stroke-linecap="round" />

    <!-- Blush cheeks -->
    <ellipse cx="150" cy="190" rx="12" ry="7" fill="#FF9E9E" fill-opacity="0.6" />
    <ellipse cx="250" cy="190" rx="12" ry="7" fill="#FF9E9E" fill-opacity="0.6" />

    <!-- Eyes -->
    ${eyesSvg}

    <!-- Nose -->
    <path d="M 195 185 L 205 185 L 200 191 Z" fill="#FF9E9E" stroke="#1B1625" stroke-width="4" stroke-linejoin="round" />

    <!-- Mouth -->
    <path d="M 190 194 Q 197 201 200 196 Q 203 201 210 194" stroke="#1B1625" stroke-width="5" stroke-linecap="round" fill="none" />

    <!-- Accessory -->
    ${accessoryElement}
  </g>

  <!-- Overlay text -->
  <rect x="50" y="470" width="500" height="70" rx="20" fill="#FFFFFF" stroke="#1B1625" stroke-width="6" />
  <text x="300" y="516" font-family="'Comfortaa', sans-serif" font-weight="900" font-size="28" fill="${textColor}" stroke="#1B1625" stroke-width="2" text-anchor="middle">
    ${caption.toUpperCase()}
  </text>
</svg>
    `.trim();

    const blob = new Blob([fullSvgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `smol_cat_${caption.toLowerCase().replace(/\s+/g, '_')}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 items-stretch">
      {/* Visual Workspace Card */}
      <div className="bubble-card p-6 flex flex-col justify-between relative bg-white">
        <div className="absolute top-4 left-4 bg-[#0B5BF0] text-white font-mono text-xs px-2.5 py-1 rounded-full border-2 border-[#1B1625] font-bold">
          LIVE WORKSPACE
        </div>
        
        {/* Cat Frame */}
        <div className="flex-1 flex items-center justify-center p-4 mt-6">
          <div className="w-64 h-64 md:w-80 md:h-80 relative bg-[#e4dbff] border-4 border-[#1B1625] rounded-3xl overflow-hidden shadow-inner flex items-center justify-center">
            {/* Pattern */}
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#1b1625_2px,transparent_2px)] [background-size:16px_16px]"></div>
            
            <SmolCatIllustration 
              accessory={accessory}
              isHappy={isHappy}
              isPurring={false}
              className="w-56 h-56 md:w-72 md:h-72"
            />

            {/* Custom Overlay text on card bottom */}
            <div className="absolute bottom-3 left-3 right-3 bg-white border-2 border-[#1B1625] rounded-xl py-1.5 px-3 text-center shadow-sm">
              <span 
                className="font-bubble font-bold text-sm tracking-wide block truncate"
                style={{ color: textColor }}
              >
                {caption || "SMOL CAT"}
              </span>
            </div>
          </div>
        </div>

        {/* Action button */}
        <button 
          onClick={handleDownloadSVG}
          className="bubble-btn bg-[#0B5BF0] hover:bg-[#0747be] text-white font-bubble font-bold text-lg py-3.5 px-6 flex items-center justify-center gap-3 w-full"
        >
          <Download size={20} />
          DOWNLOAD MEME AS SVG
        </button>
      </div>

      {/* Control Panel Card */}
      <div className="bubble-card-purple p-6 md:p-8 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-[#0B5BF0]" size={24} />
            <h3 className="font-bubble font-bold text-2xl text-[#1B1625]">DESIGN STUDIO</h3>
          </div>
          <p className="text-sm text-[#4c3d69] mb-6 leading-relaxed">
            Dress up smol cat, add your custom text to save the Solana trenches, and export a high-quality SVG sticker instantly.
          </p>

          {/* Step 1: Accessories */}
          <div className="mb-6">
            <span className="block text-xs font-mono font-bold uppercase tracking-wider text-[#4c3d69] mb-3">
              1. Choose Head Accessory
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {accessoriesList.map((acc) => (
                <button
                  key={acc.id}
                  onClick={() => {
                    playMeow();
                    setAccessory(acc.id);
                  }}
                  className={`py-2 px-3 rounded-xl border-2 font-bubble text-sm font-semibold transition-all ${
                    accessory === acc.id
                      ? 'bg-[#0B5BF0] text-white border-[#1B1625] shadow-sm'
                      : 'bg-white text-[#1B1625] border-[#1B1625] hover:bg-slate-50'
                  }`}
                >
                  {acc.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Custom Caption */}
          <div className="mb-6">
            <span className="block text-xs font-mono font-bold uppercase tracking-wider text-[#4c3d69] mb-3">
              2. Add Custom Text
            </span>
            <div className="relative">
              <Type className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value.substring(0, 30))}
                placeholder="Type your meme phrase..."
                className="w-full bg-white border-2 border-[#1B1625] rounded-xl py-3 pl-10 pr-4 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#0B5BF0] placeholder-gray-400 font-bold"
              />
            </div>

            {/* Quick Caption Suggestions */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {quickCaptions.map((phrase) => (
                <button
                  key={phrase}
                  onClick={() => {
                    playMeow();
                    setCaption(phrase);
                  }}
                  className="bg-white/60 hover:bg-white text-xs text-[#1B1625] px-2.5 py-1 rounded-lg border border-[#1B1625]/20 font-semibold"
                >
                  {phrase}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Color and Mood */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <span className="block text-xs font-mono font-bold uppercase tracking-wider text-[#4c3d69] mb-3">
                3. Text Color
              </span>
              <div className="flex gap-2">
                {['#0B5BF0', '#E11D48', '#059669', '#1B1625', '#7C3AED'].map((color) => (
                  <button
                    key={color}
                    onClick={() => setTextColor(color)}
                    style={{ backgroundColor: color }}
                    className={`w-8 h-8 rounded-full border-2 border-[#1B1625] transition-all ${
                      textColor === color ? 'scale-110 ring-2 ring-offset-1 ring-[#0B5BF0]' : 'opacity-80 hover:opacity-100'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div>
              <span className="block text-xs font-mono font-bold uppercase tracking-wider text-[#4c3d69] mb-3">
                4. Face Mood
              </span>
              <button
                onClick={() => {
                  playMeow();
                  setIsHappy(!isHappy);
                }}
                className={`w-full py-1.5 px-3 rounded-xl border-2 font-bubble text-sm font-semibold flex items-center justify-center gap-2 transition-all bg-white border-[#1B1625] hover:bg-slate-50 ${
                  isHappy ? 'bg-amber-100' : ''
                }`}
              >
                <RefreshCw size={14} />
                {isHappy ? 'Happy Smile' : 'Big Cute Eyes'}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white/40 border-2 border-dashed border-[#1B1625]/30 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#0B5BF0]/10 flex items-center justify-center border border-[#0B5BF0]/20 text-[#0B5BF0] shrink-0 font-bold font-mono">
            i
          </div>
          <p className="text-xs text-[#4c3d69] leading-relaxed font-semibold">
            Did you know? Every SVG export is fully scalable and vector-based. It means your custom smol cat sticker is ready to be printed on hoodies, caps, or scaled up for billboard campaigns!
          </p>
        </div>
      </div>
    </div>
  );
}
