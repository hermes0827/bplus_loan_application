import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import router from "./routes/router";

const PORT = 4000;

const app = express();

app.use(morgan("dev"));
// app.use(helmet());
app.set("views", process.cwd() + "/src/views");
app.set("view engine", "pug");

app.use("/", router);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
