import express from "express";
import {
    createCategory,
    deleteCategory,
    getAllCategories,
    getCategoryById,
    updateCategory
} from "../controller/categoryControl.js";

const categoryRoute = express.Router();

categoryRoute.get("/", getAllCategories);
categoryRoute.get("/:id", getCategoryById);
categoryRoute.post("/", createCategory);
categoryRoute.put("/:id", updateCategory);
categoryRoute.delete("/:id", deleteCategory);

export default categoryRoute;