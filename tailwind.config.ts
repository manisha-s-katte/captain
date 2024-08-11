import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/[object Object].js"
  ],
  theme: {
    extend: {
      
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        'proxima-nova': ['"Proxima Nova"', 'sans-serif'],
        'oswald': ["Oswald", 'sans-serif'],
      },

      transitionProperty: {
        'background': 'background-color',
        'all': 'all',
      },
      transitionDuration: {
        '300': '300ms',
        '500': '500ms',
      },
      colors: {
        'underline-yellow': '#F7E02E',
      },
      textDecorationColor: {
        'underline-yellow': '#F7E02E',
      },
    },
  },
  plugins: [nextui()],
};
export default config;
