import express from "express";
import {
    createExperience,
    deleteExperience,
    getAllExperiences,
    getExperienceById,
    updateExperience
} from "../controller/experienceControl.js";

const experienceRoute = express.Router();

experienceRoute.get("/api/experiences", getAllExperiences);
experienceRoute.get("/api/experiences/:id", getExperienceById);
experienceRoute.post("/api/experiences", createExperience);
experienceRoute.put("/api/experiences/:id", updateExperience);
experienceRoute.delete("/api/experiences/:id", deleteExperience);

export default experienceRoute;