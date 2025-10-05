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

projectRoute.get("/", getAllProjects);
projectRoute.get("/featured", getFeaturedProjects);
projectRoute.get("/:id", getProjectById);
projectRoute.get("/slug/:slug", getProjectBySlug);
projectRoute.post("/", createProject);
projectRoute.put("/:id", updateProject);
projectRoute.delete("/:id", deleteProject);

export default projectRoute;