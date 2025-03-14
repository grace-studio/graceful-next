import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    '../lib/**/*.tsx',
  ],
  theme: {
    extend: {
      colors: {
        'button-primary-bg': 'var(--button-primary-bg)',
        'button-primary-text': 'var(--button-primary-text)',
        'button-primary-bg--hover': 'var(--button-primary-bg--hover)',
        'button-primary-text--hover': 'var(--button-primary-text--hover)',
        'button-primary-bg--disabled': 'var(--button-primary-bg--disabled)',
        'button-primary-text--disabled': 'var(--button-primary-text--disabled)',

        'button-secondary-bg': 'var(--button-secondary-bg)',
        'button-secondary-text': 'var(--button-secondary-text)',
        'button-secondary-bg--hover': 'var(--button-secondary-bg--hover)',
        'button-secondary-text--hover': 'var(--button-secondary-text--hover)',
        'button-secondary-bg--disabled': 'var(--button-secondary-bg--disabled)',
        'button-secondary-text--disabled':
          'var(--button-secondary-text--disabled)',

        'button-tertiary-bg': 'var(--button-tertiary-bg)',
        'button-tertiary-text': 'var(--button-tertiary-text)',
        'button-tertiary-bg--hover': 'var(--button-tertiary-bg--hover)',
        'button-tertiary-text--hover': 'var(--button-tertiary-text--hover)',
        'button-tertiary-bg--disabled': 'var(--button-tertiary-bg--disabled)',
        'button-tertiary-text--disabled':
          'var(--button-tertiary-text--disabled)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      transitionTimingFunction: {
        bezier: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
      },
    },
  },
  plugins: [],
};
export default config;
