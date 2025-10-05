import express from "express";
import {
    createOrUpdateSetting,
    deleteSetting,
    getAllSettings,
    getSettingByKey,
    updateSetting
} from "../controller/settingControl.js";

const settingRoute = express.Router();

settingRoute.get("/", getAllSettings);
settingRoute.get("/:key", getSettingByKey);
settingRoute.post("/", createOrUpdateSetting);
settingRoute.put("/:key", updateSetting);
settingRoute.delete("/:key", deleteSetting);

export default settingRoute;