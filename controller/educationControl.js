import { EducationModel } from "../config/database.js";

// Create Education
export async function createEducation(req, res) {
    const { institution, degree, field, startYear, endYear, description, GPA } = req.body;

    if (!institution || !degree || !field || !startYear) {
        return res.status(400).json({ message: 'Institution, degree, field, and start year are required' });
    }

    try {
        const newEducation = await EducationModel.create({
            institution, degree, field, startYear, endYear, description, GPA
        });
        return res.status(201).json({ message: 'Education record created successfully', education: newEducation });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Get All Education
export async function getAllEducation(req, res) {
    try {
        const education = await EducationModel.findAll({
            order: [['startYear', 'DESC']]
        });
        if (education.length === 0) return res.status(404).json({ message: 'No education records found' });
        return res.status(200).json({ education });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Get Education By ID
export async function getEducationById(req, res) {
    const id = req.params.id;
    try {
        const education = await EducationModel.findByPk(id);
        if (!education) return res.status(404).json({ message: 'Education record not found' });
        return res.status(200).json({ education });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Update Education
export async function updateEducation(req, res) {
    try {
        const id = req.params.id;
        const [updatedRows] = await EducationModel.update(req.body, { where: { id } });
        if (updatedRows === 0) return res.status(404).json({ message: 'Education record not found' });
        return res.status(200).json({ message: 'Education record updated successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Delete Education
export async function deleteEducation(req, res) {
    try {
        const id = req.params.id;
        const deletedRows = await EducationModel.destroy({ where: { id } });
        if (deletedRows === 0) return res.status(404).json({ message: 'Education record not found' });
        return res.status(200).json({ message: 'Education record deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}