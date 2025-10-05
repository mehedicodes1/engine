import { DataTypes } from "sequelize";

export const skillModel = (sequelize) => {
  const Skill = sequelize.define("Skill", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    icon: {
      type: DataTypes.STRING
    },
    level: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 100
      }
    }
  }, {
    tableName: "skills",
    timestamps: false // Skills typically don't need timestamps
  });

  return Skill;
};