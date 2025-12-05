/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Anime theme colors
        'anime-black': '#000000',
        'anime-orange': '#FF6B00',
        'anime-blue': '#0033A0',
        'anime-cyan': '#00E9FF',
        'anime-gunmetal': '#1A1A1A',
        'anime-red': '#FF1E56',
        'anime-yellow': '#FFD60A',
        // Legacy compatibility
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          hover: "var(--primary-hover)",
        },
        secondary: "var(--secondary)",
        border: "var(--border)",
        muted: "var(--muted)",
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
        sans: ['Roboto', 'system-ui', 'sans-serif'],
        heading: ['Orbitron', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'neon-orange': '0 0 10px rgba(255, 107, 0, 0.5), 0 0 20px rgba(255, 107, 0, 0.3)',
        'neon-cyan': '0 0 10px rgba(0, 233, 255, 0.5), 0 0 20px rgba(0, 233, 255, 0.3)',
      },
    },
  },
  plugins: [],
};
