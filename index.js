import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';
import { connect } from "./config/database.js";
import { apiLimiter, authLimiter } from "./middleware/rateLimit.js";

// Import all portfolio routes
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

// Import new feature routes
import emailRoute from "./routes/emailRoute.js";
import uploadRoute from "./routes/uploadRoute.js";
import toolsRoute from "./routes/toolsRoute.js";
import authRoute from "./routes/authRoute.js";

// ES modules fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// For cPanel deployment - get port from environment
const cpanelPort = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Rate limiting (apply to all routes except static files)
app.use(apiLimiter);

// Serve uploaded files statically - use absolute path for cPanel
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    message: "Server is running!",
    timestamp: new Date().toISOString(),
    status: "OK",
    version: "2.0.0",
    environment: process.env.NODE_ENV || "production",
    baseUrl: `${req.protocol}://${req.get('host')}`,
    features: {
      authentication: true,
      fileUpload: true,
      emailSystem: true,
      rateLimiting: true,
      saasTools: true
    }
  });
});

// Root endpoint
app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to Portfolio API",
    version: "2.0.0",
    environment: process.env.NODE_ENV || "production",
    baseUrl: `${req.protocol}://${req.get('host')}`,
    endpoints: {
      // Core portfolio endpoints
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
      
      // New feature endpoints
      auth: "/api/auth",
      email: "/api/email",
      upload: "/api/upload",
      tools: "/api/tools",
      health: "/api/health"
    },
    newFeatures: [
      "JWT Authentication",
      "File Upload System",
      "Email Service",
      "Rate Limiting",
      "SaaS Tools"
    ]
  });
});

// Mount all portfolio routes
app.use("/api/blogs", blogRoute);
app.use("/api/projects", projectRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/certifications", certificationRoute);
app.use("/api/contacts", contactRoute);
app.use("/api/education", educationRoute);
app.use("/api/experiences", experienceRoute);
app.use("/api/resumes", resumeRoute);
app.use("/api/services", serviceRoute);
app.use("/api/settings", settingRoute);
app.use("/api/skills", skillRoute);
app.use("/api/social-links", socialLinkRoute);
app.use("/api/testimonials", testimonialRoute);

// Mount new feature routes
app.use("/api/auth", authLimiter, authRoute);
app.use("/api/email", emailRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/tools", toolsRoute);

// 404 handler for API routes
app.use("/api", (req, res) => {
  res.status(404).json({
    message: "API endpoint not found",
    path: req.originalUrl,
    method: req.method,
    suggestion: "Check available endpoints at /api",
    availableEndpoints: [
      "/api/health",
      "/api/blogs",
      "/api/projects",
      "/api/auth/login",
      "/api/auth/register"
    ]
  });
});

// Root path handler - important for cPanel subdirectory
app.get("/", (req, res) => {
  res.json({
    message: "Portfolio API Server",
    version: "2.0.0",
    status: "running",
    documentation: "/api",
    healthCheck: "/api/health",
    note: "This API is deployed in /engine subdirectory. Use /api endpoints for all operations."
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error("Global error handler:", error);
  res.status(500).json({
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? error.message : "Something went wrong",
  });
});

// Initialize database and start server
connect()
  .then(() => {
    app.listen(cpanelPort, () => {
      console.log(`🚀 Server is running on port ${cpanelPort}`);
      console.log(`📊 Health check: /api/health`);
      console.log(`🌐 Environment: ${process.env.NODE_ENV || "production"}`);
      console.log(`🛡️  Features: Authentication, File Upload, Email, Rate Limiting, SaaS Tools`);
      console.log(`📧 Email: ${process.env.SMTP_USER ? 'Configured' : 'Not configured'}`);
      console.log(`📍 Base URL: https://mehedicodes.com/engine`);
    });
  })
  .catch((error) => {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  });

export default app;