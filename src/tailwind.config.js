module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'neon-bg': '#0f0f0f',
        'neon-text': '#39ff14',
        'vivid-bg': '#1a1aff',
        'vivid-text': '#ffcc00',
        'life-bg': '#e6ffe6',
        'life-text': '#006600',
      },
      keyframes: {
        glowMove: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
      animation: {
        glowMove: 'glowMove 8s ease infinite',
      },
    },
  },
  safelist: [
    'glow-button',
    'animate-glow',
    'tab-active',
  ],
  plugins: [],
}
