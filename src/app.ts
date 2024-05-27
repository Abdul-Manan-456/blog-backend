import { config } from "dotenv";
import express, { Express } from "express";

import indexRouter from "./routes";
import { errorHandler } from "./utils";
config();
const app: Express = express();
const file = "abc";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api/v1", indexRouter);

app.use("/*", (req, res) => {
  res.status(400).json({
    code: 400,
    message: "This Route does not exist. Please Provide the correct route",
  });
});
app.use(errorHandler);
export default app;
