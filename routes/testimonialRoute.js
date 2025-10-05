import express from "express";
import {
    createTestimonial,
    deleteTestimonial,
    getAllTestimonials,
    getTestimonialById,
    updateTestimonial
} from "../controller/testimonialControl.js";

const testimonialRoute = express.Router();

testimonialRoute.get("/api/testimonials", getAllTestimonials);
testimonialRoute.get("/api/testimonials/:id", getTestimonialById);
testimonialRoute.post("/api/testimonials", createTestimonial);
testimonialRoute.put("/api/testimonials/:id", updateTestimonial);
testimonialRoute.delete("/api/testimonials/:id", deleteTestimonial);

export default testimonialRoute;