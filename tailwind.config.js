/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        app: '#121214',
        panel: '#17181c',
        soft: '#1e2026',
        primary: '#ff8b2b',
        primaryGlow: '#ffb347',
        accent: '#22c55e',
        textDim: '#9aa0ad',
        line: 'rgba(255,255,255,0.08)',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,139,43,0.22), 0 18px 40px rgba(255,139,43,0.2)',
        panel: '0 20px 60px rgba(0,0,0,0.45)',
      },
      backgroundImage: {
        grid:
          'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulseRing: 'pulseRing 2.4s ease-out infinite',
        markerDrop: 'markerDrop 500ms cubic-bezier(0.18, 0.89, 0.32, 1.28) both',
        markerExit: 'markerExit 240ms ease forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.7)', opacity: '0.9' },
          '70%': { transform: 'scale(1.8)', opacity: '0' },
          '100%': { transform: 'scale(1.8)', opacity: '0' },
        },
        markerDrop: {
          '0%': { transform: 'translateY(-16px) scale(0.72)', opacity: '0' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
        },
        markerExit: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.55)', opacity: '0' },
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
