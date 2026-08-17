import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          900: '#0a1128', // Deepest background
          800: '#121b36', // Card background
          700: '#1c2847', // Hover state
          glow: '#3b82f6', // Neon blue accent
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-mesh': 'linear-gradient(to bottom right, #0a1128, #121b36, #0a1128)',
      }
    },
  },
  plugins: [],
};
export default config;