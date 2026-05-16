/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"SF Pro Display"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        body: ['"SF Pro Text"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['"SF Mono"', 'Monaco', 'Inconsolata', 'monospace'],
      },
      colors: {
        apple: {
          blue: '#0071e3',
          'blue-light': '#42a1ec',
          'blue-dark': '#0058b0',
          silver: '#f5f5f7',
          graphite: '#1d1d1f',
          black: '#000000',
          neon: '#00d4ff',
          'neon-green': '#00ff94',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 212, 255, 0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
