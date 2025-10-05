import express from "express";
import {
    createExperience,
    deleteExperience,
    getAllExperiences,
    getExperienceById,
    updateExperience
} from "../controller/experienceControl.js";

const experienceRoute = express.Router();

experienceRoute.get("/", getAllExperiences);
experienceRoute.get("/:id", getExperienceById);
experienceRoute.post("/", createExperience);
experienceRoute.put("/:id", updateExperience);
experienceRoute.delete("/:id", deleteExperience);

export default experienceRoute;