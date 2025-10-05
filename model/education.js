import { DataTypes } from "sequelize";

export const educationModel = (sequelize) => {
  const Education = sequelize.define("Education", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    institution: {
      type: DataTypes.STRING,
      allowNull: false
    },
    degree: {
      type: DataTypes.STRING,
      allowNull: false
    },
    field: {
      type: DataTypes.STRING,
      allowNull: false
    },
    startYear: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    endYear: {
      type: DataTypes.INTEGER
    },
    description: {
      type: DataTypes.STRING
    },
    GPA: {
      type: DataTypes.FLOAT
    }
  }, {
    tableName: "education",
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  });

  return Education;
};