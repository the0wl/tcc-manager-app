import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "Background": "#E2E2E7",
        "StrongText": "#47464F",
        "Card": "#3C5AEB",
        "SecondCard": "#D63031",
        "NotFocused": "#A6A6AB",
      },
    },
  },
  plugins: [],
}
export default config
