import express from "express";
import colors from "colors";
import cors from "cors";
import dotenv from "dotenv";
import { ConnectDb } from "./config/db.js";
import { userRouter } from "./routes/userRoutes.js";
import { profileRoute } from "./routes/profileroute.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
//routes spreading

app.use("/auth", userRouter);
app.use("/profile", profileRoute);

const PORT = 3002;
app.listen(PORT, () => {
  ConnectDb();
  console.log(`server running in ${PORT}`.bgMagenta);
});
