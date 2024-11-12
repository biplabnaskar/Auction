import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import playerRouter from "./routes/playerRoute.js";
import path from "path";
import { fileURLToPath } from "url";

// Set up __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// App config
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
connectDB();

// API endpoints
app.use("/api/player", playerRouter);

// Serve static images from 'uploads' directory
app.use("/images", express.static(path.join(__dirname, "uploads")));

// Root route
app.get("/", (req, res) => {
    res.send("API working");
});

// Start the server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
