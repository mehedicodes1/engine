import rateLimit from "express-rate-limit";

const isDev = process.env.NODE_ENV === "development";
const WHITELISTED_IPS = ["127.0.0.1", "::1", "103.197.154.211"];

const skipIfWhitelisted = (req) => {
  const ip = req.ip.replace("::ffff:", ""); // handle IPv4-mapped IPv6
  return WHITELISTED_IPS.includes(ip);
};

// General API rate limiting
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isDev ? 1000 : 100,
  message: {
    error: "Too many requests from this IP, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: skipIfWhitelisted,
});

// Stricter limits for auth endpoints
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isDev ? 50 : 5,
  message: {
    error: "Too many authentication attempts, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: skipIfWhitelisted,
});

// File upload limits
export const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: isDev ? 50 : 10,
  message: {
    error: "Too many file uploads, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: skipIfWhitelisted,
});
