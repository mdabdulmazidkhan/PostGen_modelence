/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./src/client/**/*.{js,jsx,ts,tsx}",
      "./node_modules/@modelence/auth-ui/dist/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#5e17eb',
            50: '#f3f0ff',
            100: '#e9e2ff',
            200: '#d6c9ff',
            300: '#b8a3ff',
            400: '#9470ff',
            500: '#7c3aed',
            600: '#6d28d9',
            700: '#5e17eb',
            800: '#4c1d95',
            900: '#3b0764',
          }
        }
      },
    },
    plugins: [],
    darkMode: 'class',
}