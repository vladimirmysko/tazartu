import type { Config } from 'tailwindcss';
import { transparent, white, black } from 'tailwindcss/colors';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      red: '#ff3b30',
      white,
      black,
      transparent,
    },
    fontFamily: {
      sans: ['var(--font-inter-display)'],
    },
    fontSize: {
      '4xs': ['0.6875rem', '0.8125rem'],
      '3xs': ['0.75rem', '1rem'],
      '2xs': ['0.8125rem', '1.125rem'],
      xs: ['0.9375rem', '1.25rem'],
      sm: ['1rem', '1.3125rem'],
      base: ['1.0625rem', '1.375rem'],
      lg: ['1.25rem', { lineHeight: '1.5625rem', letterSpacing: '-0.01em' }],
      xl: ['1.375rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],
      '2xl': ['1.75rem', { lineHeight: '2.125rem', letterSpacing: '-0.01em' }],
      '3xl': ['2.125rem', { lineHeight: '2.5625rem', letterSpacing: '-0.01em' }],
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
  plugins: [typography, forms],
};

export default config;
