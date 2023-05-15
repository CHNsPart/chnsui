/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  darkMode: 'dark',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
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
        rubberBand: {
            '0%': { 
              transform: 'scale3d(1, 1, 1)' 
              },
            '30%': { 
              transform: 'scale3d(1.25, 0.75, 1)' 
              },
            '40%': { 
              transform: 'scale3d(0.75, 1.25, 1)' 
              },
            '50%': { 
              transform: 'scale3d(1.15, 0.85, 1)' 
              },
            '65%': { 
              transform: 'scale3d(.95, 1.05, 1)' 
              },
            '75%': { 
              transform: 'scale3d(1.05, .95, 1)' 
              },
            '100%': { 
              transform: 'scale3d(1, 1, 1)' 
              },
          },
          flash: {
            '25%, 40%': { opacity: '0' },
            '50%': { opacity: '1' },
            '75%': { opacity: '0' },
          },
          jello: {
            '11.1%,': { transform: 'scale3d(0, 0, 0)' },
            '33.3%': { transform: 'skewX(-12.5deg) skewY(-12.5deg)' },
            '44.4%': { transform: 'skewX(6.25deg) skewY(6.25deg)' },
            '55.5%': { transform: 'skewX(-3.125deg) skewY(-3.125deg)' },
            '66.6%': { transform: 'skewX(1.5625) skewY(1.5625)' },
            '77.7%': { transform: 'skewX(-0.78125) skewY(-0.78125)' },
            '88.8%': { transform: 'skewX(-0.1953125deg) skewY(-0.1953125deg)'},
          }
      },
       animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        wave: 'wave 2s linear infinite',
        rubberBand: 'rubberBand 1s infinite',
        flash: 'flash 3s ease-in-out infinite',
        jello: 'jello 2s infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
