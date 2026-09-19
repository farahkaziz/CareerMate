require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "CareerMate API is running 🚀",
  });
});

// API routes
const careersRouter = require("./routes/careers");
const skillsRouter = require("./routes/skills");
const jobsRouter = require("./routes/jobs");

app.use("/api/careers", careersRouter);
app.use("/api/skills", skillsRouter);
app.use("/api/jobs", jobsRouter);

// 404 for unknown API routes
app.use((req, res, next) => {
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({
      success: false,
      message: "Not found",
    });
  }

  next();
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error("========== API ERROR ==========");
  console.error("Message:", err?.message);
  console.error("Stack:", err?.stack);
  console.error("================================");

  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: err?.message || "Unknown error",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});