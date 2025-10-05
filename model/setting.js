import { DataTypes } from "sequelize";

export const settingModel = (sequelize) => {
  const Setting = sequelize.define("Setting", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    key: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: "settings",
    timestamps: false // Settings typically don't need timestamps
  });

  return Setting;
};