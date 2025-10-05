import express from "express";
import {
    createCategory,
    deleteCategory,
    getAllCategories,
    getCategoryById,
    updateCategory
} from "../controller/categoryControl.js";

const categoryRoute = express.Router();

categoryRoute.get("/api/categories", getAllCategories);
categoryRoute.get("/api/categories/:id", getCategoryById);
categoryRoute.post("/api/categories", createCategory);
categoryRoute.put("/api/categories/:id", updateCategory);
categoryRoute.delete("/api/categories/:id", deleteCategory);

export default categoryRoute;