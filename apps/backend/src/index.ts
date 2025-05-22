import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import * as functions from "firebase-functions";
import { onRequest } from "firebase-functions/v2/https";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/user", userRoutes);

// Export ke Firebase Functions
export const server = onRequest(app);
