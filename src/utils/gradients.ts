import { default as twColors } from 'tailwindcss/colors';

import { getRandomElementFromArray as rnd } from '@/utils/strings';

// Tailwind 4 dropped the generated `tailwindcss/types/generated/colors` entry
// point, so derive the shape from the runtime export instead.
type TwColors = typeof twColors;
/** Palette keys that resolve to a shade record, e.g. 'gray', not 'inherit'. */
type ShadedColorKeys = {
  [K in keyof TwColors]: TwColors[K] extends Record<string, string> ? K : never;
}[keyof TwColors];
type ShadeKeys = keyof TwColors[ShadedColorKeys];

const colors = ['gray', 'indigo', 'yellow', 'blue', 'cyan', 'lime', 'sky', 'white'] as const;
const shades = ['50', '100', '200'] as const satisfies readonly ShadeKeys[];
const directions = ['to right', 'to bottom', '45deg'];

// to support white
const getRandomColor = () => {
  const rndColor = rnd(colors);
  return rndColor === 'white' ? rndColor : twColors[rndColor][rnd(shades)];
};

export const getRandomGradient = () =>
  `background: linear-gradient(${rnd(directions)}, ${getRandomColor()}, ${getRandomColor()})`;

export const grayGradient = `background: linear-gradient(to right, ${twColors.gray[100]}, ${twColors.gray[300]})`;
