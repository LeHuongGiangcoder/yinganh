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
          muted: '#5A78A3',
        },
        gold: {
          DEFAULT: '#E7C965',
          light: '#F0DC98',
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
