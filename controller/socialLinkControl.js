import { SocialLinkModel } from "../config/database.js";

// Create Social Link
export async function createSocialLink(req, res) {
    const { platform, url, icon } = req.body;

    if (!platform || !url) {
        return res.status(400).json({ message: 'Platform and URL are required' });
    }

    try {
        const newSocialLink = await SocialLinkModel.create({ platform, url, icon });
        return res.status(201).json({ message: 'Social link created successfully', socialLink: newSocialLink });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Get All Social Links
export async function getAllSocialLinks(req, res) {
    try {
        const socialLinks = await SocialLinkModel.findAll({
            order: [['platform', 'ASC']]
        });
        if (socialLinks.length === 0) return res.status(404).json({ message: 'No social links found' });
        return res.status(200).json({ socialLinks });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Get Social Link By ID
export async function getSocialLinkById(req, res) {
    const id = req.params.id;
    try {
        const socialLink = await SocialLinkModel.findByPk(id);
        if (!socialLink) return res.status(404).json({ message: 'Social link not found' });
        return res.status(200).json({ socialLink });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Update Social Link
export async function updateSocialLink(req, res) {
    try {
        const id = req.params.id;
        const [updatedRows] = await SocialLinkModel.update(req.body, { where: { id } });
        if (updatedRows === 0) return res.status(404).json({ message: 'Social link not found' });
        return res.status(200).json({ message: 'Social link updated successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Delete Social Link
export async function deleteSocialLink(req, res) {
    try {
        const id = req.params.id;
        const deletedRows = await SocialLinkModel.destroy({ where: { id } });
        if (deletedRows === 0) return res.status(404).json({ message: 'Social link not found' });
        return res.status(200).json({ message: 'Social link deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}