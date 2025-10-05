import express from "express";
import {
    createOrUpdateSetting,
    deleteSetting,
    getAllSettings,
    getSettingByKey,
    updateSetting
} from "../controller/settingControl.js";

const settingRoute = express.Router();

settingRoute.get("/api/settings", getAllSettings);
settingRoute.get("/api/settings/:key", getSettingByKey);
settingRoute.post("/api/settings", createOrUpdateSetting);
settingRoute.put("/api/settings/:key", updateSetting);
settingRoute.delete("/api/settings/:key", deleteSetting);

export default settingRoute;