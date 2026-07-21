import { getRandomElementFromArray as rnd } from '@/utils/strings';

// These gradients are only ever consumed by the open-graph template, which is
// rendered by satori, not by a browser. Satori cannot parse `oklch()`, and
// Tailwind 4 emits its whole palette in oklch, so reading colours from
// `tailwindcss/colors` at runtime silently produced an unparseable gradient and
// a black background. The palette is therefore pinned here as sRGB hex.
//
// Values are the Tailwind 4 oklch colours converted to hex, so the rendered
// result is unchanged from what the design intended.
const palette = {
  gray: { '50': '#f9fafb', '100': '#f3f4f6', '200': '#e5e7eb', '300': '#d1d5dc' },
  indigo: { '50': '#eef2ff', '100': '#e0e7ff', '200': '#c6d2ff' },
  yellow: { '50': '#fefce8', '100': '#fef9c2', '200': '#fff085' },
  blue: { '50': '#eff6ff', '100': '#dbeafe', '200': '#bedbff' },
  cyan: { '50': '#ecfeff', '100': '#cefafe', '200': '#a2f4fd' },
  lime: { '50': '#f7fee7', '100': '#ecfcca', '200': '#d8f999' },
  sky: { '50': '#f0f9ff', '100': '#dff2fe', '200': '#b8e6fe' },
} as const;

const colors = ['gray', 'indigo', 'yellow', 'blue', 'cyan', 'lime', 'sky', 'white'] as const;
const shades = ['50', '100', '200'] as const;
const directions = ['to right', 'to bottom', '45deg'];

// to support white
const getRandomColor = () => {
  const rndColor = rnd(colors);
  return rndColor === 'white' ? rndColor : palette[rndColor][rnd(shades)];
};

export const getRandomGradient = () =>
  `background: linear-gradient(${rnd(directions)}, ${getRandomColor()}, ${getRandomColor()})`;

export const grayGradient = `background: linear-gradient(to right, ${palette.gray[100]}, ${palette.gray[300]})`;
