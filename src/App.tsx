/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Copy, 
  Check, 
  ExternalLink, 
  Volume2, 
  Heart, 
  Coins, 
  ShieldAlert, 
  ArrowUpRight, 
  Compass, 
  Cat, 
  Share2, 
  Info,
  ChevronRight
} from 'lucide-react';
import { playMeow, playPurr } from './lib/sound';
import SmolCatIllustration from './components/SmolCatIllustration';
import MemeMachine from './components/MemeMachine';
import TrenchSaverGame from './components/TrenchSaverGame';

function PawPrint({ className = '', size = 60, opacity = 0.25, rotate = 0 }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="#9275f0" 
      style={{ opacity, transform: `rotate(${rotate}deg)` }}
      className={className}
    >
      {/* Large bottom pad */}
      <path d="M 50,55 C 32,55 28,78 35,88 C 42,98 58,98 65,88 C 72,78 68,55 50,55 Z" />
      {/* Toe 1 (leftmost) */}
      <ellipse cx="23" cy="42" rx="7" ry="10" transform="rotate(-30, 23, 42)" />
      {/* Toe 2 */}
      <ellipse cx="39" cy="26" rx="8" ry="12" transform="rotate(-10, 39, 26)" />
      {/* Toe 3 */}
      <ellipse cx="61" cy="26" rx="8" ry="12" transform="rotate(10, 61, 26)" />
      {/* Toe 4 (rightmost) */}
      <ellipse cx="77" cy="42" rx="7" ry="10" transform="rotate(30, 77, 42)" />
    </svg>
  );
}

export default function App() {
  const [copied, setCopied] = useState(false);
  const [petCount, setPetCount] = useState(() => {
    try {
      return parseInt(localStorage.getItem('smolcat_pets') || '42', 10);
    } catch {
      return 42;
    }
  });
  const [isPurring, setIsPurring] = useState(false);
  const [showPeekCat, setShowPeekCat] = useState(false);
  const [peeksCount, setPeeksCount] = useState(0);

  // Official SMOLCAT contract address updated on 2026-07-16
  const contractAddress = "TGTrnjkirTrmJwdrHZ9MRh4J46C8jFRMs3Ayyozpump";

  // Watch scroll to show peeking cat
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowPeekCat(true);
      } else {
        setShowPeekCat(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyCA = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    playMeow();
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePetCat = () => {
    playMeow();
    setIsPurring(true);
    const newCount = petCount + 1;
    setPetCount(newCount);
    try {
      localStorage.setItem('smolcat_pets', newCount.toString());
    } catch {}
    
    // Purr after meow
    setTimeout(() => {
      playPurr();
      setTimeout(() => {
        setIsPurring(false);
      }, 800);
    }, 450);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-[#1B1625] selection:text-white pb-12 text-white relative overflow-x-hidden bg-[#b19df7]">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#9275f0] rounded-full blur-[160px] opacity-45"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#9945FF] rounded-full blur-[140px] opacity-35"></div>
      </div>

      {/* BACKGROUND SCATTERED PAW PRINTS MATCHING USER IMAGE */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Row 1 */}
        <div className="absolute top-[8%] left-[5%] animate-float-slow">
          <PawPrint size={75} opacity={0.35} rotate={-15} />
        </div>
        <div className="absolute top-[12%] right-[10%] animate-float-fast">
          <PawPrint size={65} opacity={0.3} rotate={25} />
        </div>

        {/* Row 2 */}
        <div className="absolute top-[32%] left-[12%] animate-float-fast">
          <PawPrint size={55} opacity={0.25} rotate={10} />
        </div>
        <div className="absolute top-[28%] right-[4%] animate-float-slow">
          <PawPrint size={80} opacity={0.35} rotate={-20} />
        </div>

        {/* Row 3 */}
        <div className="absolute top-[52%] left-[4%] animate-float-slow">
          <PawPrint size={85} opacity={0.4} rotate={35} />
        </div>
        <div className="absolute top-[58%] right-[14%] animate-float-fast">
          <PawPrint size={60} opacity={0.25} rotate={-5} />
        </div>

        {/* Row 4 */}
        <div className="absolute bottom-[22%] left-[8%] animate-float-fast">
          <PawPrint size={70} opacity={0.35} rotate={-15} />
        </div>
        <div className="absolute bottom-[18%] right-[6%] animate-float-slow">
          <PawPrint size={90} opacity={0.3} rotate={40} />
        </div>

        {/* Floating sparkles */}
        <div className="absolute top-[22%] right-[22%] animate-ping" style={{ animationDuration: '5s' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5">
            <path d="M12 3v18M3 12h18" strokeLinecap="round" />
          </svg>
        </div>
        <div className="absolute bottom-[38%] left-[28%] animate-ping" style={{ animationDuration: '7s' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5">
            <path d="M12 3v18M3 12h18" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* HEADER NAVBAR */}
      <header className="sticky top-0 z-50 px-4 md:px-8 py-3 bg-[#110C16]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo brand with smooth back-to-top scroll */}
          <a 
            href="#hero" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              window.history.pushState(null, '', '#hero');
            }}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-full border border-white/20 overflow-hidden bg-white/5 flex items-center justify-center transition-transform group-hover:scale-105">
              <img 
                src="https://cdn.shopify.com/s/files/1/0967/8087/8151/files/photo_2026-07-16_23-54-53.jpg?v=1784235310" 
                alt="smol cat logo" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-bubble font-bold text-lg md:text-xl text-[#F5F5F5] tracking-wide uppercase">
              smol cat
            </span>
          </a>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-6 font-bubble font-bold text-xs tracking-wider uppercase text-white/80">
            <a href="#about" className="hover:text-[#FFB7C5] transition-colors">Story</a>
            <a href="#pet" className="hover:text-[#FFB7C5] transition-colors">Pet</a>
            <a href="#memes" className="hover:text-[#FFB7C5] transition-colors">Sticker Lab</a>
            <a href="#game" className="hover:text-[#FFB7C5] transition-colors">Trench Saver</a>
            <a href="#buy" className="hover:text-[#FFB7C5] transition-colors">How To Buy</a>
          </nav>

          {/* Social and sound widgets */}
          <div className="flex items-center gap-2">
            {/* Play Sound meow button */}
            <button 
              onClick={playMeow}
              className="p-2 bg-white/5 rounded-full border border-white/10 text-white/80 hover:text-[#FFB7C5] hover:bg-white/10 transition-all active:translate-y-[1px]"
              title="Click to Meow!"
            >
              <Volume2 size={18} />
            </button>

            {/* X.com / Twitter link */}
            <a 
              href="https://x.com/smolcatfun" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 bg-white/5 rounded-full border border-white/10 text-white/80 hover:text-[#FFB7C5] hover:bg-white/10 transition-all active:translate-y-[1px]"
            >
              {/* Minimalist modern 2026 styled X logo */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            <a 
              href="#buy"
              className="px-5 py-2 rounded-full bg-[#FFB7C5] text-black hover:bg-white hover:text-black transition-all font-bubble font-bold text-xs md:text-sm tracking-wide"
            >
              BUY $smolcat
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="relative px-4 md:px-8 pt-10 md:pt-16 pb-12 z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero text */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
            {/* Ticker badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#9945FF] to-[#FFB7C5] text-white border border-white/10 rounded-full px-4 py-1.5 mx-auto lg:mx-0 w-fit mb-5 shadow-lg"
            >
              <Coins size={14} className="text-[#FFB7C5]" />
              <span className="font-mono text-xs font-black tracking-wider uppercase">TRENCHES SAVED INDEX: 100%</span>
            </motion.div>

            {/* Name title with cute drop outline text style */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-bubble text-6xl md:text-8xl font-black text-white text-stroke-thick tracking-tight mb-4"
            >
              smol cat<br/><span className="text-white text-stroke-thick">$smolcat</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-sans text-lg md:text-xl font-normal text-white/70 max-w-2xl leading-relaxed mb-8"
            >
              The smolest cat in the universe is here to rescue the Solana trenches. No high market caps required — just infinite cuteness, an adorable blue sweater, and the mission to make every trader happy again. Always remember: we are <span className="underline decoration-4 decoration-[#FFB7C5] underline-offset-4 font-semibold text-white">smol</span> but we are mighty!
            </motion.p>

            {/* CA Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bubble-card bg-white/5 border border-white/10 p-3 flex flex-col sm:flex-row items-center justify-between gap-3 max-w-xl w-full mb-8"
            >
              <div className="flex items-center gap-2 w-full overflow-hidden">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#FFB7C5]/70 bg-[#FFB7C5]/10 border border-[#FFB7C5]/20 rounded-lg px-2.5 py-1 shrink-0">
                  CA:
                </span>
                <span className="font-mono text-sm font-bold text-white/95 truncate select-all w-full text-center sm:text-left">
                  {contractAddress}
                </span>
              </div>
              <button
                onClick={handleCopyCA}
                className="bubble-btn bg-[#FFB7C5] text-black hover:bg-white font-bubble font-bold text-xs py-2.5 px-5 flex items-center gap-2 shrink-0 w-full sm:w-auto justify-center cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-emerald-800" />
                    COPIED!
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    COPY
                  </>
                )}
              </button>
            </motion.div>

            {/* Quick action buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <a 
                href="#buy"
                className="px-8 py-3.5 rounded-full bg-[#FFB7C5] hover:scale-105 transition-all text-black text-center font-bubble font-bold text-lg flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(255,183,197,0.3)]"
              >
                BUY NOW
                <ArrowUpRight size={18} />
              </a>
              <a 
                href="#memes"
                className="px-8 py-3.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white hover:scale-105 transition-all text-center font-bubble font-bold text-lg flex items-center justify-center gap-2"
              >
                STICKER LAB
                <Compass size={18} />
              </a>
            </motion.div>
          </div>

          {/* Hero Banner Image Graphic matching uploaded style */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
              className="bubble-card-purple p-4 max-w-md w-full relative"
            >
              {/* Badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#9945FF] to-[#FFB7C5] text-white font-bubble font-bold text-xs px-3.5 py-1.5 border border-white/20 rounded-xl rotate-6 shadow-lg">
                ORIGINAL CAT
              </div>

              {/* Main Banner Image provided by user */}
              <div className="border border-white/10 rounded-xl overflow-hidden bg-[#121212] relative group">
                <img 
                  src="https://cdn.shopify.com/s/files/1/0967/8087/8151/files/photo_2026-07-16_23-54-53.jpg?v=1784235310" 
                  alt="smol cat artwork" 
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="mt-4 text-center">
                <span className="font-mono text-[10px] font-bold text-white/40 tracking-wider uppercase">
                  OFFICIAL ART WORK • ALL RIGHTS RESERVED BY CAT ARMY
                </span>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* STORY SECTION */}
      <section id="about" className="px-4 md:px-8 py-12 max-w-7xl mx-auto w-full z-10">
        <div className="bubble-card p-6 md:p-10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-bubble text-3xl md:text-5xl font-black text-stroke-medium text-white tracking-tight mb-3">
              THE LEGEND OF THE SMOL CAT
            </h2>
            <p className="text-sm font-bold text-[#FFB7C5]/90">
              How a tiny kitten in a blue sweater was summoned to save everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Story block 1 */}
            <div className="bubble-card-purple p-5 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-full bg-[#FFB7C5] text-black flex items-center justify-center font-bubble font-bold text-sm mb-4 shadow-lg">
                  1
                </div>
                <h3 className="font-bubble font-bold text-xl text-[#FFB7C5] mb-2">Dark Solana Trenches</h3>
                <p className="text-xs text-white/70 leading-relaxed font-semibold">
                  Solana trenches were dark and cold. High leverage, fast rugs, and red candles were everywhere. Traders were crying, looking at empty charts, wishing for a spark of joy.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex justify-end">
                <span className="text-[10px] font-mono font-bold text-[#FFB7C5] uppercase">The Crisis</span>
              </div>
            </div>

            {/* Story block 2 */}
            <div className="bubble-card p-5 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-full bg-[#9945FF] text-white flex items-center justify-center font-bubble font-bold text-sm mb-4 shadow-lg">
                  2
                </div>
                <h3 className="font-bubble font-bold text-xl text-white mb-2">The Cozy Sweater Summon</h3>
                <p className="text-xs text-white/70 leading-relaxed font-semibold">
                  With a pure heart and zero malice, smol cat was born. No crazy armor, no lasers — just a cozy bright blue sweater that fits perfectly. He stepped forward to make every single trader smile again.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex justify-end">
                <span className="text-[10px] font-mono font-bold text-[#9945FF] uppercase">The Savior</span>
              </div>
            </div>

            {/* Story block 3 */}
            <div className="bubble-card-purple p-5 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-full bg-[#FFB7C5] text-black flex items-center justify-center font-bubble font-bold text-sm mb-4 shadow-lg">
                  3
                </div>
                <h3 className="font-bubble font-bold text-xl text-[#FFB7C5] mb-2">Infinite Green Candles</h3>
                <p className="text-xs text-white/70 leading-relaxed font-semibold">
                  By believing in cuteness and absolute community vibes, smol cat shields you from the big bad rugged world. Hold $smolcat and enjoy the comfy journey. Cuteness is the final utility!
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex justify-end">
                <span className="text-[10px] font-mono font-bold text-[#FFB7C5] uppercase">The Vision</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PET THE CAT INTERACTIVE MODULE */}
      <section id="pet" className="px-4 md:px-8 py-10 max-w-5xl mx-auto w-full z-10">
        <div className="bubble-card p-6 md:p-8 grid md:grid-cols-12 gap-8 items-center">
          
          {/* Interactive Illustration */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="w-64 h-64 relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center">
              {/* Vibe lines */}
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#FFB7C5_3px,transparent_3px)] [background-size:24px_24px]"></div>
              
              <SmolCatIllustration 
                isPurring={isPurring}
                isHappy={isPurring}
                onClick={handlePetCat}
                className="w-56 h-56"
              />

              {/* Float heart elements */}
              <AnimatePresence>
                {isPurring && (
                  <>
                    <motion.div 
                      initial={{ y: 20, opacity: 0, scale: 0.5 }}
                      animate={{ y: -80, opacity: 1, scale: 1.2 }}
                      exit={{ opacity: 0 }}
                      className="absolute left-10 text-rose-500"
                    >
                      <Heart size={24} fill="currentColor" />
                    </motion.div>
                    <motion.div 
                      initial={{ y: 20, opacity: 0, scale: 0.5 }}
                      animate={{ y: -90, opacity: 1, scale: 1.1 }}
                      exit={{ opacity: 0 }}
                      className="absolute right-12 text-rose-500"
                    >
                      <Heart size={18} fill="currentColor" />
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            <span className="text-[10px] font-mono font-bold text-[#FFB7C5]/50 mt-2.5 tracking-wider uppercase">
              CLICK OR TAP SMOL CAT TO PET HIM!
            </span>
          </div>

          {/* Interactive statistics & Pet Clicker Controls */}
          <div className="md:col-span-7 text-center md:text-left flex flex-col justify-center">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-3">
              <Cat className="text-[#FFB7C5]" size={24} />
              <h3 className="font-bubble font-bold text-2xl text-white">PET THE COZY KITTEN</h3>
            </div>
            
            <p className="text-sm text-white/70 mb-5 leading-relaxed font-semibold">
              Smol cat loves when you pet him! Every tap plays an adorable synthetic meow, makes him purr with cozy low vibrations, and increases his happiness index. Help us reach a billion purrs!
            </p>

            <div className="bubble-card-purple p-4 rounded-2xl flex items-center justify-between max-w-md mx-auto md:mx-0 w-full mb-5">
              <span className="font-bubble font-bold text-sm text-white/90">
                TOTAL TRENCHES SECURED:
              </span>
              <span className="font-mono text-xl font-black text-[#FFB7C5] bg-[#FFB7C5]/10 border border-[#FFB7C5]/30 px-3.5 py-1 rounded-xl shadow-md">
                {petCount.toLocaleString()}
              </span>
            </div>

            <button
              onClick={handlePetCat}
              className="bubble-btn bg-[#FFB7C5] hover:bg-white text-black font-bubble text-lg font-bold py-3.5 px-8 w-full max-w-md cursor-pointer"
            >
              PET SMOL CAT NOW
            </button>
          </div>

        </div>
      </section>

      {/* MEME GENERATOR STUDIO */}
      <section id="memes" className="px-4 md:px-8 py-12 max-w-7xl mx-auto w-full z-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[#FFB7C5] font-mono text-xs font-bold bg-[#FFB7C5]/10 border border-[#FFB7C5]/30 rounded-full px-3.5 py-1 uppercase tracking-wider">
            Sticker Lab v1.0
          </span>
          <h2 className="font-bubble text-3xl md:text-5xl font-black text-stroke-medium text-white tracking-tight mt-3 mb-2">
            SMOL CAT MEME STUDIO
          </h2>
          <p className="text-sm font-bold text-white/70">
            Dress up smol cat with cool items, write your caption, and generate sticker memes for your socials!
          </p>
        </div>

        <MemeMachine />
      </section>

      {/* GAME SECTION */}
      <section id="game" className="px-4 md:px-8 py-12 max-w-7xl mx-auto w-full z-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[#9945FF] font-mono text-xs font-bold bg-[#9945FF]/15 border border-[#9945FF]/30 rounded-full px-3.5 py-1 uppercase tracking-wider">
            Solana Protection
          </span>
          <h2 className="font-bubble text-3xl md:text-5xl font-black text-stroke-medium text-white tracking-tight mt-3 mb-2">
            TRENCH SAVER ARCADE
          </h2>
          <p className="text-sm font-bold text-white/70">
            Guide smol cat through rugged lands. Jump over red candle dumps and rug pulls to save traders!
          </p>
        </div>

        <TrenchSaverGame />
      </section>

      {/* HOW TO BUY SECTION */}
      <section id="buy" className="px-4 md:px-8 py-12 max-w-7xl mx-auto w-full z-10">
        <div className="bubble-card p-6 md:p-10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-bubble text-3xl md:text-5xl font-black text-stroke-medium text-white tracking-tight mb-3">
              HOW TO ACQUIRE $smolcat
            </h2>
            <p className="text-sm font-bold text-white/70">
              Four simple, smol steps to join the cozy sweater army.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bubble-card-purple p-5 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-[#FFB7C5] uppercase block mb-1">
                  STEP 01
                </span>
                <h4 className="font-bubble font-bold text-lg text-white mb-2">Create Wallet</h4>
                <p className="text-xs text-white/70 font-semibold leading-relaxed">
                  Download a secure Solana browser extension wallet like Phantom, Solflare or Backpack. Set up your seed phrase safely.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex justify-end">
                <ChevronRight className="text-[#FFB7C5]" size={16} />
              </div>
            </div>

            {/* Step 2 */}
            <div className="bubble-card p-5 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-[#9945FF] uppercase block mb-1">
                  STEP 02
                </span>
                <h4 className="font-bubble font-bold text-lg text-white mb-2">Get some SOL</h4>
                <p className="text-xs text-white/70 font-semibold leading-relaxed">
                  Purchase SOL on any major exchange and send it to your newly created Solana wallet address. Always keep some SOL for gas!
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex justify-end">
                <ChevronRight className="text-[#9945FF]" size={16} />
              </div>
            </div>

            {/* Step 3 */}
            <div className="bubble-card-purple p-5 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-[#FFB7C5] uppercase block mb-1">
                  STEP 03
                </span>
                <h4 className="font-bubble font-bold text-lg text-white mb-2">Go to Jupiter</h4>
                <p className="text-xs text-white/70 font-semibold leading-relaxed">
                  Visit jup.ag or raydium.io on your browser. Connect your wallet, paste the official $smolcat Contract Address.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex justify-end">
                <ChevronRight className="text-[#FFB7C5]" size={16} />
              </div>
            </div>

            {/* Step 4 */}
            <div className="bubble-card p-5 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-[#9945FF] uppercase block mb-1">
                  STEP 04
                </span>
                <h4 className="font-bubble font-bold text-lg text-white mb-2">Swap for $smolcat</h4>
                <p className="text-xs text-white/70 font-semibold leading-relaxed">
                  Swap your SOL for $smolcat. Put on your cozy blue sweater, sit back, relax, and watch the trenches get saved!
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex justify-end">
                <Check className="text-emerald-500" size={16} />
              </div>
            </div>
          </div>

          {/* Dex links badges row */}
          <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap justify-center gap-4">
            <a 
              href="https://jup.ag" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bubble-btn bg-[#FFB7C5]/10 text-[#FFB7C5] border border-[#FFB7C5]/30 hover:bg-[#FFB7C5]/20 hover:text-white font-bubble font-bold text-xs py-2.5 px-5 flex items-center gap-2 cursor-pointer"
            >
              Jupiter Aggregator
              <ExternalLink size={12} />
            </a>
            <a 
              href="https://raydium.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bubble-btn bg-[#9945FF]/10 text-[#9945FF] border border-[#9945FF]/30 hover:bg-[#9945FF]/20 hover:text-white font-bubble font-bold text-xs py-2.5 px-5 flex items-center gap-2 cursor-pointer"
            >
              Raydium DEX
              <ExternalLink size={12} />
            </a>
            <a 
              href="https://dexscreener.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bubble-btn bg-white/5 border border-white/10 text-white/80 hover:bg-white/15 hover:text-white font-bubble font-bold text-xs py-2.5 px-5 flex items-center gap-2 cursor-pointer"
            >
              DEXScreener Live Charts
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </section>

      {/* WARNING NOTIFICATION AREA */}
      <section className="px-4 md:px-8 max-w-4xl mx-auto w-full z-10">
        <div className="bg-[#110C16] border border-dashed border-rose-500/50 rounded-3xl p-5 flex flex-col sm:flex-row items-center gap-4 text-white">
          <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center shrink-0">
            <ShieldAlert size={24} />
          </div>
          <div>
            <span className="font-mono text-xs font-bold text-rose-400 block mb-1 uppercase tracking-wider">
              SMOL DISCLAIMER: COZY VIBES INCLUDED
            </span>
            <p className="text-xs text-white/80 leading-relaxed font-semibold">
              $smolcat is a pure memecoin designed for lighthearted fun, community laughter, and customization stickers. It has absolutely no direct association with standard financial instruments. Always make sure to trade responsibly in the volatile Solana trenches. Always consult your inner kitten before swapping!
            </p>
          </div>
        </div>
      </section>

      {/* SNEAKY PEEKING CAT COMPONENT */}
      <AnimatePresence>
        {showPeekCat && (
          <motion.div
            initial={{ y: 150, x: 50 }}
            animate={{ y: 20, x: 0 }}
            exit={{ y: 150, x: 50 }}
            whileHover={{ y: -5 }}
            className="fixed bottom-0 right-4 z-40 w-28 h-28 md:w-32 md:h-32 cursor-pointer select-none"
            onClick={() => {
              playMeow();
              setPeeksCount(prev => prev + 1);
            }}
          >
            <div className="absolute -top-12 right-2 bg-[#0A0A0A]/90 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-xl font-bubble text-[11px] text-[#FFB7C5] font-bold shadow-md whitespace-nowrap">
              {peeksCount === 0 ? "meow!" : peeksCount < 5 ? "pet me!" : "purrrrr!"}
            </div>
            <SmolCatIllustration isHappy={peeksCount > 4} isPurring={peeksCount > 2} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="mt-16 pt-8 border-t border-white/10 max-w-7xl mx-auto w-full px-4 md:px-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border border-white/10 overflow-hidden bg-white/5 flex items-center justify-center shadow-sm">
            <img 
              src="https://cdn.shopify.com/s/files/1/0967/8087/8151/files/photo_2026-07-16_23-54-53.jpg?v=1784235310" 
              alt="smol cat footer logo" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <h3 className="font-bubble font-bold text-xl text-[#FFB7C5] uppercase">smol cat</h3>
          
          <div className="flex items-center gap-4 text-xs font-mono font-bold text-white/40">
            <a href="#about" className="hover:text-[#FFB7C5] transition-colors">Story</a>
            <span>•</span>
            <a href="#pet" className="hover:text-[#FFB7C5] transition-colors">Pet</a>
            <span>•</span>
            <a href="#memes" className="hover:text-[#FFB7C5] transition-colors">Stickers</a>
            <span>•</span>
            <a href="#game" className="hover:text-[#FFB7C5] transition-colors">Arcade</a>
          </div>

          <p className="text-[10px] font-mono text-white/30 font-bold mt-4">
            © 2026 smol cat army. Built with absolute love for the Solana community. Always keep your sweater blue!
          </p>
        </div>
      </footer>
    </div>
  );
}
