import { ContactModel } from "../config/database.js";

// Create Contact
export async function createContact(req, res) {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newContact = await ContactModel.create({ name, email, subject, message });
        return res.status(201).json({ message: 'Contact message sent successfully', contact: newContact });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Get All Contacts
export async function getAllContacts(req, res) {
    try {
        const contacts = await ContactModel.findAll({
            order: [['createdAt', 'DESC']]
        });
        if (contacts.length === 0) return res.status(404).json({ message: 'No contacts found' });
        return res.status(200).json({ contacts });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Get Contact By ID
export async function getContactById(req, res) {
    const id = req.params.id;
    try {
        const contact = await ContactModel.findByPk(id);
        if (!contact) return res.status(404).json({ message: 'Contact not found' });
        return res.status(200).json({ contact });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Delete Contact
export async function deleteContact(req, res) {
    try {
        const id = req.params.id;
        const deletedRows = await ContactModel.destroy({ where: { id } });
        if (deletedRows === 0) return res.status(404).json({ message: 'Contact not found' });
        return res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}