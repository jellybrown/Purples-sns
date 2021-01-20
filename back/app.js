import express from "express";
import mongoose from "mongoose";
import config from "./config";
import hpp from "hpp";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

import userRoutes from "./routes/api/user";
import authRoutes from "./routes/api/auth";
import followRoutes from "./routes/api/follow";
import postRoutes from "./routes/api/post";

const app = express();
const { MONGO_URI } = config;

app.use(hpp());
app.use(helmet());

app.use(cors({ origin: true, credential: true }));
app.use(morgan("dev"));

app.use(express.json());

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB connecting success"))
  .catch((e) => console.log(e));

app.get("/");
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/follow", followRoutes);
app.use("/api/post", postRoutes);

export default app;
