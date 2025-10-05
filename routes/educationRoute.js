import express from "express";
import {
    createEducation,
    deleteEducation,
    getAllEducation,
    getEducationById,
    updateEducation
} from "../controller/educationControl.js";

const educationRoute = express.Router();

educationRoute.get("/", getAllEducation);
educationRoute.get("/:id", getEducationById);
educationRoute.post("/", createEducation);
educationRoute.put("/:id", updateEducation);
educationRoute.delete("/:id", deleteEducation);

export default educationRoute;