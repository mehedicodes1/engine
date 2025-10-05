import { CategoryModel } from "../config/database.js";

// Create Category
export async function createCategory(req, res) {
    const { name, description } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Category name is required' });
    }

    try {
        const newCategory = await CategoryModel.create({ name, description });
        return res.status(201).json({ message: 'Category created successfully', category: newCategory });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Get All Categories
export async function getAllCategories(req, res) {
    try {
        const categories = await CategoryModel.findAll({
            order: [['name', 'ASC']]
        });
        if (categories.length === 0) return res.status(404).json({ message: 'No categories found' });
        return res.status(200).json({ categories });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Get Category By ID
export async function getCategoryById(req, res) {
    const id = req.params.id;
    try {
        const category = await CategoryModel.findByPk(id);
        if (!category) return res.status(404).json({ message: 'Category not found' });
        return res.status(200).json({ category });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Update Category
export async function updateCategory(req, res) {
    try {
        const id = req.params.id;
        const [updatedRows] = await CategoryModel.update(req.body, { where: { id } });
        if (updatedRows === 0) return res.status(404).json({ message: 'Category not found' });
        return res.status(200).json({ message: 'Category updated successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Delete Category
export async function deleteCategory(req, res) {
    try {
        const id = req.params.id;
        const deletedRows = await CategoryModel.destroy({ where: { id } });
        if (deletedRows === 0) return res.status(404).json({ message: 'Category not found' });
        return res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}