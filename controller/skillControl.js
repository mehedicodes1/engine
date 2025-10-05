import { SkillModel } from "../config/database.js";

// Create Skill
export async function createSkill(req, res) {
    const { name, category, icon, level } = req.body;

    if (!name || !category) {
        return res.status(400).json({ message: 'Name and category are required' });
    }

    try {
        const newSkill = await SkillModel.create({ name, category, icon, level });
        return res.status(201).json({ message: 'Skill created successfully', skill: newSkill });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Get All Skills
export async function getAllSkills(req, res) {
    try {
        const skills = await SkillModel.findAll({
            order: [['category', 'ASC'], ['name', 'ASC']]
        });
        if (skills.length === 0) return res.status(404).json({ message: 'No skills found' });
        return res.status(200).json({ skills });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Get Skills By Category
export async function getSkillsByCategory(req, res) {
    const category = req.params.category;
    try {
        const skills = await SkillModel.findAll({ 
            where: { category },
            order: [['level', 'DESC']]
        });
        return res.status(200).json({ skills });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Get Skill By ID
export async function getSkillById(req, res) {
    const id = req.params.id;
    try {
        const skill = await SkillModel.findByPk(id);
        if (!skill) return res.status(404).json({ message: 'Skill not found' });
        return res.status(200).json({ skill });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Update Skill
export async function updateSkill(req, res) {
    try {
        const id = req.params.id;
        const [updatedRows] = await SkillModel.update(req.body, { where: { id } });
        if (updatedRows === 0) return res.status(404).json({ message: 'Skill not found' });
        return res.status(200).json({ message: 'Skill updated successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Delete Skill
export async function deleteSkill(req, res) {
    try {
        const id = req.params.id;
        const deletedRows = await SkillModel.destroy({ where: { id } });
        if (deletedRows === 0) return res.status(404).json({ message: 'Skill not found' });
        return res.status(200).json({ message: 'Skill deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}