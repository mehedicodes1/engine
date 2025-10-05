import express from "express";
import {
    createSkill,
    deleteSkill,
    getAllSkills,
    getSkillById,
    getSkillsByCategory,
    updateSkill
} from "../controller/skillControl.js";

const skillRoute = express.Router();

skillRoute.get("/api/skills", getAllSkills);
skillRoute.get("/api/skills/category/:category", getSkillsByCategory);
skillRoute.get("/api/skills/:id", getSkillById);
skillRoute.post("/api/skills", createSkill);
skillRoute.put("/api/skills/:id", updateSkill);
skillRoute.delete("/api/skills/:id", deleteSkill);

export default skillRoute;