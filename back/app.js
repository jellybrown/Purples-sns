import express from "express";
import mongoose from "mongoose";
import config from "./config"; // .env에 저장된 정보를 담은 Javascript Object
import hpp from "hpp";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

// Import Routers
import userRoutes from "./routes/api/user";
import authRoutes from "./routes/api/auth";
import followRoutes from "./routes/api/follow";
import postRoutes from "./routes/api/post";
import searchRoutes from "./routes/api/search";

const app = express();
const { MONGO_URI } = config; // MongoDB Server URI 정보 (.env)

app.use(hpp());
app.use(helmet());

app.use(cors({ origin: true, credential: true }));
app.use(morgan("dev"));

app.use(express.json());

// Connect mongo server
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB connecting success"))
  .catch((e) => console.log(e));

// Routing 적용
app.get("/");
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/follow", followRoutes);
app.use("/api/post", postRoutes);
app.use("/api/search", searchRoutes);

export default app;
