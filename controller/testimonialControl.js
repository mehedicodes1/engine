import { TestimonialModel } from "../config/database.js";

// Create Testimonial
export async function createTestimonial(req, res) {
    const { client, company, content, avatar, rating } = req.body;

    if (!client || !company || !content) {
        return res.status(400).json({ message: 'Client, company, and content are required' });
    }

    try {
        const newTestimonial = await TestimonialModel.create({
            client, company, content, avatar, rating
        });
        return res.status(201).json({ message: 'Testimonial created successfully', testimonial: newTestimonial });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Get All Testimonials
export async function getAllTestimonials(req, res) {
    try {
        const testimonials = await TestimonialModel.findAll({
            order: [['createdAt', 'DESC']]
        });
        if (testimonials.length === 0) return res.status(404).json({ message: 'No testimonials found' });
        return res.status(200).json({ testimonials });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Get Testimonial By ID
export async function getTestimonialById(req, res) {
    const id = req.params.id;
    try {
        const testimonial = await TestimonialModel.findByPk(id);
        if (!testimonial) return res.status(404).json({ message: 'Testimonial not found' });
        return res.status(200).json({ testimonial });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Update Testimonial
export async function updateTestimonial(req, res) {
    try {
        const id = req.params.id;
        const [updatedRows] = await TestimonialModel.update(req.body, { where: { id } });
        if (updatedRows === 0) return res.status(404).json({ message: 'Testimonial not found' });
        return res.status(200).json({ message: 'Testimonial updated successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Delete Testimonial
export async function deleteTestimonial(req, res) {
    try {
        const id = req.params.id;
        const deletedRows = await TestimonialModel.destroy({ where: { id } });
        if (deletedRows === 0) return res.status(404).json({ message: 'Testimonial not found' });
        return res.status(200).json({ message: 'Testimonial deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}