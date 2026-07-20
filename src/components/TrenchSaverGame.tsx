/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import SmolCatIllustration from './SmolCatIllustration';
import { playMoo, playSnort } from '../lib/sound';
import { Gamepad2, Trophy, RotateCcw, Shield, Heart } from 'lucide-react';

export default function TrenchSaverGame() {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      return parseInt(localStorage.getItem('bullothy_highscore') || '0', 10);
    } catch {
      return 0;
    }
  });

  const [savedTraders, setSavedTraders] = useState<string[]>([]);
  const gameLoopRef = useRef<number | null>(null);
  
  // Game coordinates and sizes
  const [catY, setCatY] = useState(0); // Ground is 0
  const [isJumping, setIsJumping] = useState(false);
  const [obstacleX, setObstacleX] = useState(400); // Out of bounds right
  const [obstacleType, setObstacleType] = useState<'candle' | 'rug'>('candle');
  const [speed, setSpeed] = useState(5.5);

  const containerWidth = 400;
  const containerHeight = 180;
  const catHeight = 44;
  const catWidth = 44;
  const obstacleHeight = 32;
  const obstacleWidth = 24;

  const jumpVelocity = useRef(0);
  const gravity = 0.65;
  const isJumpingRef = useRef(false);
  const catYRef = useRef(0);
  const obstacleXRef = useRef(400);
  const scoreRef = useRef(0);
  const speedRef = useRef(5.5);

  // Sync refs with state to use in requestAnimationFrame loop
  useEffect(() => {
    catYRef.current = catY;
  }, [catY]);

  useEffect(() => {
    obstacleXRef.current = obstacleX;
  }, [obstacleX]);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  // Handle jump triggering
  const handleJump = () => {
    if (gameState !== 'playing') return;
    if (isJumpingRef.current) return;
    
    playMoo();
    isJumpingRef.current = true;
    setIsJumping(true);
    jumpVelocity.current = 11.2; // Jump strength
  };

  // Keyboard handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        if (gameState === 'idle') {
          startGame();
        } else if (gameState === 'playing') {
          handleJump();
        } else if (gameState === 'gameover') {
          startGame();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  const startGame = () => {
    playMoo();
    setGameState('playing');
    setScore(0);
    setSpeed(5.5);
    setObstacleX(400);
    setCatY(0);
    setSavedTraders([]);
    isJumpingRef.current = false;
    setIsJumping(false);
    catYRef.current = 0;
    obstacleXRef.current = 400;
    scoreRef.current = 0;
    speedRef.current = 5.5;
    jumpVelocity.current = 0;
    
    if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    gameLoopRef.current = requestAnimationFrame(gameLoop);
  };

  const handleGameOver = () => {
    playSnort();
    setGameState('gameover');
    if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);

    // Save highscore
    if (scoreRef.current > highScore) {
      setHighScore(scoreRef.current);
      try {
        localStorage.setItem('bullothy_highscore', scoreRef.current.toString());
      } catch (err) {
        console.warn('Could not save highscore:', err);
      }
    }
  };

  // List of funny traders saved by Bullothy
  const traderNames = [
    "DegenDave", "SolanaSally", "BullothyGiga", "JeetStopper", 
    "DiamondHands", "SolMax", "TrenchWarrior", "PumpMaster",
    "HornsUpAlpha", "MoovingCoin"
  ];

  const gameLoop = () => {
    // 1. Update Jump position
    if (isJumpingRef.current) {
      const nextY = catYRef.current + jumpVelocity.current;
      jumpVelocity.current -= gravity;
      
      if (nextY <= 0) {
        setCatY(0);
        isJumpingRef.current = false;
        setIsJumping(false);
        jumpVelocity.current = 0;
      } else {
        setCatY(nextY);
      }
    }

    // 2. Move Obstacle
    let nextObstacleX = obstacleXRef.current - speedRef.current;
    if (nextObstacleX < -30) {
      // Re-spawn obstacle and increase score
      nextObstacleX = containerWidth + Math.random() * 150;
      setObstacleType(Math.random() > 0.5 ? 'candle' : 'rug');
      const newScore = scoreRef.current + 10;
      setScore(newScore);
      
      // Speed up slowly
      setSpeed(Math.min(11, speedRef.current + 0.3));

      // Randomly trigger saved trader popups
      if (newScore > 0 && newScore % 30 === 0) {
        const randomTrader = traderNames[Math.floor(Math.random() * traderNames.length)];
        setSavedTraders(prev => [randomTrader, ...prev].slice(0, 4));
      }
    }
    setObstacleX(nextObstacleX);

    // 3. Collision Check
    const catLeft = 45;
    const catRight = 45 + catWidth - 10;
    const obstacleLeft = nextObstacleX;
    const obstacleRight = nextObstacleX + obstacleWidth;

    const catBottom = catYRef.current;
    const catTop = catYRef.current + catHeight - 6;
    const obstacleBottom = 0;
    const obstacleTop = obstacleHeight;

    const isColX = catRight > obstacleLeft && catLeft < obstacleRight;
    const isColY = catTop > obstacleBottom && catBottom < obstacleTop;

    if (isColX && isColY) {
      handleGameOver();
    } else {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    }
  };

  useEffect(() => {
    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
  }, []);

  return (
    <div id="bullothy-arcade" className="grid md:grid-cols-5 gap-8 items-stretch">
      {/* Game Window Card */}
      <div className="md:col-span-3 bg-[#15151A] border-2 border-amber-500/20 hover:border-amber-500/40 p-6 flex flex-col justify-between relative overflow-hidden rounded-3xl transition-all duration-300">
        <div>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Gamepad2 className="text-amber-400" size={22} />
              <h3 className="font-sans font-black text-xl text-white uppercase tracking-tight">BULLOTHY RUN</h3>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs font-black bg-amber-400/10 border border-amber-400/30 text-amber-400 px-2.5 py-1 rounded-lg">
                SCORE: {score}
              </span>
              <span className="font-mono text-xs font-black bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 px-2.5 py-1 rounded-lg flex items-center gap-1">
                <Trophy size={12} className="text-yellow-400" />
                BEST: {highScore}
              </span>
            </div>
          </div>

          <p className="text-xs text-white/70 mb-4 leading-relaxed font-semibold">
            Tap the field or press SPACEBAR to make Bullothy jump over bearish red candles and developer rug pulls. Protect the Solana herd!
          </p>
        </div>

        {/* Dynamic Game Frame */}
        <div 
          onClick={handleJump}
          className="relative bg-[#08080C] border border-white/10 rounded-2xl h-48 overflow-hidden cursor-pointer select-none"
        >
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[linear-gradient(to_right,rgba(245,158,11,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(245,158,11,0.08)_1px,transparent_1px)] [background-size:20px_20px]"></div>

          {/* Mountains/Dune lines in background */}
          <div className="absolute bottom-4 left-1/4 w-32 h-16 border-t border-white/5 rounded-t-full bg-white/[0.01]"></div>
          <div className="absolute bottom-4 right-1/4 w-44 h-12 border-t border-white/5 rounded-t-full bg-white/[0.01]"></div>

          {/* Ground level line in gold */}
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-amber-600/40 via-yellow-500/40 to-amber-600/40 border-t border-amber-500/30"></div>

          {/* BULLOTHY SPRITE */}
          <div 
            style={{ 
              bottom: `${12 + catY}px`,
              left: '45px',
              width: `${catWidth}px`,
              height: `${catHeight}px`
            }}
            className="absolute transition-transform duration-75"
          >
            <SmolCatIllustration 
              isHappy={gameState === 'gameover' ? false : isJumping}
              isPurring={gameState === 'playing' && !isJumping}
              className="w-full h-full"
            />
          </div>

          {/* DYNAMIC OBSTACLE */}
          {gameState === 'playing' && (
            <div
              style={{
                bottom: '12px',
                left: `${obstacleX}px`,
                width: `${obstacleWidth}px`,
                height: `${obstacleHeight}px`
              }}
              className="absolute"
            >
              {obstacleType === 'candle' ? (
                // RED CANDLESTICK
                <div className="w-full h-full flex flex-col items-center justify-end">
                  <div className="w-1.5 h-4.5 bg-red-600 border border-red-400"></div>
                  <div className="w-5 h-6 bg-red-500 border border-red-300 rounded-sm"></div>
                </div>
              ) : (
                // RUG PULL BEAR TRAP
                <div className="w-full h-full flex items-end">
                  <div className="w-6 h-5 bg-red-700 border border-red-400 rounded-t-lg relative flex items-center justify-center">
                    <span className="absolute -top-3.5 font-mono text-[9px] font-black text-red-400 uppercase tracking-tight">RUG</span>
                    {/* teeth */}
                    <div className="w-full flex justify-between px-1 absolute top-0">
                      <div className="w-1 h-1 bg-white"></div>
                      <div className="w-1 h-1 bg-white"></div>
                      <div className="w-1 h-1 bg-white"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SCREEN STATE OVERLAYS */}
          {gameState === 'idle' && (
            <div className="absolute inset-0 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 text-center">
              <Gamepad2 className="text-amber-400 mb-2 animate-bounce" size={32} />
              <h4 className="font-sans font-black text-lg text-white uppercase tracking-wider">BULLOTHY ARCADE</h4>
              <p className="text-xs text-white/70 font-medium mt-1">
                Help our cute baby bull save Solana traders. Click to play!
              </p>
              <button 
                onClick={(e) => { e.stopPropagation(); startGame(); }}
                className="mt-3 bg-amber-400 hover:bg-amber-300 text-black font-sans font-black text-xs py-2.5 px-6 border border-transparent rounded-xl shadow-lg cursor-pointer transition-all duration-150 uppercase tracking-wider"
              >
                START GAME
              </button>
            </div>
          )}

          {gameState === 'gameover' && (
            <div className="absolute inset-0 bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center">
              <h4 className="font-sans font-black text-xl text-red-500 uppercase tracking-widest">TRENCH RECTED!</h4>
              <p className="text-xs text-white/80 mt-1 font-mono font-bold">
                You saved @ {score} $bullothy worth of Solana traders!
              </p>
              <button 
                onClick={(e) => { e.stopPropagation(); startGame(); }}
                className="mt-4 bg-amber-400 hover:bg-amber-300 text-black font-sans font-black text-xs py-2.5 px-6 border border-transparent rounded-xl shadow-lg flex items-center gap-2 cursor-pointer transition-all duration-150 uppercase tracking-wider"
              >
                <RotateCcw size={14} />
                TRY AGAIN
              </button>
            </div>
          )}
        </div>

        {/* Footer controls instruction */}
        <div className="mt-4 flex justify-between items-center text-[10px] font-mono text-white/40 font-bold">
          <span>CONTROLS: SPACEBAR OR TOUCH SCREEN</span>
          <span>SPEED MULTIPLIER: {(speed / 5.5).toFixed(1)}X</span>
        </div>
      </div>

      {/* Leaderboard/Saved log panel */}
      <div className="md:col-span-2 bg-[#111115]/90 border border-white/10 p-6 flex flex-col justify-between rounded-3xl relative">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Shield className="text-amber-400" size={20} />
            <h3 className="font-sans font-black text-lg text-white uppercase tracking-tight">SAVED MEMBERS</h3>
          </div>
          <p className="text-xs text-white/70 leading-relaxed mb-4 font-semibold">
            By jumping over bearish dumps, you secure the treasury and prevent liquidation. See who you have successfully saved:
          </p>

          <div className="space-y-2 mt-2">
            {savedTraders.length === 0 ? (
              <div className="bg-white/5 border border-dashed border-white/10 rounded-xl p-4 text-center">
                <p className="text-xs font-medium text-white/50">
                  No traders saved this round yet. Start hopping to secure the herd!
                </p>
              </div>
            ) : (
              savedTraders.map((trader, idx) => (
                <div 
                  key={`${trader}-${idx}`}
                  className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex items-center justify-between shadow-sm animate-pulse"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-[10px] text-amber-400 font-bold font-mono">
                      {trader[0]}
                    </div>
                    <span className="font-mono text-xs font-bold text-white/95">
                      @{trader}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-500/20 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Heart size={10} fill="currentColor" /> SAVED
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-amber-400/10 border border-amber-400/20 rounded-xl p-3 text-center mt-4">
          <p className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">
            $bullothy protects the herd
          </p>
        </div>
      </div>
    </div>
  );
}
