import express from "express";
import {
    createProject,
    deleteProject,
    getAllProjects,
    getProjectById,
    getProjectBySlug,
    getFeaturedProjects,
    updateProject
} from "../controller/projectControl.js";

const projectRoute = express.Router();

projectRoute.get("/api/projects", getAllProjects);
projectRoute.get("/api/projects/featured", getFeaturedProjects);
projectRoute.get("/api/projects/:id", getProjectById);
projectRoute.get("/api/projects/slug/:slug", getProjectBySlug);
projectRoute.post("/api/projects", createProject);
projectRoute.put("/api/projects/:id", updateProject);
projectRoute.delete("/api/projects/:id", deleteProject);

export default projectRoute;