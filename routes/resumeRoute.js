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

resumeRoute.get("/api/resumes", getAllResumes);
resumeRoute.get("/api/resumes/current", getCurrentResume);
resumeRoute.get("/api/resumes/:id", getResumeById);
resumeRoute.post("/api/resumes", createResume);
resumeRoute.put("/api/resumes/:id", updateResume);
resumeRoute.delete("/api/resumes/:id", deleteResume);

export default resumeRoute;