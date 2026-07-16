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

  const contractAddress = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

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
    <div className="min-h-screen flex flex-col font-sans selection:bg-[#0B5BF0] selection:text-white pb-12">
      {/* BACKGROUND FLOATING ORNAMENTS (No Emojis) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-15">
        {/* Playful vector paw prints */}
        <div className="absolute top-[15%] left-[8%] animate-float-slow">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="#1B1625">
            <circle cx="20" cy="24" r="9" />
            <circle cx="11" cy="11" r="5" />
            <circle cx="20" cy="7" r="5" />
            <circle cx="29" cy="11" r="5" />
          </svg>
        </div>
        <div className="absolute top-[45%] right-[5%] animate-float-fast">
          <svg width="60" height="60" viewBox="0 0 40 40" fill="#1B1625">
            <circle cx="20" cy="24" r="9" />
            <circle cx="11" cy="11" r="5" />
            <circle cx="20" cy="7" r="5" />
            <circle cx="29" cy="11" r="5" />
          </svg>
        </div>
        <div className="absolute bottom-[20%] left-[6%] animate-float-slow">
          <svg width="35" height="35" viewBox="0 0 40 40" fill="#1B1625">
            <circle cx="20" cy="24" r="9" />
            <circle cx="11" cy="11" r="5" />
            <circle cx="20" cy="7" r="5" />
            <circle cx="29" cy="11" r="5" />
          </svg>
        </div>
        {/* Cute sparkles */}
        <div className="absolute top-[25%] right-[20%] animate-ping" style={{ animationDuration: '4s' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1B1625" strokeWidth="3">
            <path d="M12 3v18M3 12h18" strokeLinecap="round" />
          </svg>
        </div>
        <div className="absolute bottom-[35%] left-[25%] animate-ping" style={{ animationDuration: '6s' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1B1625" strokeWidth="3">
            <path d="M12 3v18M3 12h18" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* HEADER NAVBAR */}
      <header className="sticky top-0 z-50 px-4 md:px-8 py-3 bg-[#c5b4ff]/90 backdrop-blur-md border-b-4 border-[#1B1625]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo brand */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full border-2 border-[#1B1625] overflow-hidden bg-white shadow-[2px_2px_0px_0px_#1B1625] transition-transform group-hover:scale-105">
              <img 
                src="https://cdn.shopify.com/s/files/1/0967/8087/8151/files/photo_2026-07-16_23-54-53.jpg?v=1784235310" 
                alt="smol cat logo" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-bubble font-bold text-lg md:text-xl text-[#1B1625] tracking-wide">
              smol cat
            </span>
          </a>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-6 font-bubble font-bold text-sm text-[#1B1625]">
            <a href="#about" className="hover:text-[#0B5BF0] transition-colors">Story</a>
            <a href="#pet" className="hover:text-[#0B5BF0] transition-colors">Pet</a>
            <a href="#memes" className="hover:text-[#0B5BF0] transition-colors">Sticker Lab</a>
            <a href="#game" className="hover:text-[#0B5BF0] transition-colors">Trench Saver</a>
            <a href="#buy" className="hover:text-[#0B5BF0] transition-colors">How To Buy</a>
          </nav>

          {/* Social and sound widgets */}
          <div className="flex items-center gap-2">
            {/* Play Sound meow button */}
            <button 
              onClick={playMeow}
              className="p-2 bg-white rounded-xl border-2 border-[#1B1625] text-[#1B1625] hover:text-[#0B5BF0] transition-all shadow-[2px_2px_0px_0px_#1B1625] active:translate-y-[2px] active:shadow-none"
              title="Click to Meow!"
            >
              <Volume2 size={18} />
            </button>

            {/* Fictional X.com 2026 styled button */}
            <a 
              href="https://x.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 bg-white rounded-xl border-2 border-[#1B1625] text-[#1B1625] hover:bg-[#1B1625] hover:text-white transition-all shadow-[2px_2px_0px_0px_#1B1625] active:translate-y-[2px] active:shadow-none"
            >
              {/* Minimalist modern 2026 styled X logo */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            <a 
              href="#buy"
              className="bubble-btn bg-[#0B5BF0] text-white px-4 py-1.5 font-bubble font-bold text-xs md:text-sm tracking-wide"
            >
              BUY $smolcat
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative px-4 md:px-8 pt-10 md:pt-16 pb-12 z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Hero text */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
            {/* Ticker badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-[#0B5BF0] text-white border-2 border-[#1B1625] rounded-full px-3.5 py-1.5 mx-auto lg:mx-0 w-fit mb-5 shadow-[3px_3px_0px_0px_#1B1625]"
            >
              <Coins size={14} />
              <span className="font-mono text-xs font-bold tracking-wider uppercase">TRENCHES SAVED INDEX: 100%</span>
            </motion.div>

            {/* Name title with cute drop outline text style */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-bubble text-5xl md:text-7xl lg:text-8xl font-black text-white text-stroke-thick tracking-tight mb-4"
            >
              smol cat
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-sans text-lg md:text-xl font-bold text-[#1B1625] max-w-2xl leading-relaxed mb-8"
            >
              The smolest cat in the universe is here to rescue the Solana trenches. No high market caps required — just infinite cuteness, an adorable blue sweater, and the mission to make every trader happy again. Always remember: we are <span className="underline decoration-4 decoration-[#0B5BF0] underline-offset-4">smol</span> but we are mighty!
            </motion.p>

            {/* CA Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bubble-card bg-white p-3 flex flex-col sm:flex-row items-center justify-between gap-3 max-w-xl w-full mb-8"
            >
              <div className="flex items-center gap-2 w-full overflow-hidden">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-gray-400 bg-gray-50 border border-gray-100 rounded-lg px-2 py-1 shrink-0">
                  CA:
                </span>
                <span className="font-mono text-sm font-bold text-[#1B1625] truncate select-all w-full text-center sm:text-left">
                  {contractAddress}
                </span>
              </div>
              <button
                onClick={handleCopyCA}
                className="bubble-btn bg-[#E4DBFF] hover:bg-[#c5b4ff] text-[#1B1625] font-bubble font-bold text-xs py-2.5 px-4 flex items-center gap-2 shrink-0 w-full sm:w-auto justify-center"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-emerald-600" />
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
                className="bubble-btn bg-[#0B5BF0] hover:bg-[#0747be] text-white text-center font-bubble font-bold text-lg py-3 px-8 flex items-center justify-center gap-2"
              >
                BUY NOW
                <ArrowUpRight size={18} />
              </a>
              <a 
                href="#memes"
                className="bubble-btn bg-white hover:bg-slate-50 text-[#1B1625] text-center font-bubble font-bold text-lg py-3 px-8 flex items-center justify-center gap-2"
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
              className="bubble-card-purple bg-[#e4dbff] p-4 max-w-md w-full relative"
            >
              {/* Badge */}
              <div className="absolute -top-4 -right-4 bg-[#0B5BF0] text-white font-bubble font-bold text-xs px-3.5 py-1.5 border-2 border-[#1B1625] rounded-xl rotate-6 shadow-[2px_2px_0px_0px_#1B1625]">
                ORIGINAL CAT
              </div>

              {/* Main Banner Image provided by user */}
              <div className="border-4 border-[#1B1625] rounded-xl overflow-hidden bg-white shadow-md relative group">
                <img 
                  src="https://cdn.shopify.com/s/files/1/0967/8087/8151/files/photo_2026-07-16_23-54-53.jpg?v=1784235310" 
                  alt="smol cat artwork" 
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-102"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="mt-3 text-center">
                <span className="font-mono text-[10px] font-bold text-[#4c3d69] tracking-wider uppercase">
                  OFFICIAL ART WORK • ALL RIGHTS RESERVED BY CAT ARMY
                </span>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* STORY SECTION */}
      <section id="about" className="px-4 md:px-8 py-12 max-w-7xl mx-auto w-full z-10">
        <div className="bubble-card p-6 md:p-10 bg-white">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-bubble text-3xl md:text-5xl font-black text-stroke-medium text-white tracking-tight mb-3">
              THE LEGEND OF THE SMOL CAT
            </h2>
            <p className="text-sm font-bold text-[#4c3d69]">
              How a tiny kitten in a blue sweater was summoned to save everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Story block 1 */}
            <div className="bubble-card-purple p-5 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#0B5BF0] text-white border-2 border-[#1B1625] flex items-center justify-center font-bubble font-bold text-lg mb-4 shadow-[2px_2px_0px_0px_#1B1625]">
                  1
                </div>
                <h3 className="font-bubble font-bold text-xl text-[#1B1625] mb-2">Dark Solana Trenches</h3>
                <p className="text-xs text-[#4c3d69] leading-relaxed font-semibold">
                  Solana trenches were dark and cold. High leverage, fast rugs, and red candles were everywhere. Traders were crying, looking at empty charts, wishing for a spark of joy.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#1B1625]/10 flex justify-end">
                <span className="text-[10px] font-mono font-bold text-[#0B5BF0] uppercase">The Crisis</span>
              </div>
            </div>

            {/* Story block 2 */}
            <div className="bubble-card p-5 flex flex-col justify-between bg-[#fcf9ff]">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#0B5BF0] text-white border-2 border-[#1B1625] flex items-center justify-center font-bubble font-bold text-lg mb-4 shadow-[2px_2px_0px_0px_#1B1625]">
                  2
                </div>
                <h3 className="font-bubble font-bold text-xl text-[#1B1625] mb-2">The Cozy Sweater Summon</h3>
                <p className="text-xs text-[#4c3d69] leading-relaxed font-semibold">
                  With a pure heart and zero malice, smol cat was born. No crazy armor, no lasers — just a cozy bright blue sweater that fits perfectly. He stepped forward to make every single trader smile again.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#1B1625]/10 flex justify-end">
                <span className="text-[10px] font-mono font-bold text-[#0B5BF0] uppercase">The Savior</span>
              </div>
            </div>

            {/* Story block 3 */}
            <div className="bubble-card-purple p-5 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#0B5BF0] text-white border-2 border-[#1B1625] flex items-center justify-center font-bubble font-bold text-lg mb-4 shadow-[2px_2px_0px_0px_#1B1625]">
                  3
                </div>
                <h3 className="font-bubble font-bold text-xl text-[#1B1625] mb-2">Infinite Green Candles</h3>
                <p className="text-xs text-[#4c3d69] leading-relaxed font-semibold">
                  By believing in cuteness and absolute community vibes, smol cat shields you from the big bad rugged world. Hold $smolcat and enjoy the comfy journey. Cuteness is the final utility!
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#1B1625]/10 flex justify-end">
                <span className="text-[10px] font-mono font-bold text-[#0B5BF0] uppercase">The Vision</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PET THE CAT INTERACTIVE MODULE */}
      <section id="pet" className="px-4 md:px-8 py-10 max-w-5xl mx-auto w-full z-10">
        <div className="bubble-card bg-[#fefefe] p-6 md:p-8 grid md:grid-cols-12 gap-8 items-center">
          
          {/* Interactive Illustration */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="w-64 h-64 relative bg-[#e4dbff] border-4 border-[#1B1625] rounded-3xl overflow-hidden shadow-inner flex items-center justify-center">
              {/* Vibe lines */}
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#1b1625_3px,transparent_3px)] [background-size:24px_24px]"></div>
              
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
            <span className="text-[10px] font-mono font-bold text-gray-400 mt-2.5">
              CLICK OR TAP SMOL CAT TO PET HIM!
            </span>
          </div>

          {/* Interactive statistics & Pet Clicker Controls */}
          <div className="md:col-span-7 text-center md:text-left flex flex-col justify-center">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-3">
              <Cat className="text-[#0B5BF0]" size={24} />
              <h3 className="font-bubble font-bold text-2xl text-[#1B1625]">PET THE COZY KITTEN</h3>
            </div>
            
            <p className="text-sm text-[#4c3d69] mb-5 leading-relaxed font-semibold">
              Smol cat loves when you pet him! Every tap plays an adorable synthetic meow, makes him purr with cozy low vibrations, and increases his happiness index. Help us reach a billion purrs!
            </p>

            <div className="bubble-card-purple p-4 bg-[#e4dbff] border-2 rounded-2xl flex items-center justify-between max-w-md mx-auto md:mx-0 w-full mb-5">
              <span className="font-bubble font-bold text-sm text-[#1B1625]">
                TOTAL TRENCHES SECURED:
              </span>
              <span className="font-mono text-xl font-black text-[#0B5BF0] bg-white border-2 border-[#1B1625] px-3.5 py-1 rounded-xl shadow-sm">
                {petCount.toLocaleString()}
              </span>
            </div>

            <button
              onClick={handlePetCat}
              className="bubble-btn bg-[#0B5BF0] hover:bg-[#0747be] text-white font-bubble text-lg font-bold py-3.5 px-8 w-full max-w-md"
            >
              PET SMOL CAT NOW
            </button>
          </div>

        </div>
      </section>

      {/* MEME GENERATOR STUDIO */}
      <section id="memes" className="px-4 md:px-8 py-12 max-w-7xl mx-auto w-full z-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[#0B5BF0] font-mono text-xs font-bold bg-[#E4DBFF] border border-[#1B1625] rounded-full px-3 py-1 uppercase tracking-wider">
            Sticker Lab v1.0
          </span>
          <h2 className="font-bubble text-3xl md:text-5xl font-black text-stroke-medium text-white tracking-tight mt-3 mb-2">
            SMOL CAT MEME STUDIO
          </h2>
          <p className="text-sm font-bold text-[#4c3d69]">
            Dress up smol cat with cool items, write your caption, and generate sticker memes for your socials!
          </p>
        </div>

        <MemeMachine />
      </section>

      {/* GAME SECTION */}
      <section id="game" className="px-4 md:px-8 py-12 max-w-7xl mx-auto w-full z-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[#0B5BF0] font-mono text-xs font-bold bg-[#E4DBFF] border border-[#1B1625] rounded-full px-3 py-1 uppercase tracking-wider">
            Solana Protection
          </span>
          <h2 className="font-bubble text-3xl md:text-5xl font-black text-stroke-medium text-white tracking-tight mt-3 mb-2">
            TRENCH SAVER ARCADE
          </h2>
          <p className="text-sm font-bold text-[#4c3d69]">
            Guide smol cat through rugged lands. Jump over red candle dumps and rug pulls to save traders!
          </p>
        </div>

        <TrenchSaverGame />
      </section>

      {/* HOW TO BUY SECTION */}
      <section id="buy" className="px-4 md:px-8 py-12 max-w-7xl mx-auto w-full z-10">
        <div className="bubble-card p-6 md:p-10 bg-white">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-bubble text-3xl md:text-5xl font-black text-stroke-medium text-white tracking-tight mb-3">
              HOW TO ACQUIRE $smolcat
            </h2>
            <p className="text-sm font-bold text-[#4c3d69]">
              Four simple, smol steps to join the cozy sweater army.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bubble-card-purple p-5 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-[#0B5BF0] uppercase block mb-1">
                  STEP 01
                </span>
                <h4 className="font-bubble font-bold text-lg text-[#1B1625] mb-2">Create Wallet</h4>
                <p className="text-xs text-[#4c3d69] font-semibold leading-relaxed">
                  Download a secure Solana browser extension wallet like Phantom, Solflare or Backpack. Set up your seed phrase safely.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#1B1625]/10 flex justify-end">
                <ChevronRight className="text-[#0B5BF0]" size={16} />
              </div>
            </div>

            {/* Step 2 */}
            <div className="bubble-card p-5 flex flex-col justify-between bg-[#fcf9ff]">
              <div>
                <span className="font-mono text-xs font-bold text-[#0B5BF0] uppercase block mb-1">
                  STEP 02
                </span>
                <h4 className="font-bubble font-bold text-lg text-[#1B1625] mb-2">Get some SOL</h4>
                <p className="text-xs text-[#4c3d69] font-semibold leading-relaxed">
                  Purchase SOL on any major exchange and send it to your newly created Solana wallet address. Always keep some SOL for gas!
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#1B1625]/10 flex justify-end">
                <ChevronRight className="text-[#0B5BF0]" size={16} />
              </div>
            </div>

            {/* Step 3 */}
            <div className="bubble-card-purple p-5 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-[#0B5BF0] uppercase block mb-1">
                  STEP 03
                </span>
                <h4 className="font-bubble font-bold text-lg text-[#1B1625] mb-2">Go to Jupiter</h4>
                <p className="text-xs text-[#4c3d69] font-semibold leading-relaxed">
                  Visit jup.ag or raydium.io on your browser. Connect your wallet, paste the official $smolcat Contract Address.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#1B1625]/10 flex justify-end">
                <ChevronRight className="text-[#0B5BF0]" size={16} />
              </div>
            </div>

            {/* Step 4 */}
            <div className="bubble-card p-5 flex flex-col justify-between bg-[#fcf9ff]">
              <div>
                <span className="font-mono text-xs font-bold text-[#0B5BF0] uppercase block mb-1">
                  STEP 04
                </span>
                <h4 className="font-bubble font-bold text-lg text-[#1B1625] mb-2">Swap for $smolcat</h4>
                <p className="text-xs text-[#4c3d69] font-semibold leading-relaxed">
                  Swap your SOL for $smolcat. Put on your cozy blue sweater, sit back, relax, and watch the trenches get saved!
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#1B1625]/10 flex justify-end">
                <Check className="text-emerald-600" size={16} />
              </div>
            </div>
          </div>

          {/* Dex links badges row */}
          <div className="mt-10 pt-8 border-t-4 border-[#1B1625]/10 flex flex-wrap justify-center gap-4">
            <a 
              href="https://jup.ag" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bubble-btn bg-[#FFB4B4] hover:bg-pink-100 text-[#1B1625] font-bubble font-bold text-xs py-2.5 px-5 flex items-center gap-2"
            >
              Jupiter Aggregator
              <ExternalLink size={12} />
            </a>
            <a 
              href="https://raydium.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bubble-btn bg-[#FFFFB4] hover:bg-yellow-50 text-[#1B1625] font-bubble font-bold text-xs py-2.5 px-5 flex items-center gap-2"
            >
              Raydium DEX
              <ExternalLink size={12} />
            </a>
            <a 
              href="https://dexscreener.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bubble-btn bg-white hover:bg-slate-50 text-[#1B1625] font-bubble font-bold text-xs py-2.5 px-5 flex items-center gap-2"
            >
              DEXScreener Live Charts
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </section>

      {/* WARNING NOTIFICATION AREA */}
      <section className="px-4 md:px-8 max-w-4xl mx-auto w-full z-10">
        <div className="bg-[#1B1625] border-2 border-dashed border-rose-500 rounded-3xl p-5 flex flex-col sm:flex-row items-center gap-4 text-white">
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
            <div className="absolute -top-12 right-2 bg-white border-2 border-[#1B1625] px-2.5 py-1 rounded-xl font-bubble text-[11px] text-[#0B5BF0] font-bold shadow-md whitespace-nowrap">
              {peeksCount === 0 ? "meow!" : peeksCount < 5 ? "pet me!" : "purrrrr!"}
            </div>
            <SmolCatIllustration isHappy={peeksCount > 4} isPurring={peeksCount > 2} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="mt-16 pt-8 border-t-4 border-[#1B1625]/10 max-w-7xl mx-auto w-full px-4 md:px-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-[#1B1625] overflow-hidden bg-white shadow-sm">
            <img 
              src="https://cdn.shopify.com/s/files/1/0967/8087/8151/files/photo_2026-07-16_23-54-53.jpg?v=1784235310" 
              alt="smol cat footer logo" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <h3 className="font-bubble font-bold text-xl text-[#1B1625]">smol cat</h3>
          
          <div className="flex items-center gap-4 text-xs font-mono font-bold text-[#4c3d69]">
            <a href="#about" className="hover:underline">Story</a>
            <span>•</span>
            <a href="#pet" className="hover:underline">Pet</a>
            <span>•</span>
            <a href="#memes" className="hover:underline">Stickers</a>
            <span>•</span>
            <a href="#game" className="hover:underline">Arcade</a>
          </div>

          <p className="text-[10px] font-mono text-[#4c3d69] font-bold mt-4">
            © 2026 smol cat army. Built with absolute love for the Solana community. Always keep your sweater blue!
          </p>
        </div>
      </footer>
    </div>
  );
}
