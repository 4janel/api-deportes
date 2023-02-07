import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 3000;
export const SERVER_URL = process.env.SERVER_URL || "http://localhost:3000";
export const API_URL = process.env.API_URL || "./src/routes/*.js";
