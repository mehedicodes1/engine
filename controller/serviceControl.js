import { ServiceModel } from "../config/database.js";

// Create Service
export async function createService(req, res) {
    const { title, description, icon } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required' });
    }

    try {
        const newService = await ServiceModel.create({ title, description, icon });
        return res.status(201).json({ message: 'Service created successfully', service: newService });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Get All Services
export async function getAllServices(req, res) {
    try {
        const services = await ServiceModel.findAll({
            order: [['createdAt', 'ASC']]
        });
        if (services.length === 0) return res.status(404).json({ message: 'No services found' });
        return res.status(200).json({ services });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Get Service By ID
export async function getServiceById(req, res) {
    const id = req.params.id;
    try {
        const service = await ServiceModel.findByPk(id);
        if (!service) return res.status(404).json({ message: 'Service not found' });
        return res.status(200).json({ service });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Update Service
export async function updateService(req, res) {
    try {
        const id = req.params.id;
        const [updatedRows] = await ServiceModel.update(req.body, { where: { id } });
        if (updatedRows === 0) return res.status(404).json({ message: 'Service not found' });
        return res.status(200).json({ message: 'Service updated successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Delete Service
export async function deleteService(req, res) {
    try {
        const id = req.params.id;
        const deletedRows = await ServiceModel.destroy({ where: { id } });
        if (deletedRows === 0) return res.status(404).json({ message: 'Service not found' });
        return res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}