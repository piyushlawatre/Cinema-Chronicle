/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "color-primary": "#6741d9",
        "color-primary-light": "#7950f2",
        "color-text": "#dee2e6",
        "color-text-dark": "#adb5bd",
        "color-background-100": "#343a40",
        "color-background-500": "#2b3035",
        "color-background-900": "#212529",
        "color-red": "#fa5252",
        "color-red-dark": "#e03131",
      },
      spacing: {
        2.4: "2.4rem",
        3.2: "3.2rem",
        7.2: "7.2rem",
        1.6: "1.6rem",
      },
      fontSize: {
        "2rem": "2rem",
        "3.2rem": "3.2rem",
        "1.4rem": "1.4rem",
        "1.8rem": "1.8rem",
        "1.6rem": "1.6rem",
      },
      boxShadow: {
        "custom-light": "0 2px 4px rgba(0, 0, 0, 0.1)",
        "custom-dark": "0 8px 20px rgba(0, 0, 0, 0.2)",
      },
      borderRadius: {
        "0.9rem": "0.9rem",
        full: "50%",
      },
      aspectRatio: {
        1: "1",
      },
    },
  },
  plugins: [],
};
