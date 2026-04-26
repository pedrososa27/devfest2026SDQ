import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary backgrounds
        'bg-primary-dark': '#0A0A0F',
        'bg-primary-light': '#FFFFFF',
        'bg-secondary-dark': '#13131A',
        'bg-secondary-light': '#FAF9F5',
        'bg-tertiary-dark': '#1A1A24',
        'bg-tertiary-light': '#F1F1F1',
        'bg-card-dark': '#16161F',
        'bg-card-light': '#FFFFFF',
        
        // Foreground/Text
        'fg-primary-dark': '#FFFFFF',
        'fg-primary-light': '#141413',
        'fg-secondary-dark': '#A1A1AA',
        'fg-secondary-light': '#47362C',
        'fg-muted-dark': '#6B6B75',
        'fg-muted-light': '#757575',
        
        // Borders
        'border-subtle-dark': '#2A2A35',
        'border-subtle-light': '#E5E5E5',
        'border-strong-dark': '#3A3A48',
        'border-strong-light': '#CCCCCC',
        
        // Accent Colors
        'neon-purple-dark': '#A855F7',
        'neon-purple-light': '#7C3AED',
        'neon-cyan-dark': '#22D3EE',
        'neon-cyan-light': '#0891B2',
        'neon-pink-dark': '#EC4899',
        'neon-pink-light': '#DB2777',
        
        // Accent system colors
        'accent-blue': '#4285F4',
        'accent-green': '#34A853',
        'accent-red': '#EA4335',
        'accent-yellow': '#FBBC04',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #A855F7, #EC4899)',
      },
    },
  },
  plugins: [],
};

export default config;
