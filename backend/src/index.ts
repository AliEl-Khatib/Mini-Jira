import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import taskRoutes from "./routes/taskRoutes";

dotenv.config();

const app = express();

app.use(cors({
  origin: "https://mini-jira-nine.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
}));

// middleware
app.use(express.json());

// DB connection
connectDB().then(() => {
  console.log("MongoDB connected");
});

// routes
app.use("/api/tasks", taskRoutes);

// health check
app.get("/", (req, res) => {
  res.json({ status: "API running" });
});

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;