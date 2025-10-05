import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  getBlogBySlug,
  updateBlog,
  getPublishedBlogs,
} from "../controller/blogControl.js";

const blogRoute = express.Router();

// Define routes WITHOUT /api prefix
blogRoute.get("/", getAllBlogs); // GET /api/blogs
blogRoute.get("/published", getPublishedBlogs); // GET /api/blogs/published
blogRoute.get("/:id", getBlogById); // GET /api/blogs/:id
blogRoute.get("/slug/:slug", getBlogBySlug); // GET /api/blogs/slug/:slug
blogRoute.post("/", createBlog); // POST /api/blogs
blogRoute.put("/:id", updateBlog); // PUT /api/blogs/:id
blogRoute.delete("/:id", deleteBlog); // DELETE /api/blogs/:id

export default blogRoute;
