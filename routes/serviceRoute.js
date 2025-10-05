import express from "express";
import {
    createService,
    deleteService,
    getAllServices,
    getServiceById,
    updateService
} from "../controller/serviceControl.js";

const serviceRoute = express.Router();

serviceRoute.get("/", getAllServices);
serviceRoute.get("/:id", getServiceById);
serviceRoute.post("/", createService);
serviceRoute.put("/:id", updateService);
serviceRoute.delete("/:id", deleteService);

export default serviceRoute;