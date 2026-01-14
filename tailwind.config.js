/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#FF5E14",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "glass-border": "rgba(255, 255, 255, 0.2)",
        "glass-bg": "rgba(255, 255, 255, 0.05)",
        "glass-bg-hover": "rgba(255, 255, 255, 0.1)",
      },
      fontFamily: {
        "display": ["Poppins", "sans-serif"]
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "bg-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "organic-move-1": {
          "0%": {
            transform: "translate(0, 0) scale(1) rotate(0deg)",
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          },
          "50%": {
            transform: "translate(10%, 10%) scale(1.1) rotate(20deg)",
            borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%",
          },
          "100%": {
            transform: "translate(-5%, 5%) scale(0.9) rotate(-10deg)",
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          },
        },
        "organic-move-2": {
          "0%": {
            transform: "translate(0, 0) scale(1) rotate(0deg)",
            borderRadius: "40% 60% 60% 40% / 50% 60% 30% 60%",
          },
          "50%": {
            transform: "translate(-10%, -5%) scale(1.2) rotate(-15deg)",
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          },
          "100%": {
            transform: "translate(5%, -10%) scale(0.85) rotate(10deg)",
            borderRadius: "40% 60% 60% 40% / 50% 60% 30% 60%",
          },
        },
        "organic-move-3": {
          "0%": {
            transform: "translate(0, 0) scale(1)",
            borderRadius: "50%",
          },
          "33%": {
            transform: "translate(15%, -10%) scale(1.1)",
            borderRadius: "60% 40% 50% 50% / 40% 60% 60% 40%",
          },
          "66%": {
            transform: "translate(-10%, 15%) scale(0.9)",
            borderRadius: "40% 60% 40% 60% / 60% 40% 60% 40%",
          },
          "100%": {
            transform: "translate(0, 0) scale(1)",
            borderRadius: "50%",
          },
        },
        float: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "bg-shift": "bg-shift 20s ease infinite",
        "organic-move-1": "organic-move-1 25s infinite ease-in-out alternate",
        "organic-move-2": "organic-move-2 20s infinite ease-in-out alternate",
        "organic-move-3": "organic-move-3 22s infinite ease-in-out alternate",
        float: "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}