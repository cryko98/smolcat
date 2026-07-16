/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export function playMeow() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const audioCtx = new AudioContextClass();
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    osc1.type = "sawtooth";
    osc2.type = "triangle";

    const now = audioCtx.currentTime;
    
    // "me-ow" vocal sweep
    osc1.frequency.setValueAtTime(650, now);
    osc1.frequency.exponentialRampToValueAtTime(980, now + 0.1);
    osc1.frequency.exponentialRampToValueAtTime(380, now + 0.35);

    osc2.frequency.setValueAtTime(650 * 1.5, now);
    osc2.frequency.exponentialRampToValueAtTime(980 * 1.5, now + 0.1);
    osc2.frequency.exponentialRampToValueAtTime(380 * 1.5, now + 0.35);

    filter.type = "bandpass";
    filter.Q.setValueAtTime(3.0, now);
    filter.frequency.setValueAtTime(900, now);
    filter.frequency.exponentialRampToValueAtTime(1450, now + 0.1);
    filter.frequency.exponentialRampToValueAtTime(650, now + 0.35);

    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(0.25, now + 0.04);
    gainNode.gain.exponentialRampToValueAtTime(0.18, now + 0.15);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.42);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.45);
    osc2.stop(now + 0.45);
  } catch (err) {
    console.warn("Audio Context failed to play meow:", err);
  }
}

export function playPurr() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const audioCtx = new AudioContextClass();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.type = "sine";
    const now = audioCtx.currentTime;
    
    osc.frequency.setValueAtTime(38, now);
    
    // low vibrato frequency modulator
    const mod = audioCtx.createOscillator();
    const modGain = audioCtx.createGain();
    mod.frequency.setValueAtTime(24, now);
    modGain.gain.setValueAtTime(14, now);
    
    mod.connect(modGain);
    modGain.connect(osc.frequency);
    
    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(0.4, now + 0.08);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.85);
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    mod.start(now);
    osc.start(now);
    mod.stop(now + 0.9);
    osc.stop(now + 0.9);
  } catch (err) {
    console.warn("Audio Context failed to play purr:", err);
  }
}
