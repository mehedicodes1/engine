import { ResumeModel } from "../config/database.js";

// Create Resume
export async function createResume(req, res) {
    const { title, fileUrl, isCurrent } = req.body;

    if (!title || !fileUrl) {
        return res.status(400).json({ message: 'Title and file URL are required' });
    }

    try {
        // If setting as current, unset current for all others
        if (isCurrent) {
            await ResumeModel.update({ isCurrent: false }, { where: {} });
        }

        const newResume = await ResumeModel.create({ title, fileUrl, isCurrent });
        return res.status(201).json({ message: 'Resume created successfully', resume: newResume });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Get All Resumes
export async function getAllResumes(req, res) {
    try {
        const resumes = await ResumeModel.findAll({
            order: [['createdAt', 'DESC']]
        });
        if (resumes.length === 0) return res.status(404).json({ message: 'No resumes found' });
        return res.status(200).json({ resumes });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Get Current Resume
export async function getCurrentResume(req, res) {
    try {
        const resume = await ResumeModel.findOne({ where: { isCurrent: true } });
        if (!resume) return res.status(404).json({ message: 'No current resume found' });
        return res.status(200).json({ resume });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Get Resume By ID
export async function getResumeById(req, res) {
    const id = req.params.id;
    try {
        const resume = await ResumeModel.findByPk(id);
        if (!resume) return res.status(404).json({ message: 'Resume not found' });
        return res.status(200).json({ resume });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Update Resume
export async function updateResume(req, res) {
    try {
        const id = req.params.id;
        
        // If setting as current, unset current for all others
        if (req.body.isCurrent) {
            await ResumeModel.update({ isCurrent: false }, { where: {} });
        }

        const [updatedRows] = await ResumeModel.update(req.body, { where: { id } });
        if (updatedRows === 0) return res.status(404).json({ message: 'Resume not found' });
        return res.status(200).json({ message: 'Resume updated successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Delete Resume
export async function deleteResume(req, res) {
    try {
        const id = req.params.id;
        const deletedRows = await ResumeModel.destroy({ where: { id } });
        if (deletedRows === 0) return res.status(404).json({ message: 'Resume not found' });
        return res.status(200).json({ message: 'Resume deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}