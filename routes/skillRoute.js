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

skillRoute.get("/", getAllSkills);
skillRoute.get("/category/:category", getSkillsByCategory);
skillRoute.get("/:id", getSkillById);
skillRoute.post("/", createSkill);
skillRoute.put("/:id", updateSkill);
skillRoute.delete("/:id", deleteSkill);

export default skillRoute;