import { CertificationModel } from "../config/database.js";

// Create Certification
export async function createCertification(req, res) {
    const { title, institution, year, description, url } = req.body;

    if (!title || !institution || !year) {
        return res.status(400).json({ message: 'Title, institution, and year are required' });
    }

    try {
        const newCertification = await CertificationModel.create({
            title, institution, year, description, url
        });
        return res.status(201).json({ message: 'Certification created successfully', certification: newCertification });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Get All Certifications
export async function getAllCertifications(req, res) {
    try {
        const certifications = await CertificationModel.findAll({
            order: [['year', 'DESC']]
        });
        if (certifications.length === 0) return res.status(404).json({ message: 'No certifications found' });
        return res.status(200).json({ certifications });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Get Certification By ID
export async function getCertificationById(req, res) {
    const id = req.params.id;
    try {
        const certification = await CertificationModel.findByPk(id);
        if (!certification) return res.status(404).json({ message: 'Certification not found' });
        return res.status(200).json({ certification });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Update Certification
export async function updateCertification(req, res) {
    try {
        const id = req.params.id;
        const [updatedRows] = await CertificationModel.update(req.body, { where: { id } });
        if (updatedRows === 0) return res.status(404).json({ message: 'Certification not found' });
        return res.status(200).json({ message: 'Certification updated successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Delete Certification
export async function deleteCertification(req, res) {
    try {
        const id = req.params.id;
        const deletedRows = await CertificationModel.destroy({ where: { id } });
        if (deletedRows === 0) return res.status(404).json({ message: 'Certification not found' });
        return res.status(200).json({ message: 'Certification deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}