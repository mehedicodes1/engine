import express from "express";
import {
    createContact,
    deleteContact,
    getAllContacts,
    getContactById
} from "../controller/contactControl.js";

const contactRoute = express.Router();

contactRoute.get("/", getAllContacts);
contactRoute.get("/:id", getContactById);
contactRoute.post("/", createContact);
contactRoute.delete("/:id", deleteContact);

export default contactRoute;