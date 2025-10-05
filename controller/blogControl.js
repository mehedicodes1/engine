import { BlogModel } from "../config/database.js";

// Create Blog
export async function createBlog(req, res) {
    const { title, slug, description, excerpt, content, image, category, tags, metaTitle, metaDescription, status, publishedAt } = req.body;

    if (!title || !slug || !description) {
        return res.status(400).json({ message: 'Title, slug, and description are required' });
    }

    try {
        const newBlog = await BlogModel.create({
            title, slug, description, excerpt, content, image, category, tags, 
            metaTitle, metaDescription, status, publishedAt
        });
        return res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Get All Blogs
export async function getAllBlogs(req, res) {
    try {
        const blogs = await BlogModel.findAll({
            order: [['createdAt', 'DESC']]
        });
        if (blogs.length === 0) return res.status(404).json({ message: 'No blogs found' });
        return res.status(200).json({ blogs });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Get Blog By ID
export async function getBlogById(req, res) {
    const id = req.params.id;
    try {
        const blog = await BlogModel.findByPk(id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        return res.status(200).json({ blog });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Get Blog By Slug
export async function getBlogBySlug(req, res) {
    const slug = req.params.slug;
    try {
        const blog = await BlogModel.findOne({ where: { slug } });
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        
        // Increment view count
        await blog.increment('viewCount');
        
        return res.status(200).json({ blog });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Update Blog
export async function updateBlog(req, res) {
    try {
        const id = req.params.id;
        const [updatedRows] = await BlogModel.update(req.body, { where: { id } });
        if (updatedRows === 0) return res.status(404).json({ message: 'Blog not found' });
        return res.status(200).json({ message: 'Blog updated successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Delete Blog
export async function deleteBlog(req, res) {
    try {
        const id = req.params.id;
        const deletedRows = await BlogModel.destroy({ where: { id } });
        if (deletedRows === 0) return res.status(404).json({ message: 'Blog not found' });
        return res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Get Published Blogs
export async function getPublishedBlogs(req, res) {
    try {
        const blogs = await BlogModel.findAll({
            where: { status: 'published' },
            order: [['publishedAt', 'DESC']]
        });
        return res.status(200).json({ blogs });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}