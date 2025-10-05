import { DataTypes } from "sequelize";

export const resumeModel = (sequelize) => {
  const Resume = sequelize.define("Resume", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fileUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isCurrent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    tableName: "resumes",
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  });

  return Resume;
};