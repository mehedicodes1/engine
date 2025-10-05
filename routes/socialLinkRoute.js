import express from "express";
import {
    createSocialLink,
    deleteSocialLink,
    getAllSocialLinks,
    getSocialLinkById,
    updateSocialLink
} from "../controller/socialLinkControl.js";

const socialLinkRoute = express.Router();

socialLinkRoute.get("/", getAllSocialLinks);
socialLinkRoute.get("/:id", getSocialLinkById);
socialLinkRoute.post("/", createSocialLink);
socialLinkRoute.put("/:id", updateSocialLink);
socialLinkRoute.delete("/:id", deleteSocialLink);

export default socialLinkRoute;