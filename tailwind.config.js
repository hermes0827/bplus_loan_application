module.exports = {
  content: ["./src/**/*.{pug, js, html}"],
  theme: {
    fontFamily: {
      sans: [
        "Pretendard",
        "-apple-system",
        "BlinkMacSystemFont",
        "system-ui",
        "Roboto",
        "'Helvetica Neue'",
        "'Segoe UI'",
        "'Apple SD Gothic Neo'",
        "'Noto Sans KR'",
        "'Malgun Gothic'",
        "'Apple Color Emoji'",
        "'Segoe UI Emoji'",
        "'Segoe UI Symbol'",
        "sans-serif",
      ],
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("daisyui"),
  ],
  daisyui: {
    styled: true,
    themes: [
      {
        mytheme: {
          primary: "#facc15",
          secondary: "#fde68a",
          accent: "#18182F",
          neutral: "#18182F",
          "base-100": "#FFFFFF",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
};
