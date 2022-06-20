import express from "express";
import morgan from "morgan";
import router from "./routes/router";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(
  "/api",
  createProxyMiddleware({
    target: "https://api.hyphen.im",
    changeOrigin: true,
    pathRewrite: {
      "^/api": "/",
    },
  })
);
// app.use(
//   "/nateon",
//   createProxyMiddleware({
//     target:
//       "https://teamroom.nate.com/api/webhook/46a81c1f/jHYjXRHCN5yLWo3ORzSqzKhy",
//     changeOrigin: true,
//     pathRewrite: {
//       "^/nateon": "",
//     },
//   })
// );
// app.use(
//   "/bplus",
//   createProxyMiddleware({
//     target: "https://benefitplus.kr/api/loan_recpetion",
//     changeOrigin: true,
//     pathRewrite: {
//       "^/bplus": "",
//     },
//   })
// );
app.set("views", process.cwd() + "/src/views");
app.set("view engine", "pug");

app.use("/", router);
app.use("/static", express.static("assets"));

export default app;
