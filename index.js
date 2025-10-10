import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connect } from "./config/database.js";
import { apiLimiter } from "./middleware/rateLimit.js";

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
import emailRoute from "./routes/emailRoute.js";
import uploadRoute from "./routes/uploadRoute.js";
import toolsRoute from "./routes/toolsRoute.js";

dotenv.config();

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || "production";

// === Middleware ===
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(apiLimiter);

// === Static Files ===
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// === Health Check Routes ===
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head><title>Portfolio API</title></head>
      <body style="font-family:Arial;text-align:center;padding:30px;">
        <h2>🚀 Portfolio API is Running</h2>
        <p>Status: OK</p>
        <p>Environment: ${ENV}</p>
        <p>Server Time: ${new Date().toLocaleString()}</p>
        <p><a href="/api/health">Check API Health</a></p>
      </body>
    </html>
  `);
});

app.get("/api/health", (req, res) => {
  res.json({
    message: "Server is running successfully",
    status: "OK",
    timestamp: new Date().toISOString(),
    version: "2.0.0",
    environment: ENV,
  });
});

// === Root API Info ===
app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to Portfolio API",
    version: "2.0.0",
    environment: ENV,
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

// === Mount Routes ===
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
app.use("/api/email", emailRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/tools", toolsRoute);

// === 404 Handler - SIMPLIFIED VERSION ===
app.use((req, res, next) => {
  if (req.originalUrl.startsWith("/api/")) {
    return res.status(404).json({
      message: "API endpoint not found",
      path: req.originalUrl,
      method: req.method,
    });
  }
  next();
});

// === Global Error Handler ===
app.use((err, req, res, next) => {
  console.error("❌ Global Error:", err);
  res.status(500).json({
    message: "Internal Server Error",
    error: ENV === "development" ? err.message : "Something went wrong",
  });
});

// === Start Server ===
connect()
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`✅ Portfolio API running at: http://localhost:${PORT}`);
      console.log(`🌐 Environment: ${ENV}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  });

export default app;
