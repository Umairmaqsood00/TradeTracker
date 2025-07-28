import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        border: 'var(--border)',
        accent: 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        card: 'var(--card)',
        'input-bg': 'var(--input-bg)',
      },
      backgroundColor: {
        'input-bg': 'var(--input-bg)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}

export default config; 