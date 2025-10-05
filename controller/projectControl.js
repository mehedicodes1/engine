import { ProjectModel } from "../config/database.js";

// Create Project
export async function createProject(req, res) {
    const { title, slug, description, image, multi_picture, technologies, platforms, category, status, url, githubUrl, featured } = req.body;

    if (!title || !slug || !description || !category || !status) {
        return res.status(400).json({ message: 'Title, slug, description, category, and status are required' });
    }

    try {
        const newProject = await ProjectModel.create({
            title, slug, description, image, multi_picture, technologies, platforms, 
            category, status, url, githubUrl, featured
        });
        return res.status(201).json({ message: 'Project created successfully', project: newProject });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Get All Projects
export async function getAllProjects(req, res) {
    try {
        const projects = await ProjectModel.findAll({
            order: [['createdAt', 'DESC']]
        });
        if (projects.length === 0) return res.status(404).json({ message: 'No projects found' });
        return res.status(200).json({ projects });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Get Project By ID
export async function getProjectById(req, res) {
    const id = req.params.id;
    try {
        const project = await ProjectModel.findByPk(id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        return res.status(200).json({ project });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Get Project By Slug
export async function getProjectBySlug(req, res) {
    const slug = req.params.slug;
    try {
        const project = await ProjectModel.findOne({ where: { slug } });
        if (!project) return res.status(404).json({ message: 'Project not found' });
        return res.status(200).json({ project });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Get Featured Projects
export async function getFeaturedProjects(req, res) {
    try {
        const projects = await ProjectModel.findAll({ 
            where: { featured: true },
            order: [['createdAt', 'DESC']]
        });
        return res.status(200).json({ projects });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Update Project
export async function updateProject(req, res) {
    try {
        const id = req.params.id;
        const [updatedRows] = await ProjectModel.update(req.body, { where: { id } });
        if (updatedRows === 0) return res.status(404).json({ message: 'Project not found' });
        return res.status(200).json({ message: 'Project updated successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Delete Project
export async function deleteProject(req, res) {
    try {
        const id = req.params.id;
        const deletedRows = await ProjectModel.destroy({ where: { id } });
        if (deletedRows === 0) return res.status(404).json({ message: 'Project not found' });
        return res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}