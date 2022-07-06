import express, { Express } from "express";
import path from "path";
import mongoose from "mongoose";
import { config } from "./config/db";
import { configureRoutes } from "./routes";
const PORT = 8080;

const mongoDB = config.db;
mongoose.set("autoIndex", true);

const connectDB = async () => {
  const con = await mongoose.connect(mongoDB);
  console.log(`MongoDB Connected.`);
};

connectDB();

const app: Express = express();
app.use(express.static(path.join(__dirname, "/../public")));
app.set("view engine", "pug");

configureRoutes(app);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT} port`);
});
