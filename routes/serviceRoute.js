import express from "express";
import {
    createService,
    deleteService,
    getAllServices,
    getServiceById,
    updateService
} from "../controller/serviceControl.js";

const serviceRoute = express.Router();

serviceRoute.get("/api/services", getAllServices);
serviceRoute.get("/api/services/:id", getServiceById);
serviceRoute.post("/api/services", createService);
serviceRoute.put("/api/services/:id", updateService);
serviceRoute.delete("/api/services/:id", deleteService);

export default serviceRoute;