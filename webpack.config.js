const path = require("path");
const Dotenv = require("dotenv-webpack");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const BASE_JS = "./src/public/js/";

module.exports = {
  entry: {
    main: BASE_JS + "main.js",
    home: BASE_JS + "home.js",
    apply: BASE_JS + "apply.js",
    cert: BASE_JS + "cert.js",
    kyc: BASE_JS + "kyc.js",
    scraping: BASE_JS + "scraping.js",
    scrapingFromHyphen: BASE_JS + "scrapingFromHyphen.js",
  },
  plugins: [
    new Dotenv(),
    new CopyPlugin({
      patterns: [{ from: "src/public/cert", to: "cert" }],
    }),
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),
  ],
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "assets"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
