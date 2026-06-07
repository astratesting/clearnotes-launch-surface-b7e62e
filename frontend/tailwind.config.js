/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "sky-blue": "#7EC8E3",
        "mint": "#B4E6C4",
        "sand": "#F5E6D3",
        "soft-white": "#FEFEFE",
        "calm-blue": {
          50: "#F0F9FF",
          100: "#E0F2FE",
          200: "#BAE6FD",
          300: "#7DD3FC",
          400: "#38BDF8",
          500: "#0EA5E9",
          600: "#0284C7",
          700: "#0369A1",
          800: "#075985",
          900: "#0C4A6E",
        },
      },
      fontFamily: {
        sans: ["Geist Sans", "system-ui", "sans-serif"],
        display: ["Lora", "Georgia", "serif"],
        mono: ["Geist Mono", "monospace"],
      },
      backgroundImage: {
        "gradient-calm": "linear-gradient(135deg, #7EC8E3 0%, #B4E6C4 100%)",
        "gradient-sand": "linear-gradient(180deg, #FEFEFE 0%, #F5E6D3 100%)",
        "gradient-hero": "radial-gradient(ellipse at top, #F0F9FF 0%, #FEFEFE 50%, #F5E6D3 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      spacing: {
        "relaxed": "2.5rem",
        "loose": "4rem",
        "section": "8rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
