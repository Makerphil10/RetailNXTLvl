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
