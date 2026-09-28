import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Pale sky the whole invitation sits on
        sky: {
          DEFAULT: '#EAF1F9',
          deep: '#D6E4F2',
          light: '#F7FAFD',
        },
        // Every line, rule and letter is drawn in navy
        ink: {
          DEFAULT: '#12305B',
          soft: '#2A4C7D',
          muted: '#6B86AC',
        },
        gold: {
          DEFAULT: '#C79A2E',
          light: '#E8C86A',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        script: ['var(--font-script)', 'cursive'],
      },
      letterSpacing: {
        widest: '0.25em',
        ultra: '0.4em',
      },
    },
  },
  plugins: [],
};
export default config;
