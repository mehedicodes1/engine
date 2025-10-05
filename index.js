import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connect } from "./config/database.js";

// Import all routes
import blogRoute from "./routes/blogRoute.js";
import projectRoute from "./routes/projectRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import certificationRoute from "./routes/certificationRoute.js";
import contactRoute from "./routes/contactRoute.js";
import educationRoute from "./routes/educationRoute.js";
import experienceRoute from "./routes/experienceRoute.js";
import resumeRoute from "./routes/resumeRoute.js";
import serviceRoute from "./routes/serviceRoute.js";
import settingRoute from "./routes/settingRoute.js";
import skillRoute from "./routes/skillRoute.js";
import socialLinkRoute from "./routes/socialLinkRoute.js";
import testimonialRoute from "./routes/testimonialRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    message: "Server is running!",
    timestamp: new Date().toISOString(),
    status: "OK",
  });
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Portfolio API",
    version: "1.0.0",
    endpoints: {
      blogs: "/api/blogs",
      projects: "/api/projects",
      categories: "/api/categories",
      certifications: "/api/certifications",
      contacts: "/api/contacts",
      education: "/api/education",
      experiences: "/api/experiences",
      resumes: "/api/resumes",
      services: "/api/services",
      settings: "/api/settings",
      skills: "/api/skills",
      socialLinks: "/api/social-links",
      testimonials: "/api/testimonials",
    },
  });
});

// Use all routes
app.use(blogRoute);
app.use(projectRoute);
app.use(categoryRoute);
app.use(certificationRoute);
app.use(contactRoute);
app.use(educationRoute);
app.use(experienceRoute);
app.use(resumeRoute);
app.use(serviceRoute);
app.use(settingRoute);
app.use(skillRoute);
app.use(socialLinkRoute);
app.use(testimonialRoute);

// 404 handler for all other routes - SIMPLIFIED
app.use((req, res) => {
  if (req.originalUrl.startsWith("/api/")) {
    res.status(404).json({
      message: "API endpoint not found",
      path: req.originalUrl,
      method: req.method,
    });
  } else {
    res.status(404).json({
      message: "Route not found",
      suggestion: "Use /api/ endpoints for API access",
      availableEndpoints: "/api/health",
    });
  }
});

// Global error handler
app.use((error, req, res, next) => {
  console.error("Global error handler:", error);
  res.status(500).json({
    message: "Internal server error",
    error:
      process.env.NODE_ENV === "development"
        ? error.message
        : "Something went wrong",
  });
});

// Initialize database and start server
connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
      console.log(`🌐 Environment: ${process.env.NODE_ENV || "development"}`);
    });
  })
  .catch((error) => {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  });

export default app;
