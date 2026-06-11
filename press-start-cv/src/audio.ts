/** Tiny WebAudio chiptune blips — no audio assets needed. */

let ctx: AudioContext | null = null;
let muted = false;

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

export function setMuted(value: boolean) {
  muted = value;
}

function tone(freq: number, start: number, duration: number, volume = 0.08) {
  const ac = getCtx();
  if (!ac || muted) return;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = 'square';
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(volume, ac.currentTime + start);
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + start + duration);
  osc.connect(gain).connect(ac.destination);
  osc.start(ac.currentTime + start);
  osc.stop(ac.currentTime + start + duration);
}

export const sfx = {
  blip: () => tone(520, 0, 0.07),
  jump: () => {
    tone(440, 0, 0.06, 0.05);
    tone(660, 0.05, 0.08, 0.05);
  },
  open: () => {
    tone(392, 0, 0.08);
    tone(523, 0.08, 0.1);
  },
  unlock: () => {
    tone(523, 0, 0.09);
    tone(659, 0.09, 0.09);
    tone(784, 0.18, 0.16);
  },
  start: () => {
    tone(330, 0, 0.09);
    tone(440, 0.09, 0.09);
    tone(554, 0.18, 0.09);
    tone(659, 0.27, 0.2);
  },
};

/* ---------- background music ----------
 * A gentle 8-second chiptune loop (A minor), generated live —
 * no audio files needed. Kept quiet on purpose.
 */

const STEP = 0.25; // seconds per 8th note
const R = 0; // rest

// 4 bars of melody, 8 steps each (frequencies in Hz)
const MELODY = [
  440, R, 523, 659, R, 523, 440, R,
  349, R, 440, 523, R, 440, 349, R,
  392, R, 523, 659, R, 587, 523, R,
  494, R, 587, 392, R, 494, 392, R,
];

// one bass note per half bar
const BASS = [110, 110, 87.3, 87.3, 130.8, 130.8, 98, 98];

let musicGain: GainNode | null = null;
let musicTimer: number | null = null;

function scheduleNote(freq: number, when: number, duration: number, type: OscillatorType, volume: number) {
  const ac = getCtx();
  if (!ac || !musicGain) return;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0, when);
  gain.gain.linearRampToValueAtTime(volume, when + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, when + duration);
  osc.connect(gain).connect(musicGain);
  osc.start(when);
  osc.stop(when + duration);
}

function scheduleLoop(startAt: number) {
  MELODY.forEach((freq, i) => {
    if (freq !== R) scheduleNote(freq, startAt + i * STEP, STEP * 1.8, 'triangle', 0.06);
  });
  BASS.forEach((freq, i) => {
    scheduleNote(freq, startAt + i * 4 * STEP, STEP * 3.6, 'square', 0.025);
  });
  const loopLength = MELODY.length * STEP;
  const ac = getCtx();
  if (!ac) return;
  // schedule the next pass shortly before this one ends
  musicTimer = window.setTimeout(() => scheduleLoop(startAt + loopLength), (startAt + loopLength - ac.currentTime - 0.5) * 1000);
}

export function startMusic() {
  const ac = getCtx();
  if (!ac || musicTimer !== null) return;
  if (!musicGain) {
    musicGain = ac.createGain();
    musicGain.connect(ac.destination);
  }
  musicGain.gain.cancelScheduledValues(ac.currentTime);
  musicGain.gain.setValueAtTime(0, ac.currentTime);
  musicGain.gain.linearRampToValueAtTime(1, ac.currentTime + 0.8);
  scheduleLoop(ac.currentTime + 0.1);
}

export function stopMusic() {
  if (musicTimer !== null) {
    clearTimeout(musicTimer);
    musicTimer = null;
  }
  const ac = getCtx();
  if (ac && musicGain) {
    musicGain.gain.cancelScheduledValues(ac.currentTime);
    musicGain.gain.setValueAtTime(musicGain.gain.value, ac.currentTime);
    musicGain.gain.linearRampToValueAtTime(0, ac.currentTime + 0.4);
  }
}
