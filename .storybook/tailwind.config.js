/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '../src/**/*.{js,ts,jsx,tsx}',
    './.storybook/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        secondary: "#9ca3af",
        tertiary: "#dbeafe",
        danger: "#ef4444",
        warning: "#eab308",
        success: "#22c55e",
        info: "#06b6d4",
        dark: "#e5e7eb",
        bg: "#172554"
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        wave: {
          '0%': { transform: 'rotate(0.0deg)' },
          '10%': { transform: 'rotate(14deg)' },
          '20%': { transform: 'rotate(-8deg)' },
          '30%': { transform: 'rotate(14deg)' },
          '40%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(10.0deg)' },
          '60%': { transform: 'rotate(0.0deg)' },
          '100%': { transform: 'rotate(0.0deg)' },
        },
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        wave: 'wave 2s linear infinite',
      },
    },
  },
  plugins: [],
};