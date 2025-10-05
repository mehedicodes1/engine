import { ExperienceModel } from "../config/database.js";

// Create Experience
export async function createExperience(req, res) {
    const { company, position, startDate, endDate, description } = req.body;

    if (!company || !position || !startDate) {
        return res.status(400).json({ message: 'Company, position, and start date are required' });
    }

    try {
        const newExperience = await ExperienceModel.create({
            company, position, startDate, endDate, description
        });
        return res.status(201).json({ message: 'Experience record created successfully', experience: newExperience });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Get All Experiences
export async function getAllExperiences(req, res) {
    try {
        const experiences = await ExperienceModel.findAll({
            order: [['startDate', 'DESC']]
        });
        if (experiences.length === 0) return res.status(404).json({ message: 'No experience records found' });
        return res.status(200).json({ experiences });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Get Experience By ID
export async function getExperienceById(req, res) {
    const id = req.params.id;
    try {
        const experience = await ExperienceModel.findByPk(id);
        if (!experience) return res.status(404).json({ message: 'Experience record not found' });
        return res.status(200).json({ experience });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Update Experience
export async function updateExperience(req, res) {
    try {
        const id = req.params.id;
        const [updatedRows] = await ExperienceModel.update(req.body, { where: { id } });
        if (updatedRows === 0) return res.status(404).json({ message: 'Experience record not found' });
        return res.status(200).json({ message: 'Experience record updated successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Delete Experience
export async function deleteExperience(req, res) {
    try {
        const id = req.params.id;
        const deletedRows = await ExperienceModel.destroy({ where: { id } });
        if (deletedRows === 0) return res.status(404).json({ message: 'Experience record not found' });
        return res.status(200).json({ message: 'Experience record deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}