import express from "express";
import {
    createSocialLink,
    deleteSocialLink,
    getAllSocialLinks,
    getSocialLinkById,
    updateSocialLink
} from "../controller/socialLinkControl.js";

const socialLinkRoute = express.Router();

socialLinkRoute.get("/api/social-links", getAllSocialLinks);
socialLinkRoute.get("/api/social-links/:id", getSocialLinkById);
socialLinkRoute.post("/api/social-links", createSocialLink);
socialLinkRoute.put("/api/social-links/:id", updateSocialLink);
socialLinkRoute.delete("/api/social-links/:id", deleteSocialLink);

export default socialLinkRoute;