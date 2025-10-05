import express from "express";
import {
    createBlog,
    deleteBlog,
    getAllBlogs,
    getBlogById,
    getBlogBySlug,
    updateBlog,
    getPublishedBlogs
} from "../controller/blogControl.js";

const blogRoute = express.Router();

blogRoute.get("/api/blogs", getAllBlogs);
blogRoute.get("/api/blogs/published", getPublishedBlogs);
blogRoute.get("/api/blogs/:id", getBlogById);
blogRoute.get("/api/blogs/slug/:slug", getBlogBySlug);
blogRoute.post("/api/blogs", createBlog);
blogRoute.put("/api/blogs/:id", updateBlog);
blogRoute.delete("/api/blogs/:id", deleteBlog);

export default blogRoute;