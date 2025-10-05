import express from "express";
import {
    createEducation,
    deleteEducation,
    getAllEducation,
    getEducationById,
    updateEducation
} from "../controller/educationControl.js";

const educationRoute = express.Router();

educationRoute.get("/api/education", getAllEducation);
educationRoute.get("/api/education/:id", getEducationById);
educationRoute.post("/api/education", createEducation);
educationRoute.put("/api/education/:id", updateEducation);
educationRoute.delete("/api/education/:id", deleteEducation);

export default educationRoute;