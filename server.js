import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";

dotenv.config(); // Load .env variables

const app = express();
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Allow frontend requests

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB Connection Failed:", err));

// API Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
