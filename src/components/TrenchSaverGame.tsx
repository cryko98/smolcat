/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import SmolCatIllustration from './SmolCatIllustration';
import { playMeow, playPurr } from '../lib/sound';
import { Gamepad2, Trophy, RotateCcw, Shield, Heart } from 'lucide-react';

export default function TrenchSaverGame() {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      return parseInt(localStorage.getItem('smolcat_highscore') || '0', 10);
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
  const [speed, setSpeed] = useState(5);

  const containerWidth = 400;
  const containerHeight = 180;
  const catHeight = 44;
  const catWidth = 44;
  const obstacleHeight = 32;
  const obstacleWidth = 24;

  const jumpVelocity = useRef(0);
  const gravity = 0.6;
  const isJumpingRef = useRef(false);
  const catYRef = useRef(0);
  const obstacleXRef = useRef(400);
  const scoreRef = useRef(0);
  const speedRef = useRef(5);

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
    
    playMeow();
    isJumpingRef.current = true;
    setIsJumping(true);
    jumpVelocity.current = 10.5; // Jump strength
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
    playMeow();
    setGameState('playing');
    setScore(0);
    setSpeed(5);
    setObstacleX(400);
    setCatY(0);
    setSavedTraders([]);
    isJumpingRef.current = false;
    setIsJumping(false);
    catYRef.current = 0;
    obstacleXRef.current = 400;
    scoreRef.current = 0;
    speedRef.current = 5;
    jumpVelocity.current = 0;
    
    if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    gameLoopRef.current = requestAnimationFrame(gameLoop);
  };

  const handleGameOver = () => {
    playPurr();
    setGameState('gameover');
    if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);

    // Save highscore
    if (scoreRef.current > highScore) {
      setHighScore(scoreRef.current);
      try {
        localStorage.setItem('smolcat_highscore', scoreRef.current.toString());
      } catch (err) {
        console.warn('Could not save highscore:', err);
      }
    }
  };

  // List of funny traders saved by smol cat
  const traderNames = [
    "DegenDave", "PaperPaws", "DiamondTail", "RuggedRichard", 
    "SolanaSally", "LevTraderMax", "TrenchGamer", "JeetStop"
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
      setSpeed(Math.min(10, speedRef.current + 0.25));

      // Randomly trigger saved trader popups
      if (newScore > 0 && newScore % 30 === 0) {
        const randomTrader = traderNames[Math.floor(Math.random() * traderNames.length)];
        setSavedTraders(prev => [randomTrader, ...prev].slice(0, 4));
      }
    }
    setObstacleX(nextObstacleX);

    // 3. Collision Check
    // Cat horizontal box is around x: 40 to x: 80
    // Obstacle horizontal box is around obstacleX to obstacleX + obstacleWidth
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
    <div className="grid md:grid-cols-5 gap-8 items-stretch">
      {/* Game Window Card */}
      <div className="md:col-span-3 bubble-card p-6 flex flex-col justify-between bg-white relative overflow-hidden">
        <div>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Gamepad2 className="text-[#0B5BF0]" size={22} />
              <h3 className="font-bubble font-bold text-xl text-[#1B1625]">TRENCH SAVER</h3>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs font-bold bg-[#E4DBFF] border border-[#1B1625] px-2.5 py-1 rounded-lg">
                SCORE: {score}
              </span>
              <span className="font-mono text-xs font-bold bg-amber-100 border border-[#1B1625] px-2.5 py-1 rounded-lg flex items-center gap-1">
                <Trophy size={12} className="text-amber-600" />
                BEST: {highScore}
              </span>
            </div>
          </div>

          <p className="text-xs text-[#4c3d69] mb-4 leading-relaxed font-semibold">
            Tap the window or press SPACE to jump over red candlesticks and carpet rugs. Save the traders!
          </p>
        </div>

        {/* Dynamic Game Frame */}
        <div 
          onClick={handleJump}
          className="relative bg-[#f5f1ff] border-4 border-[#1B1625] rounded-2xl h-48 overflow-hidden cursor-pointer select-none"
        >
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(to_right,#1b1625_1px,transparent_1px),linear-gradient(to_bottom,#1b1625_1px,transparent_1px)] [background-size:20px_20px]"></div>

          {/* Clouds or custom decorations in the sky */}
          <div className="absolute top-4 left-10 w-16 h-4 bg-white/60 border border-[#1B1625]/20 rounded-full"></div>
          <div className="absolute top-8 right-16 w-20 h-5 bg-white/60 border border-[#1B1625]/20 rounded-full"></div>

          {/* Ground level line */}
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-[#E4DBFF] border-t-4 border-[#1B1625]"></div>

          {/* SMOL CAT SPRITE */}
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
                  <div className="w-1 h-3 bg-rose-600 border border-[#1B1625]"></div>
                  <div className="w-4 h-5 bg-rose-500 border-2 border-[#1B1625] rounded-sm"></div>
                </div>
              ) : (
                // RUG PULL
                <div className="w-full h-full flex items-end">
                  <div className="w-6 h-4 bg-rose-700 border-2 border-[#1B1625] rounded-t-lg relative">
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 font-mono text-[8px] font-bold text-rose-600">RUG</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SCREEN STATE OVERLAYS */}
          {gameState === 'idle' && (
            <div className="absolute inset-0 bg-[#e4dbff]/90 flex flex-col items-center justify-center p-4 text-center">
              <Gamepad2 className="text-[#0B5BF0] mb-2" size={32} />
              <h4 className="font-bubble font-bold text-lg text-[#1B1625]">LAUNCH TRENCH SAVER</h4>
              <p className="text-xs text-[#4c3d69] font-medium mt-1">
                Help smol cat save Solana degens. Tap to jump!
              </p>
              <button 
                onClick={(e) => { e.stopPropagation(); startGame(); }}
                className="mt-3 bg-[#0B5BF0] hover:bg-[#0747be] text-white font-bubble text-sm py-2 px-5 border-2 border-[#1B1625] rounded-xl shadow-md"
              >
                START GAME
              </button>
            </div>
          )}

          {gameState === 'gameover' && (
            <div className="absolute inset-0 bg-[#1B1625]/90 flex flex-col items-center justify-center p-4 text-center">
              <h4 className="font-bubble font-bold text-xl text-[#FFB4B4] uppercase tracking-wide">TRENCH OVERLOAD!</h4>
              <p className="text-xs text-white/80 mt-1 font-mono">
                You saved {score} $smolcat tokens worth of traders!
              </p>
              <button 
                onClick={(e) => { e.stopPropagation(); startGame(); }}
                className="mt-4 bg-[#FFB4B4] hover:bg-pink-100 text-[#1B1625] font-bubble text-sm py-2 px-5 border-2 border-white rounded-xl shadow-md flex items-center gap-2 font-bold"
              >
                <RotateCcw size={14} />
                TRY AGAIN
              </button>
            </div>
          )}
        </div>

        {/* Footer controls instruction */}
        <div className="mt-4 flex justify-between items-center text-[10px] font-mono text-[#4c3d69] font-bold">
          <span>CONTROLS: SPACEBAR OR TOUCH SCREEN</span>
          <span>SPEED MULTIPLIER: {(speed / 5).toFixed(1)}X</span>
        </div>
      </div>

      {/* Leaderboard/Saved log panel */}
      <div className="md:col-span-2 bubble-card-purple p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Shield className="text-[#0B5BF0]" size={20} />
            <h3 className="font-bubble font-bold text-lg text-[#1B1625]">SAVED DEGENS</h3>
          </div>
          <p className="text-xs text-[#4c3d69] leading-relaxed mb-4 font-semibold">
            Whenever you jump over red candles, you prevent a trader from being liquidated or rugged. Here is who you have rescued recently:
          </p>

          <div className="space-y-2 mt-2">
            {savedTraders.length === 0 ? (
              <div className="bg-white/40 border border-dashed border-[#1B1625]/20 rounded-xl p-4 text-center">
                <p className="text-xs font-medium text-[#4c3d69]">
                  No traders saved yet this round. Run in the trenches to rescue some degens!
                </p>
              </div>
            ) : (
              savedTraders.map((trader, idx) => (
                <div 
                  key={`${trader}-${idx}`}
                  className="bg-white border-2 border-[#1B1625] rounded-xl p-2.5 flex items-center justify-between shadow-sm animate-bounce-short"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#E4DBFF] border border-[#1B1625] flex items-center justify-center text-[10px] text-[#0B5BF0] font-bold font-mono">
                      {trader[0]}
                    </div>
                    <span className="font-mono text-xs font-bold text-[#1B1625]">
                      @{trader}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 border border-emerald-500/20 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Heart size={10} fill="currentColor" /> SAVED
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-[#0B5BF0]/10 border border-[#0B5BF0]/20 rounded-xl p-3 text-center mt-4">
          <p className="text-[10px] font-mono font-bold text-[#0B5BF0] uppercase tracking-wider">
            $smolcat is here to protect the pack
          </p>
        </div>
      </div>
    </div>
  );
}
