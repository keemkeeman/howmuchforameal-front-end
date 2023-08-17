/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "noto-sans": ["Noto Sans KR", "sans-serif"],
        // 다른 폰트 설정 추가 가능
      },
    },
  },
  plugins: [],
};
