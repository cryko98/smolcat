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
  Flame, 
  Sparkles,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { playMoo, playSnort } from './lib/sound';
import SmolCatIllustration from './components/SmolCatIllustration';
import MemeMachine from './components/MemeMachine';
import TrenchSaverGame from './components/TrenchSaverGame';

function Sparkle({ className = '', size = 24, opacity = 0.25, rotate = 0 }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="#FBBF24" 
      style={{ opacity, transform: `rotate(${rotate}deg)` }}
      className={`${className} transition-all duration-1000`}
    >
      <path d="M12 2 L14.5 8.5 L21 11 L14.5 13.5 L12 20 L9.5 13.5 L3 11 L9.5 8.5 Z" />
    </svg>
  );
}

export default function App() {
  const [copied, setCopied] = useState(false);
  const [snortCount, setSnortCount] = useState(() => {
    try {
      return parseInt(localStorage.getItem('bullothy_snorts') || '420', 10);
    } catch {
      return 420;
    }
  });
  const [isSnorting, setIsSnorting] = useState(false);
  const [showPeekCat, setShowPeekCat] = useState(false);
  const [peeksCount, setPeeksCount] = useState(0);

  // Official BULLOTHY contract address
  const contractAddress = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

  // Watch scroll to show peeking Bullothy
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
    playMoo();
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePetBull = () => {
    playMoo();
    setIsSnorting(true);
    const newCount = snortCount + 1;
    setSnortCount(newCount);
    try {
      localStorage.setItem('bullothy_snorts', newCount.toString());
    } catch {}
    
    // Snort / grunt after moo
    setTimeout(() => {
      playSnort();
      setTimeout(() => {
        setIsSnorting(false);
      }, 700);
    }, 400);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-amber-400 selection:text-black pb-12 text-white relative overflow-x-hidden bg-[#0A0A0D]">
      
      {/* Background Glow Atmosphere */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute top-[-5%] left-[-10%] w-[650px] h-[650px] bg-amber-500/10 rounded-full blur-[180px] opacity-60"></div>
        <div className="absolute bottom-[-5%] right-[-5%] w-[600px] h-[600px] bg-yellow-600/10 rounded-full blur-[150px] opacity-40"></div>
      </div>

      {/* BACKGROUND FLOATING GOLD STARS */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[8%] left-[6%] animate-pulse">
          <Sparkle size={22} opacity={0.35} rotate={15} />
        </div>
        <div className="absolute top-[15%] right-[12%] animate-bounce" style={{ animationDuration: '6s' }}>
          <Sparkle size={28} opacity={0.4} rotate={45} />
        </div>
        <div className="absolute top-[35%] left-[10%] animate-pulse" style={{ animationDuration: '4s' }}>
          <Sparkle size={18} opacity={0.25} rotate={-10} />
        </div>
        <div className="absolute top-[28%] right-[5%] animate-bounce" style={{ animationDuration: '8s' }}>
          <Sparkle size={32} opacity={0.45} rotate={20} />
        </div>
        <div className="absolute top-[55%] left-[5%] animate-pulse" style={{ animationDuration: '5s' }}>
          <Sparkle size={30} opacity={0.3} rotate={75} />
        </div>
        <div className="absolute top-[62%] right-[15%] animate-bounce" style={{ animationDuration: '7s' }}>
          <Sparkle size={20} opacity={0.35} rotate={-25} />
        </div>
        <div className="absolute bottom-[20%] left-[12%] animate-pulse" style={{ animationDuration: '6s' }}>
          <Sparkle size={26} opacity={0.4} rotate={35} />
        </div>
        <div className="absolute bottom-[15%] right-[8%] animate-bounce" style={{ animationDuration: '5s' }}>
          <Sparkle size={35} opacity={0.3} rotate={110} />
        </div>
      </div>

      {/* HEADER NAVBAR */}
      <header className="sticky top-0 z-50 px-4 md:px-8 py-4 bg-[#0A0A0D]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* Logo brand with smooth scroll */}
          <a 
            href="#hero" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              window.history.pushState(null, '', '#hero');
            }}
            className="flex items-center gap-3.5 group"
          >
            <div className="w-11 h-11 rounded-full border-2 border-amber-400 overflow-hidden bg-black flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              <img 
                src="https://cdn.shopify.com/s/files/1/0967/8087/8151/files/bullothy.jpg?v=1784583508" 
                alt="Bullothy brand logo" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-black text-lg md:text-xl text-white tracking-tight uppercase leading-none">
                BULLOTHY
              </span>
              <span className="font-mono text-[9px] text-amber-400 font-bold tracking-widest mt-0.5 uppercase">
                $bullothy
              </span>
            </div>
          </a>

          {/* Navigation link deck */}
          <nav className="hidden md:flex items-center gap-8 font-sans font-black text-xs tracking-widest uppercase text-white/80">
            <a href="#about" className="hover:text-amber-400 transition-colors duration-200">The Story</a>
            <a href="#pet" className="hover:text-amber-400 transition-colors duration-200">Pet Bullothy</a>
            <a href="#memes" className="hover:text-amber-400 transition-colors duration-200">Stamp Maker</a>
            <a href="#game" className="hover:text-amber-400 transition-colors duration-200">Arcade Run</a>
            <a href="#buy" className="hover:text-amber-400 transition-colors duration-200">How To Buy</a>
          </nav>

          {/* Social connections and sound toggles */}
          <div className="flex items-center gap-2.5">
            <button 
              onClick={playMoo}
              className="p-2.5 bg-white/5 rounded-xl border border-white/10 text-white/80 hover:text-amber-400 hover:bg-amber-400/10 transition-all active:translate-y-[1px]"
              title="Moo loudly!"
            >
              <Volume2 size={18} />
            </button>

            <a 
              href="https://x.com/bullothyfun" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2.5 bg-white/5 rounded-xl border border-white/10 text-white/80 hover:text-amber-400 hover:bg-amber-400/10 transition-all active:translate-y-[1px]"
              title="Official X account"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            <a 
              href="#buy"
              className="px-5 py-2.5 rounded-xl bg-amber-400 text-black hover:bg-white transition-all font-sans font-black text-xs md:text-sm tracking-widest uppercase shadow-[0_4px_15px_rgba(245,158,11,0.25)] hover:shadow-[0_4px_25px_rgba(255,255,255,0.3)]"
            >
              BUY NOW
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION - REWORKED WITH UNIQUE ASYMMETRICAL WEB3 LAYOUT */}
      <section id="hero" className="relative px-4 md:px-8 pt-8 md:pt-16 pb-16 z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT COLUMN: Prominent premium artwork presentation with glowing halos */}
          <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, scale: 0.92, rotate: -1.5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
              className="bg-[#121217] border border-amber-500/30 p-5 rounded-[36px] w-full max-w-md relative shadow-[0_15px_40px_rgba(0,0,0,0.8)]"
            >
              {/* Golden Badge overlay */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-sans font-black text-[10px] tracking-widest px-4 py-2 border border-black rounded-xl rotate-6 shadow-[0_4px_15px_rgba(245,158,11,0.4)] uppercase">
                ORIGINAL BABY BULL
              </div>

              {/* Main portrait of Bullothy */}
              <div className="border border-white/10 rounded-2xl overflow-hidden bg-[#0A0A0C] relative group shadow-inner">
                <img 
                  src="https://cdn.shopify.com/s/files/1/0967/8087/8151/files/bullothy.jpg?v=1784583508" 
                  alt="Bullothy Portrait Artwork" 
                  className="w-full h-auto transition-all duration-700 group-hover:scale-105 filter group-hover:brightness-110"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="mt-4 pt-4 border-t border-white/5 text-center flex items-center justify-between">
                <span className="font-mono text-[9px] font-black text-amber-400/60 tracking-wider uppercase">
                  SOLANA CONTRACT CONFIRMED
                </span>
                <span className="font-mono text-[9px] font-bold text-white/40 uppercase">
                  VERIFIED BY HEIDELBERG
                </span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Modern high-contrast display text and interactive quick details */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left order-1 lg:order-2">
            
            {/* Live stats badge */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="inline-flex items-center gap-2.5 bg-amber-400/10 border border-amber-500/30 text-amber-400 rounded-full px-4 py-1.5 mx-auto lg:mx-0 w-fit mb-6 shadow-md"
            >
              <TrendingUp size={13} className="animate-pulse" />
              <span className="font-mono text-[10px] font-black tracking-widest uppercase">THE NO-SPINE SOLANA REVOLUTION</span>
            </motion.div>

            {/* Title with metallic golden styling and short spine reference */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="font-sans text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-4 leading-none"
            >
              Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">BULLOTHY</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="font-sans text-base md:text-lg font-normal text-white/70 max-w-2xl leading-relaxed mb-8"
            >
              Bullothy is an extremely cute baby bull living with <span className="text-amber-400 font-bold">short spine syndrome</span>. Compact, round, and physically unbreakable, he stepped forward to conquer the people of Solana with pure cuteness, a solid golden nose ring, and unstoppable baby bull vibes. Remember: no spine means we are built closer to the ground, so we never fall down!
            </motion.p>

            {/* Contract Address Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="bg-[#121217] border border-white/10 p-3 flex flex-col sm:flex-row items-center justify-between gap-3 max-w-xl w-full mb-8 rounded-2xl shadow-lg"
            >
              <div className="flex items-center gap-2.5 w-full overflow-hidden">
                <span className="font-mono text-[10px] font-black uppercase tracking-wider text-black bg-amber-400 rounded-lg px-2.5 py-1 shrink-0">
                  SOL CA
                </span>
                <span className="font-mono text-xs md:text-sm font-bold text-white/90 truncate select-all w-full text-center sm:text-left px-1">
                  {contractAddress}
                </span>
              </div>
              <button
                onClick={handleCopyCA}
                className="bg-amber-400 hover:bg-white text-black font-sans font-black text-xs py-2.5 px-6 rounded-xl flex items-center gap-2 shrink-0 w-full sm:w-auto justify-center cursor-pointer transition-all duration-150 active:translate-y-[1px]"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-green-800" />
                    COPIED MOO!
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    COPY CA
                  </>
                )}
              </button>
            </motion.div>

            {/* Quick Navigation Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start"
            >
              <a 
                href="#buy"
                className="px-8 py-4 rounded-xl bg-amber-400 hover:scale-105 transition-all text-black text-center font-sans font-black text-base flex items-center justify-center gap-2 shadow-[0_6px_25px_rgba(245,158,11,0.3)]"
              >
                ACQUIRE $bullothy
                <ArrowUpRight size={18} />
              </a>
              <a 
                href="#memes"
                className="px-8 py-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white hover:scale-105 transition-all text-center font-sans font-black text-base flex items-center justify-center gap-2"
              >
                STAMP MAKER
                <Compass size={18} />
              </a>
            </motion.div>
          </div>

        </div>
      </section>

      {/* THE LEGEND SECTION - OVERHAULED INTO A LUXURY WEB3 BENTO GRID */}
      <section id="about" className="px-4 md:px-8 py-16 max-w-7xl mx-auto w-full z-10">
        <div className="bg-[#121217] border border-white/5 p-6 md:p-12 rounded-[40px] shadow-2xl relative">
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:24px_24px] rounded-[40px]"></div>
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-amber-400 font-mono text-xs font-black bg-amber-400/10 border border-amber-500/20 rounded-full px-4 py-1 uppercase tracking-widest">
              LEGENDARY SYNDROME
            </span>
            <h2 className="font-sans text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mt-3 mb-4 uppercase">
              THE STORY OF BULLOTHY
            </h2>
            <p className="text-sm md:text-base font-bold text-white/60 leading-relaxed">
              Living with a compressed short spine isn't a limitation — it's the ultimate meme superpower. Here is how our baby bull conquered the charts.
            </p>
          </div>

          <div className="grid md:grid-cols-12 gap-6">
            
            {/* Bento block 1: The Short Spine Edge */}
            <div className="md:col-span-5 bg-[#0A0A0C] border border-white/10 p-6 md:p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 hover:border-amber-400/30">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-black flex items-center justify-center font-sans font-black text-sm mb-6 shadow-md">
                  01
                </div>
                <h3 className="font-sans font-black text-xl text-white mb-3 uppercase tracking-tight">SHORT SPINE, LOW GRAVITY</h3>
                <p className="text-xs md:text-sm text-white/60 leading-relaxed font-semibold">
                  Due to his compressed short spine, Bullothy is incredibly round, compact, and possesses a center of gravity so close to the ground that he is literally physically un-rugable. While ordinary bulls tumble over bear trends, Bullothy easily slides right under the pressure.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center text-amber-400">
                <span className="text-[10px] font-mono font-black uppercase tracking-wider">PHYSICAL ADVANTAGE</span>
                <Award size={16} />
              </div>
            </div>

            {/* Bento block 2: Golden Horn Power */}
            <div className="md:col-span-7 bg-[#16161D] border border-amber-500/20 p-6 md:p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 hover:border-amber-400/30">
              <div>
                <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-sans font-black text-sm mb-6 shadow-md">
                  02
                </div>
                <h3 className="font-sans font-black text-xl text-amber-400 mb-3 uppercase tracking-tight">COGNITIVE CHARGE</h3>
                <p className="text-xs md:text-sm text-white/70 leading-relaxed font-semibold">
                  His horns are solid, mirror-polished gold. They point upward like vertical green candles on a premium Solana orderbook. Combined with his cozy, humble nature, his charge is legendary. Every "MOO!" from Bullothy summons green candles and sends shivers down the spine of short-selling paper hands.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center text-white/80">
                <span className="text-[10px] font-mono font-black uppercase tracking-wider">BULL RUN UTILITY</span>
                <Flame size={16} className="text-amber-400 animate-pulse" />
              </div>
            </div>

            {/* Bento block 3: Conquering the People */}
            <div className="md:col-span-12 bg-[#0A0A0C] border border-white/10 p-6 md:p-8 rounded-3xl flex flex-col md:flex-row gap-6 justify-between items-center transition-all duration-300 hover:border-amber-400/30">
              <div className="max-w-2xl">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-sans font-black text-sm mb-4 shadow-sm">
                  03
                </div>
                <h3 className="font-sans font-black text-xl text-white mb-2 uppercase tracking-tight">CONQUERING SOLANA WITH LAUGHTER</h3>
                <p className="text-xs md:text-sm text-white/60 leading-relaxed font-semibold">
                  Bullothy is here to represent the ultimate community spirit. We don't care about elite financial institutions — we are a family of baby bulls with big smiles. Hold your $bullothy, generate cute stamps, protect the herd, and let our adorable low-riding champion charge towards the heavens.
                </p>
              </div>
              <div className="w-full md:w-auto shrink-0 bg-white/5 border border-white/10 p-4 rounded-2xl text-center">
                <span className="block text-[22px] font-sans font-black text-amber-400">100% SECURED</span>
                <span className="block text-[8px] font-mono text-white/40 uppercase tracking-widest mt-1">HERD CONTRACT CONFIDENCE</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* INTERACTIVE PET CLICKER DASHBOARD - REWORKED SECTION */}
      <section id="pet" className="px-4 md:px-8 py-10 max-w-5xl mx-auto w-full z-10">
        <div className="bg-[#121217] border border-white/10 rounded-[32px] p-6 md:p-10 grid md:grid-cols-12 gap-8 items-center relative">
          <div className="absolute top-4 right-4 bg-amber-400/10 text-amber-400 font-mono text-[9px] px-2.5 py-1 rounded-lg font-black uppercase tracking-widest">
            PET CLICKER v1.0
          </div>

          {/* Interactive Illustration Column */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="w-64 h-64 relative bg-black border border-white/10 rounded-3xl overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.8)] flex items-center justify-center group">
              
              {/* Vibe lines */}
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#F59E0B_3px,transparent_3px)] [background-size:24px_24px]"></div>
              
              <SmolCatIllustration 
                isPurring={isSnorting}
                isHappy={isSnorting}
                onClick={handlePetBull}
                className="w-56 h-56 transition-transform duration-200 active:scale-95"
              />

              {/* Float sparkles on pet */}
              <AnimatePresence>
                {isSnorting && (
                  <>
                    <motion.div 
                      initial={{ y: 20, opacity: 0, scale: 0.5 }}
                      animate={{ y: -80, opacity: 1, scale: 1.2 }}
                      exit={{ opacity: 0 }}
                      className="absolute left-10 text-amber-400"
                    >
                      <Sparkles size={24} fill="currentColor" />
                    </motion.div>
                    <motion.div 
                      initial={{ y: 20, opacity: 0, scale: 0.5 }}
                      animate={{ y: -90, opacity: 1, scale: 1.1 }}
                      exit={{ opacity: 0 }}
                      className="absolute right-12 text-yellow-400"
                    >
                      <Heart size={18} fill="currentColor" />
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            <span className="text-[10px] font-mono font-black text-amber-400/60 mt-3 tracking-widest uppercase">
              CLICK OR TAP BULLOTHY TO MAKE HIM MOO!
            </span>
          </div>

          {/* Interactive statistics & Pet Clicker Controls */}
          <div className="md:col-span-7 text-center md:text-left flex flex-col justify-center">
            <div className="flex items-center gap-2.5 justify-center md:justify-start mb-4">
              <Flame className="text-amber-400 animate-bounce" size={24} />
              <h3 className="font-sans font-black text-2xl text-white uppercase tracking-tight">PET THE BABY CHAMPION</h3>
            </div>
            
            <p className="text-xs md:text-sm text-white/70 mb-6 leading-relaxed font-semibold">
              Tap Bullothy to trigger a funny synthesized low baby bull "MOO!" and snort. Every pet generates high-vibe energy in the Solana trenches and counts towards the global herd strength indicator!
            </p>

            <div className="bg-black border border-white/5 p-4.5 rounded-2xl flex items-center justify-between max-w-md mx-auto md:mx-0 w-full mb-6 shadow-inner">
              <span className="font-sans font-black text-xs text-white/80 tracking-wider uppercase">
                GLOBAL HERD SNORTS:
              </span>
              <span className="font-mono text-xl font-black text-amber-400 bg-amber-400/5 border border-amber-500/20 px-3.5 py-1 rounded-xl shadow-md">
                {snortCount.toLocaleString()}
              </span>
            </div>

            <button
              onClick={handlePetBull}
              className="bg-amber-400 hover:bg-white text-black font-sans font-black text-sm tracking-widest py-4 px-8 rounded-2xl w-full max-w-md cursor-pointer transition-all duration-150 active:translate-y-[1px] shadow-[0_4px_15px_rgba(245,158,11,0.25)] uppercase"
            >
              PET BULLOTHY NOW
            </button>
          </div>

        </div>
      </section>

      {/* STICKER STAMP STUDIO SECTION */}
      <section id="memes" className="px-4 md:px-8 py-16 max-w-7xl mx-auto w-full z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-amber-400 font-mono text-xs font-black bg-amber-400/10 border border-amber-500/20 rounded-full px-4 py-1.5 uppercase tracking-widest">
            STAMP LAB v1.0
          </span>
          <h2 className="font-sans text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mt-3 mb-3 uppercase">
            BULLOTHY MEME STUDIO
          </h2>
          <p className="text-xs md:text-sm font-semibold text-white/60 leading-relaxed">
            Customize our low-riding champion with elite Web3 hats, custom text tags, and instantly export crisp vector stickers for your socials!
          </p>
        </div>

        <MemeMachine />
      </section>

      {/* ARCADE SECTION */}
      <section id="game" className="px-4 md:px-8 py-16 max-w-7xl mx-auto w-full z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-amber-400 font-mono text-xs font-black bg-amber-400/10 border border-amber-500/20 rounded-full px-4 py-1.5 uppercase tracking-widest">
            ARCADE GAME
          </span>
          <h2 className="font-sans text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mt-3 mb-3 uppercase">
            BULLOTHY TRENCH RUN
          </h2>
          <p className="text-xs md:text-sm font-semibold text-white/60 leading-relaxed">
            Put your reflexes to the test! Jump over dumpy red candlesticks and bear traps to secure the treasury and save traders.
          </p>
        </div>

        <TrenchSaverGame />
      </section>

      {/* HOW TO BUY SECTION - OVERHAULED STEP TIMELINE LAYOUT */}
      <section id="buy" className="px-4 md:px-8 py-16 max-w-7xl mx-auto w-full z-10">
        <div className="bg-[#121217] border border-white/5 p-6 md:p-12 rounded-[40px] shadow-2xl relative">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-amber-400 font-mono text-xs font-black bg-amber-400/10 border border-amber-500/20 rounded-full px-4 py-1 uppercase tracking-widest">
              SWAP TUTORIAL
            </span>
            <h2 className="font-sans text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mt-3 mb-3 uppercase">
              HOW TO ACQUIRE $bullothy
            </h2>
            <p className="text-xs md:text-sm font-semibold text-white/60 leading-relaxed">
              Four quick, bulletproof steps to connect your wallet and swap SOL for the low-riding baby bull.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            
            {/* Step 1 */}
            <div className="bg-[#0A0A0C] border border-white/10 p-6 rounded-2xl flex flex-col justify-between transition-all duration-200 hover:border-amber-400/30">
              <div>
                <span className="font-mono text-xs font-black text-amber-400 uppercase block mb-1">
                  PHASE 01
                </span>
                <h4 className="font-sans font-black text-lg text-white mb-3 uppercase">SET UP WALLET</h4>
                <p className="text-xs text-white/60 font-semibold leading-relaxed">
                  Download a premium Solana extension wallet like Phantom, Solflare, or Backpack to your browser or mobile device. Save your seed phrase offline!
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-white/5 flex justify-end">
                <ChevronRight className="text-amber-400" size={16} />
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#0A0A0C] border border-white/10 p-6 rounded-2xl flex flex-col justify-between transition-all duration-200 hover:border-amber-400/30">
              <div>
                <span className="font-mono text-xs font-black text-amber-400 uppercase block mb-1">
                  PHASE 02
                </span>
                <h4 className="font-sans font-black text-lg text-white mb-3 uppercase">GET SOLANA (SOL)</h4>
                <p className="text-xs text-white/60 font-semibold leading-relaxed">
                  Buy SOL on a centralized exchange (Coinbase, Binance, etc.) or bridge it, and send it over to your newly created Solana wallet address.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-white/5 flex justify-end">
                <ChevronRight className="text-amber-400" size={16} />
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#0A0A0C] border border-white/10 p-6 rounded-2xl flex flex-col justify-between transition-all duration-200 hover:border-amber-400/30">
              <div>
                <span className="font-mono text-xs font-black text-amber-400 uppercase block mb-1">
                  PHASE 03
                </span>
                <h4 className="font-sans font-black text-lg text-white mb-3 uppercase">CONNECT TO JUPITER</h4>
                <p className="text-xs text-white/60 font-semibold leading-relaxed">
                  Go to jup.ag (Jupiter) or raydium.io. Connect your wallet extension, and paste our official $bullothy Contract Address into the token search.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-white/5 flex justify-end">
                <ChevronRight className="text-amber-400" size={16} />
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-[#0A0A0C] border border-white/10 p-6 rounded-2xl flex flex-col justify-between transition-all duration-200 hover:border-amber-400/30">
              <div>
                <span className="font-mono text-xs font-black text-amber-400 uppercase block mb-1">
                  PHASE 04
                </span>
                <h4 className="font-sans font-black text-lg text-white mb-3 uppercase">SWAP SOL FOR BABY</h4>
                <p className="text-xs text-white/60 font-semibold leading-relaxed">
                  Decide on your size, set slip to auto, click swap, and confirm! Congratulations, you are now an official member of the compact Bullothy herd!
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-white/5 flex justify-end">
                <Check className="text-emerald-400 animate-pulse" size={16} />
              </div>
            </div>

          </div>

          {/* Dex links badges row */}
          <div className="mt-12 pt-8 border-t border-white/5 flex flex-wrap justify-center gap-4">
            <a 
              href="https://jup.ag" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-amber-400/10 text-amber-400 border border-amber-500/20 hover:bg-amber-400 hover:text-black font-sans font-black text-xs py-3 px-6 rounded-xl flex items-center gap-2 cursor-pointer transition-all duration-150"
            >
              Jupiter Swap
              <ExternalLink size={12} />
            </a>
            <a 
              href="https://raydium.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 hover:bg-yellow-400 hover:text-black font-sans font-black text-xs py-3 px-6 rounded-xl flex items-center gap-2 cursor-pointer transition-all duration-150"
            >
              Raydium DEX
              <ExternalLink size={12} />
            </a>
            <a 
              href="https://dexscreener.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white/5 border border-white/10 text-white/80 hover:bg-white/15 hover:text-white font-sans font-black text-xs py-3 px-6 rounded-xl flex items-center gap-2 cursor-pointer transition-all duration-150"
            >
              DEXScreener Chart
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </section>

      {/* SECURITY NOTICE - NO-LARPING DESIGN */}
      <section className="px-4 md:px-8 max-w-4xl mx-auto w-full z-10">
        <div className="bg-[#121217] border border-dashed border-amber-500/30 rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-4 text-white shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <ShieldAlert size={24} />
          </div>
          <div>
            <span className="font-mono text-xs font-black text-amber-400 block mb-1 uppercase tracking-widest">
              MEMECOIN DISCLAIMER
            </span>
            <p className="text-xs text-white/70 leading-relaxed font-semibold">
              $bullothy is an online memecoin created purely for community humor, cute custom sticker builders, and lighthearted gaming. It has no associated utility or direct financial expectations. Memecoin trades are highly volatile; please secure your positions responsibly.
            </p>
          </div>
        </div>
      </section>

      {/* SNEAKY PEEKING BULLOTHY COMPONENT */}
      <AnimatePresence>
        {showPeekCat && (
          <motion.div
            initial={{ y: 150, x: 50 }}
            animate={{ y: 20, x: 0 }}
            exit={{ y: 150, x: 50 }}
            whileHover={{ y: -5 }}
            className="fixed bottom-0 right-4 z-40 w-28 h-28 md:w-32 md:h-32 cursor-pointer select-none"
            onClick={() => {
              playMoo();
              setPeeksCount(prev => prev + 1);
            }}
          >
            <div className="absolute -top-12 right-2 bg-black/95 backdrop-blur-md border border-amber-500/30 px-3 py-1.5 rounded-xl font-sans text-[10px] text-amber-400 font-black tracking-widest shadow-lg whitespace-nowrap uppercase">
              {peeksCount === 0 ? "moo!" : peeksCount < 5 ? "pet me!" : "snooort!"}
            </div>
            <SmolCatIllustration isHappy={peeksCount > 4} isPurring={peeksCount > 2} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="mt-20 pt-10 border-t border-white/5 max-w-7xl mx-auto w-full px-4 md:px-8 text-center">
        <div className="flex flex-col items-center gap-5">
          <div className="w-14 h-14 rounded-full border-2 border-amber-400 overflow-hidden bg-black flex items-center justify-center shadow-lg">
            <img 
              src="https://cdn.shopify.com/s/files/1/0967/8087/8151/files/bullothy.jpg?v=1784583508" 
              alt="Bullothy footer brand logo" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <h3 className="font-sans font-black text-2xl text-white tracking-tight uppercase">BULLOTHY</h3>
          
          <div className="flex items-center gap-6 text-xs font-sans font-black uppercase tracking-widest text-white/40">
            <a href="#about" className="hover:text-amber-400 transition-colors duration-200">Story</a>
            <span>•</span>
            <a href="#pet" className="hover:text-amber-400 transition-colors duration-200">Pet</a>
            <span>•</span>
            <a href="#memes" className="hover:text-amber-400 transition-colors duration-200">Stamps</a>
            <span>•</span>
            <a href="#game" className="hover:text-amber-400 transition-colors duration-200">Arcade</a>
          </div>

          <p className="text-[10px] font-mono text-white/30 font-bold mt-4 leading-relaxed max-w-md">
            © 2026 Bullothy Herd. Conquering the Solana charts one step closer to the ground. Horns up, spines short!
          </p>
        </div>
      </footer>
    </div>
  );
}
