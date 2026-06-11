/**
 * Box-shadow pixel art. Each character in a row maps to a palette color;
 * '.' is transparent. The sprite is rendered by a 4×4px div whose
 * box-shadow paints one square per pixel.
 */

const SCALE = 4;

const PALETTE: Record<string, string> = {
  h: '#3d2b1f', // hair
  s: '#e8b88a', // skin
  e: '#1a1a1a', // eyes
  t: '#1f1f1f', // band shirt (punk rock approved)
  w: '#e8e8ff', // shirt print
  a: '#e8b88a', // arms
  p: '#3a5fcd', // jeans
  b: '#222222', // boots
  x: '#ffd23f', // boot stripe
};

const FRAME_A = [
  '...hhhhhh...',
  '..hhhhhhhh..',
  '..hssssssh..',
  '..ssessess..',
  '..ssssssss..',
  '...ssssss...',
  '..tttttttt..',
  '.atttttttta.',
  '.attwwwwtta.',
  '.atttttttta.',
  '..tttttttt..',
  '...pppppp...',
  '...pp..pp...',
  '...pp..pp...',
  '..xbb..bbx..',
  '..bbb..bbb..',
];

const FRAME_B = [
  '...hhhhhh...',
  '..hhhhhhhh..',
  '..hssssssh..',
  '..ssessess..',
  '..ssssssss..',
  '...ssssss...',
  '..tttttttt..',
  '.atttttttta.',
  '.attwwwwtta.',
  '.atttttttta.',
  '..tttttttt..',
  '...pppppp...',
  '..pp....pp..',
  '.pp......pp.',
  'xbb......bbx',
  'bbb......bbb',
];

function toShadow(frame: string[]): string {
  const shadows: string[] = [];
  frame.forEach((row, y) => {
    [...row].forEach((ch, x) => {
      const color = PALETTE[ch];
      if (color) shadows.push(`${x * SCALE}px ${y * SCALE}px 0 0 ${color}`);
    });
  });
  return shadows.join(',');
}

export const PLAYER_FRAMES = [toShadow(FRAME_A), toShadow(FRAME_B)];
export const SPRITE_W = 12 * SCALE;
export const SPRITE_H = 16 * SCALE;
