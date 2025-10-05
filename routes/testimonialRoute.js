import express from "express";
import {
    createTestimonial,
    deleteTestimonial,
    getAllTestimonials,
    getTestimonialById,
    updateTestimonial
} from "../controller/testimonialControl.js";

const testimonialRoute = express.Router();

testimonialRoute.get("/", getAllTestimonials);
testimonialRoute.get("/:id", getTestimonialById);
testimonialRoute.post("/", createTestimonial);
testimonialRoute.put("/:id", updateTestimonial);
testimonialRoute.delete("/:id", deleteTestimonial);

export default testimonialRoute;