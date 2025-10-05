import express from "express";
import {
    createCertification,
    deleteCertification,
    getAllCertifications,
    getCertificationById,
    updateCertification
} from "../controller/certificationControl.js";

const certificationRoute = express.Router();

certificationRoute.get("/api/certifications", getAllCertifications);
certificationRoute.get("/api/certifications/:id", getCertificationById);
certificationRoute.post("/api/certifications", createCertification);
certificationRoute.put("/api/certifications/:id", updateCertification);
certificationRoute.delete("/api/certifications/:id", deleteCertification);

export default certificationRoute;