import express from "express";
import {
    createResume,
    deleteResume,
    getAllResumes,
    getResumeById,
    getCurrentResume,
    updateResume
} from "../controller/resumeControl.js";

const resumeRoute = express.Router();

resumeRoute.get("/", getAllResumes);
resumeRoute.get("/current", getCurrentResume);
resumeRoute.get("/:id", getResumeById);
resumeRoute.post("/", createResume);
resumeRoute.put("/:id", updateResume);
resumeRoute.delete("/:id", deleteResume);

export default resumeRoute;