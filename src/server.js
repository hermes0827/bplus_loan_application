import express from "express";
import favicon from "serve-favicon";
import path from "path";
import morgan from "morgan";
import router from "./routes/router";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

app.use(morgan("dev"));
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
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
app.set("views", process.cwd() + "/src/views");
app.set("view engine", "pug");

app.use("/", router);
app.use("/static", express.static("assets"));

export default app;
