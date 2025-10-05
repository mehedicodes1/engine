import express from "express";
import {
    createContact,
    deleteContact,
    getAllContacts,
    getContactById
} from "../controller/contactControl.js";

const contactRoute = express.Router();

contactRoute.get("/api/contacts", getAllContacts);
contactRoute.get("/api/contacts/:id", getContactById);
contactRoute.post("/api/contacts", createContact);
contactRoute.delete("/api/contacts/:id", deleteContact);

export default contactRoute;