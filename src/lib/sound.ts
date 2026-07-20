/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export function playMoo() {
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
    
    // Cute Baby Bull Squeaky "Moo-ooo" sound
    osc1.frequency.setValueAtTime(175, now);
    osc1.frequency.exponentialRampToValueAtTime(210, now + 0.15);
    osc1.frequency.exponentialRampToValueAtTime(145, now + 0.5);

    osc2.frequency.setValueAtTime(175 * 1.5, now);
    osc2.frequency.exponentialRampToValueAtTime(210 * 1.5, now + 0.15);
    osc2.frequency.exponentialRampToValueAtTime(145 * 1.5, now + 0.5);

    filter.type = "lowpass";
    filter.Q.setValueAtTime(3.0, now);
    filter.frequency.setValueAtTime(700, now);
    filter.frequency.exponentialRampToValueAtTime(950, now + 0.15);
    filter.frequency.exponentialRampToValueAtTime(450, now + 0.5);

    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(0.28, now + 0.08);
    gainNode.gain.exponentialRampToValueAtTime(0.18, now + 0.25);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.58);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.6);
    osc2.stop(now + 0.6);
  } catch (err) {
    console.warn("Audio Context failed to play moo:", err);
  }
}

export function playSnort() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const audioCtx = new AudioContextClass();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.type = "triangle";
    const now = audioCtx.currentTime;
    
    osc.frequency.setValueAtTime(75, now);
    osc.frequency.exponentialRampToValueAtTime(50, now + 0.25);
    
    // low vibrato frequency modulator for a funny cute snort/grunt
    const mod = audioCtx.createOscillator();
    const modGain = audioCtx.createGain();
    mod.frequency.setValueAtTime(40, now);
    modGain.gain.setValueAtTime(22, now);
    
    mod.connect(modGain);
    modGain.connect(osc.frequency);
    
    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(0.35, now + 0.04);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    mod.start(now);
    osc.start(now);
    mod.stop(now + 0.42);
    osc.stop(now + 0.42);
  } catch (err) {
    console.warn("Audio Context failed to play snort:", err);
  }
}

// Wrappers for backwards compatibility
export function playMeow() {
  playMoo();
}

export function playPurr() {
  playSnort();
}
