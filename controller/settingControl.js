import { SettingModel } from "../config/database.js";

// Create or Update Setting
export async function createOrUpdateSetting(req, res) {
    const { key, value } = req.body;

    if (!key || value === undefined) {
        return res.status(400).json({ message: 'Key and value are required' });
    }

    try {
        const [setting, created] = await SettingModel.upsert({ key, value });
        const message = created ? 'Setting created successfully' : 'Setting updated successfully';
        return res.status(200).json({ message, setting });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Get All Settings
export async function getAllSettings(req, res) {
    try {
        const settings = await SettingModel.findAll({
            order: [['key', 'ASC']]
        });
        return res.status(200).json({ settings });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Get Setting By Key
export async function getSettingByKey(req, res) {
    const key = req.params.key;
    try {
        const setting = await SettingModel.findOne({ where: { key } });
        if (!setting) return res.status(404).json({ message: 'Setting not found' });
        return res.status(200).json({ setting });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Update Setting
export async function updateSetting(req, res) {
    try {
        const key = req.params.key;
        const [updatedRows] = await SettingModel.update({ value: req.body.value }, { where: { key } });
        if (updatedRows === 0) return res.status(404).json({ message: 'Setting not found' });
        return res.status(200).json({ message: 'Setting updated successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// Delete Setting
export async function deleteSetting(req, res) {
    try {
        const key = req.params.key;
        const deletedRows = await SettingModel.destroy({ where: { key } });
        if (deletedRows === 0) return res.status(404).json({ message: 'Setting not found' });
        return res.status(200).json({ message: 'Setting deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}