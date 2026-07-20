/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import SmolCatIllustration from './SmolCatIllustration';
import { playMoo } from '../lib/sound';
import { Sparkles, Download, RefreshCw, Type } from 'lucide-react';

export default function MemeMachine() {
  const [accessory, setAccessory] = useState<'none' | 'party-hat' | 'sunglasses' | 'crown' | 'propeller-hat'>('sunglasses');
  const [caption, setCaption] = useState('BULLOTHY TO THE MOON');
  const [textColor, setTextColor] = useState('#FBBF24');
  const [isHappy, setIsHappy] = useState(false);

  const accessoriesList = [
    { id: 'none', label: 'Classic Bull' },
    { id: 'sunglasses', label: 'Thug Shades' },
    { id: 'party-hat', label: 'Party Horns' },
    { id: 'crown', label: 'Trench King' },
    { id: 'propeller-hat', label: 'Propeller' },
  ] as const;

  const quickCaptions = [
    'BULLOTHY TO THE MOON',
    'SHORT SPINE BIG GAINS',
    'HOLD $bullothy',
    'SOLANA TRENCH BULL',
    'MOO-VING HIGHER',
    'NO MORE BEAR TIMES',
  ];

  const handleDownloadSVG = () => {
    playMoo();
    
    // Assemble premium SVG representation for export
    const accessoryElement = (() => {
      if (accessory === 'sunglasses') {
        return `
          <!-- Sunglasses -->
          <path d="M 115 168 L 285 168 L 285 192 L 265 192 L 265 180 L 235 180 L 235 192 L 200 192 L 165 192 L 165 180 L 135 180 L 135 192 L 115 192 Z" fill="#111115" stroke="#FBBF24" stroke-width="4" />
          <rect x="125" y="174" width="10" height="10" fill="#F59E0B" />
          <rect x="245" y="174" width="10" height="10" fill="#F59E0B" />
        `;
      }
      if (accessory === 'party-hat') {
        return `
          <!-- Party Hat -->
          <path d="M 165 110 L 200 15 L 235 110 Z" fill="#1E1B18" stroke="#FBBF24" stroke-width="5" stroke-linejoin="round" />
          <path d="M 180 70 L 220 70" stroke="#FBBF24" stroke-width="6" stroke-linecap="round" />
          <path d="M 170 92 L 230 92" stroke="#FBBF24" stroke-width="6" stroke-linecap="round" />
          <circle cx="200" cy="12" r="11" fill="#FBBF24" stroke="#000000" stroke-width="3.5" />
        `;
      }
      if (accessory === 'crown') {
        return `
          <!-- Crown -->
          <path d="M 145 110 L 135 65 L 172 88 L 200 52 L 228 88 L 265 65 L 255 110 Z" fill="#FBBF24" stroke="#000000" stroke-width="5.5" stroke-linejoin="round" />
          <circle cx="135" cy="60" r="5" fill="#EF4444" stroke="#000000" stroke-width="2.5" />
          <circle cx="200" cy="46" r="5" fill="#EF4444" stroke="#000000" stroke-width="2.5" />
          <circle cx="265" cy="60" r="5" fill="#EF4444" stroke="#000000" stroke-width="2.5" />
        `;
      }
      if (accessory === 'propeller-hat') {
        return `
          <!-- Propeller Hat -->
          <path d="M 165 105 C 165 65, 235 65, 235 105 Z" fill="#FBBF24" stroke="#000000" stroke-width="5.5" stroke-linejoin="round" />
          <path d="M 230 105 L 255 110 Q 250 118 230 115 Z" fill="#111115" stroke="#000000" stroke-width="3.5" stroke-linejoin="round" />
          <line x1="200" y1="72" x2="200" y2="48" stroke="#000000" stroke-width="5.5" stroke-linecap="round" />
          <path d="M 160 48 L 240 48" stroke="#111115" stroke-width="7" stroke-linecap="round" />
          <circle cx="200" cy="48" r="6.5" fill="#FBBF24" stroke="#000000" stroke-width="3" />
        `;
      }
      return '';
    })();

    const eyesSvg = isHappy
      ? `
          <path d="M 130 188 Q 152 165 174 188" stroke="#000000" stroke-width="9" stroke-linecap="round" fill="none" />
          <path d="M 226 188 Q 248 165 270 188" stroke="#000000" stroke-width="9" stroke-linecap="round" fill="none" />
        `
      : `
          <circle cx="152" cy="182" r="25" fill="#000000" />
          <circle cx="160" cy="172" r="10" fill="#FFFFFF" />
          <circle cx="142" cy="190" r="5" fill="#FFFFFF" />
          <circle cx="248" cy="182" r="25" fill="#000000" />
          <circle cx="256" cy="172" r="10" fill="#FFFFFF" />
          <circle cx="238" cy="190" r="5" fill="#FFFFFF" />
        `;

    const fullSvgContent = `
<svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Rounded Sleek Charcoal Frame -->
  <rect width="600" height="600" rx="36" fill="#141416" stroke="#FBBF24" stroke-width="12" />
  
  <!-- Subtle Golden Grid Dots Pattern -->
  <circle cx="80" cy="120" r="4" fill="#FBBF24" opacity="0.3" />
  <circle cx="120" cy="80" r="4" fill="#FBBF24" opacity="0.3" />
  <circle cx="480" cy="120" r="4" fill="#FBBF24" opacity="0.3" />
  <circle cx="520" cy="80" r="4" fill="#FBBF24" opacity="0.3" />
  
  <g transform="translate(100, 70)">
    <!-- Shadow under Bullothy -->
    <ellipse cx="200" cy="375" rx="110" ry="14" fill="#000000" fill-opacity="0.6" />

    <!-- Tail -->
    <path d="M 110 320 C 80 320, 60 290, 70 260 C 72 250, 85 250, 85 262 C 80 280, 92 295, 110 295" stroke="#1E1B18" stroke-width="8" stroke-linecap="round" fill="none" />
    <circle cx="68" cy="260" r="10" fill="#FBBF24" stroke="#000000" stroke-width="3" />

    <!-- Feet -->
    <rect x="135" y="325" width="45" height="42" rx="10" fill="#1E1B18" stroke="#000000" stroke-width="7" />
    <path d="M 135 352 Q 157.5 348 180 352 L 180 367 L 135 367 Z" fill="#FBBF24" stroke="#000000" stroke-width="4" />
    <rect x="220" y="325" width="45" height="42" rx="10" fill="#1E1B18" stroke="#000000" stroke-width="7" />
    <path d="M 220 352 Q 242.5 348 265 352 L 265 367 L 220 367 Z" fill="#FBBF24" stroke="#000000" stroke-width="4" />

    <!-- Compressed body -->
    <path d="M 105 315 C 100 240, 300 240, 295 315 C 290 345, 110 345, 105 315 Z" fill="#111115" stroke="#000000" stroke-width="8" stroke-linejoin="round" />
    <path d="M 140 255 Q 200 290 260 255" stroke="#FBBF24" stroke-width="7" fill="none" stroke-linecap="round" />
    <circle cx="200" cy="282" r="14" fill="#FBBF24" stroke="#000000" stroke-width="4" />
    <text x="200" y="287" font-family="monospace" font-weight="900" font-size="15" fill="#000000" text-anchor="middle">$</text>

    <!-- Horns -->
    <path d="M 135 150 C 110 110, 80 110, 60 125 C 80 145, 105 165, 122 172" fill="#FBBF24" stroke="#000000" stroke-width="7" stroke-linejoin="round" />
    <path d="M 265 150 C 290 110, 320 110, 340 125 C 320 145, 295 165, 278 172" fill="#FBBF24" stroke="#000000" stroke-width="7" stroke-linejoin="round" />

    <!-- Head & Ears -->
    <g transform="translate(0, 15)">
      <path d="M 115 190 C 110 100, 290 100, 285 190 C 280 245, 120 245, 115 190 Z" fill="#1E1B18" stroke="#000000" stroke-width="8" stroke-linejoin="round" />
      <path d="M 120 160 C 80 150, 70 185, 95 195 Z" fill="#111115" stroke="#000000" stroke-width="6" stroke-linejoin="round" />
      <path d="M 280 160 C 320 150, 330 185, 305 195 Z" fill="#111115" stroke="#000000" stroke-width="6" stroke-linejoin="round" />
      
      <ellipse cx="145" cy="205" rx="14" ry="8" fill="#EF4444" fill-opacity="0.45" />
      <ellipse cx="255" cy="205" rx="14" ry="8" fill="#EF4444" fill-opacity="0.45" />

      <!-- Eyes -->
      ${eyesSvg}

      <!-- Snout -->
      <ellipse cx="200" cy="216" rx="42" ry="26" fill="#F59E0B" stroke="#000000" stroke-width="6" />
      <ellipse cx="188" cy="210" rx="4" ry="6" fill="#000000" />
      <ellipse cx="212" cy="210" rx="4" ry="6" fill="#000000" />
      
      <!-- Nose Ring -->
      <circle cx="200" cy="234" r="15" fill="none" stroke="#FBBF24" stroke-width="5.5" />
      <path d="M 188 222 Q 200 232 212 222" stroke="#000000" stroke-width="4" stroke-linecap="round" fill="none" />

      <!-- Accessory -->
      ${accessoryElement}
    </g>
  </g>

  <!-- High-end black-and-gold bottom plate for Meme Caption -->
  <rect x="50" y="470" width="500" height="70" rx="20" fill="#1E1E22" stroke="#FBBF24" stroke-width="6" />
  <text x="300" y="516" font-family="sans-serif" font-weight="900" font-size="26" fill="${textColor}" stroke="#000000" stroke-width="1.5" text-anchor="middle">
    ${caption.toUpperCase()}
  </text>
</svg>
    `.trim();

    const blob = new Blob([fullSvgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bullothy_sticker_${caption.toLowerCase().replace(/\s+/g, '_')}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div id="memes-studio" className="grid md:grid-cols-2 gap-8 items-stretch">
      {/* Visual Workspace Card */}
      <div className="bubble-card bg-[#15151A] border-2 border-amber-500/20 hover:border-amber-500/40 p-6 flex flex-col justify-between relative rounded-3xl transition-all duration-300">
        <div className="absolute top-4 left-4 bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
          LIVE WORKSPACE
        </div>
        
        {/* Bullothy Frame */}
        <div className="flex-1 flex items-center justify-center p-4 mt-6">
          <div className="w-64 h-64 md:w-80 md:h-80 relative bg-black/60 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center">
            {/* Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#F59E0B_2px,transparent_2px)] [background-size:16px_16px]"></div>
            
            <SmolCatIllustration 
              accessory={accessory}
              isHappy={isHappy}
              isPurring={false}
              className="w-56 h-56 md:w-72 md:h-72"
            />

            {/* Custom Overlay text on card bottom */}
            <div className="absolute bottom-3 left-3 right-3 bg-[#111115]/95 border border-amber-500/30 rounded-xl py-1.5 px-3 text-center shadow-md">
              <span 
                className="font-sans font-black text-sm tracking-wide block truncate uppercase"
                style={{ color: textColor }}
              >
                {caption || "BULLOTHY"}
              </span>
            </div>
          </div>
        </div>

        {/* Action button */}
        <button 
          onClick={handleDownloadSVG}
          className="bg-amber-400 hover:bg-amber-300 text-black font-black text-base py-3.5 px-6 rounded-2xl flex items-center justify-center gap-3 w-full cursor-pointer transition-all duration-200 active:translate-y-[1px] shadow-[0_4px_20px_rgba(245,158,11,0.25)] mt-4"
        >
          <Download size={20} />
          DOWNLOAD VECTOR STICKER
        </button>
      </div>

      {/* Control Panel Card */}
      <div className="bg-[#111115]/90 border border-white/10 p-6 md:p-8 flex flex-col justify-between rounded-3xl relative">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:20px_20px] rounded-3xl"></div>
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-amber-400" size={24} />
            <h3 className="font-sans font-black text-2xl text-white tracking-tight uppercase">STAMP DESIGNER</h3>
          </div>
          <p className="text-sm text-white/70 mb-6 leading-relaxed font-semibold">
            Dress up Bullothy with rare attributes, add your customized Solana battle phrase, and export a crisp vector sticker instantly.
          </p>

          {/* Step 1: Accessories */}
          <div className="mb-6">
            <span className="block text-xs font-mono font-bold uppercase tracking-wider text-amber-400/80 mb-3">
              1. Choose Head Attribute
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {accessoriesList.map((acc) => (
                <button
                  key={acc.id}
                  onClick={() => {
                    playMoo();
                    setAccessory(acc.id);
                  }}
                  className={`py-2 px-3 rounded-xl border font-sans text-xs font-black uppercase transition-all duration-150 cursor-pointer ${
                    accessory === acc.id
                      ? 'bg-amber-400 text-black border-transparent shadow-md'
                      : 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10'
                  }`}
                >
                  {acc.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Custom Caption */}
          <div className="mb-6">
            <span className="block text-xs font-mono font-bold uppercase tracking-wider text-amber-400/80 mb-3">
              2. Custom Meme Text
            </span>
            <div className="relative">
              <Type className="absolute left-3.5 top-3.5 text-white/40" size={18} />
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value.substring(0, 30))}
                placeholder="Type your meme phrase..."
                className="w-full bg-black/40 border border-white/10 text-white rounded-xl py-3 pl-10 pr-4 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder-white/30 font-bold"
              />
            </div>

            {/* Quick Caption Suggestions */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {quickCaptions.map((phrase) => (
                <button
                  key={phrase}
                  onClick={() => {
                    playMoo();
                    setCaption(phrase);
                  }}
                  className="bg-white/5 hover:bg-white/10 text-xs text-white/80 px-2.5 py-1 rounded-lg border border-white/10 font-bold uppercase cursor-pointer transition-all duration-150"
                >
                  {phrase}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Color and Mood */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <span className="block text-xs font-mono font-bold uppercase tracking-wider text-amber-400/80 mb-3">
                3. Text Accent Color
              </span>
              <div className="flex gap-2">
                {['#FBBF24', '#FFFFFF', '#14F195', '#E11D48', '#38BDF8'].map((color) => (
                  <button
                    key={color}
                    onClick={() => setTextColor(color)}
                    style={{ backgroundColor: color }}
                    className={`w-8 h-8 rounded-full border border-black transition-all duration-150 cursor-pointer ${
                      textColor === color ? 'scale-110 ring-2 ring-offset-2 ring-amber-400 ring-offset-black' : 'opacity-80 hover:opacity-100'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div>
              <span className="block text-xs font-mono font-bold uppercase tracking-wider text-amber-400/80 mb-3">
                4. Mood Expression
              </span>
              <button
                onClick={() => {
                  playMoo();
                  setIsHappy(!isHappy);
                }}
                className={`w-full py-1.5 px-3 rounded-xl border font-sans text-xs font-black uppercase flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer ${
                  isHappy 
                    ? 'bg-amber-400/20 text-amber-400 border-amber-400/40' 
                    : 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10'
                }`}
              >
                <RefreshCw size={14} />
                {isHappy ? 'Happy Wink' : 'Big Cute Eyes'}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-dashed border-white/10 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-400/10 flex items-center justify-center border border-white/10 text-amber-400 shrink-0 font-black font-mono">
            i
          </div>
          <p className="text-xs text-white/60 leading-relaxed font-semibold">
            Each Bullothy SVG sticker is beautifully scalable. Use them as stickers in Telegram, Discord, print them onto merch, or scale them up for high-vibe Web3 profiles!
          </p>
        </div>
      </div>
    </div>
  );
}
