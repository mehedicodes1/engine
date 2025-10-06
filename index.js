import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connect } from "./config/database.js";
import { apiLimiter } from "./middleware/rateLimit.js";

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
// Removed authRoute import for now to skip JWT

// ES modules fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow requests from any origin
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Rate limiting (apply to all API routes)
app.use(apiLimiter);

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Root HTML for health check
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head><title>Portfolio API</title></head>
      <body style="font-family: Arial; text-align: center; padding: 30px;">
        <h2>🚀 Portfolio API is Running</h2>
        <p>Status: OK</p>
        <p>Environment: ${process.env.NODE_ENV || "production"}</p>
        <p><a href="/api/health">Go to /api/health</a></p>
      </body>
    </html>
  `);
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    message: "Server is running!",
    timestamp: new Date().toISOString(),
    status: "OK",
    version: "2.0.0",
    environment: process.env.NODE_ENV || "production",
    baseUrl: `${req.protocol}://${req.get("host")}`,
  });
});

// Root API info
app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to Portfolio API",
    version: "2.0.0",
    environment: process.env.NODE_ENV || "production",
    baseUrl: `${req.protocol}://${req.get("host")}`,
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
      email: "/api/email",
      upload: "/api/upload",
      tools: "/api/tools",
      health: "/api/health",
    },
  });
});

// Mount all portfolio routes (no JWT/auth middleware)
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

// Mount new feature routes (without JWT)
app.use("/api/email", emailRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/tools", toolsRoute);

// 404 for unknown API routes
app.use("/api", (req, res) => {
  res.status(404).json({
    message: "API endpoint not found",
    path: req.originalUrl,
    method: req.method,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global error:", err);
  res.status(500).json({
    message: "Internal server error",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Something went wrong",
  });
});

// Connect DB and start server
connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  });

export default app;
