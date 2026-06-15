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
 * A quiet punk-flavored chiptune loop (A minor), generated live —
 * no audio files needed. Drums + driving eighth-note bass keep it
 * rocking, low volumes keep it unobtrusive.
 */

const STEP = 0.22; // seconds per 8th note (~136 BPM)
const R = 0; // rest

// 4 bars of melody, 8 steps each (frequencies in Hz)
const MELODY = [
  440, R, 523, 659, R, 523, 440, R,
  349, R, 440, 523, R, 440, 349, R,
  392, R, 523, 659, R, 587, 523, R,
  494, R, 587, 392, R, 494, 392, R,
];

// bar roots for the driving eighth-note bass: Am, F, C, G
const BASS_ROOTS = [110, 87.3, 130.8, 98];

let musicGain: GainNode | null = null;
let musicTimer: number | null = null;
let noiseBuffer: AudioBuffer | null = null;

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

/** Kick drum: a quick sine pitch drop. */
function scheduleKick(when: number) {
  const ac = getCtx();
  if (!ac || !musicGain) return;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(130, when);
  osc.frequency.exponentialRampToValueAtTime(45, when + 0.1);
  gain.gain.setValueAtTime(0.07, when);
  gain.gain.exponentialRampToValueAtTime(0.001, when + 0.13);
  osc.connect(gain).connect(musicGain);
  osc.start(when);
  osc.stop(when + 0.15);
}

/** Hi-hat / snare: filtered white noise burst. */
function scheduleNoise(when: number, duration: number, volume: number, filterFreq: number) {
  const ac = getCtx();
  if (!ac || !musicGain) return;
  if (!noiseBuffer) {
    noiseBuffer = ac.createBuffer(1, ac.sampleRate * 0.25, ac.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  }
  const src = ac.createBufferSource();
  src.buffer = noiseBuffer;
  const filter = ac.createBiquadFilter();
  filter.type = 'highpass';
  filter.frequency.value = filterFreq;
  const gain = ac.createGain();
  gain.gain.setValueAtTime(volume, when);
  gain.gain.exponentialRampToValueAtTime(0.001, when + duration);
  src.connect(filter).connect(gain).connect(musicGain);
  src.start(when);
  src.stop(when + duration);
}

function scheduleLoop(startAt: number) {
  // lead (quiet square — chiptune guitar)
  MELODY.forEach((freq, i) => {
    if (freq !== R) scheduleNote(freq, startAt + i * STEP, STEP * 1.6, 'square', 0.02);
  });
  for (let i = 0; i < 32; i++) {
    const t = startAt + i * STEP;
    // driving palm-muted eighth-note bass on the bar root
    scheduleNote(BASS_ROOTS[Math.floor(i / 8)], t, STEP * 0.85, 'square', 0.014);
    // kick on the beats, hat on the off-beats, snare on 2 and 4
    if (i % 2 === 0) scheduleKick(t);
    else scheduleNoise(t, 0.04, 0.012, 6000);
    if (i % 8 === 4) scheduleNoise(t, 0.09, 0.025, 1800);
  }
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
