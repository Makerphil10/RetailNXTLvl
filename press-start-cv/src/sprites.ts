/**
 * Box-shadow pixel art. Each character in a row maps to a palette color;
 * '.' is transparent. The sprite is rendered by a 4×4px div whose
 * box-shadow paints one square per pixel.
 */

const SCALE = 6;

const PALETTE: Record<string, string> = {
  h: '#4a3526', // hair
  g: '#5e4430', // hair highlight
  s: '#e8b88a', // skin
  e: '#1a1a1a', // eyes
  t: '#1f1f1f', // band shirt (punk rock approved)
  w: '#e8e8ff', // shirt print
  a: '#e8b88a', // arms
  l: '#6b4a2a', // belt
  p: '#3a5fcd', // jeans
  q: '#2e4ba6', // jeans shading
  b: '#222222', // boots
  x: '#ffd23f', // boot stripe
};

const FRAME_A = [
  '...hhhhhh...',
  '..hghhhhgh..',
  '..hssssssh..',
  '..ssessess..',
  '..ssssssss..',
  '...ssssss...',
  '..tttttttt..',
  '.atttttttta.',
  '.attwwwwtta.',
  '.attwwwwtta.',
  '..tttttttt..',
  '...llllll...',
  '...ppqqpp...',
  '...pp..pp...',
  '..xbb..bbx..',
  '..bbb..bbb..',
];

const FRAME_B = [
  '...hhhhhh...',
  '..hghhhhgh..',
  '..hssssssh..',
  '..ssessess..',
  '..ssssssss..',
  '...ssssss...',
  '..tttttttt..',
  '.atttttttta.',
  '.attwwwwtta.',
  '.attwwwwtta.',
  '..tttttttt..',
  '...llllll...',
  '..ppqqqqpp..',
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
