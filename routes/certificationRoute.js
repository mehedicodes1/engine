import express from "express";
import {
    createCertification,
    deleteCertification,
    getAllCertifications,
    getCertificationById,
    updateCertification
} from "../controller/certificationControl.js";

const certificationRoute = express.Router();

certificationRoute.get("/", getAllCertifications);
certificationRoute.get("/:id", getCertificationById);
certificationRoute.post("/", createCertification);
certificationRoute.put("/:id", updateCertification);
certificationRoute.delete("/:id", deleteCertification);

export default certificationRoute;