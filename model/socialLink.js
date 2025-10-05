import { DataTypes } from "sequelize";

export const socialLinkModel = (sequelize) => {
  const SocialLink = sequelize.define("SocialLink", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    platform: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    icon: {
      type: DataTypes.STRING
    }
  }, {
    tableName: "social_links",
    timestamps: false // Social links typically don't need timestamps
  });

  return SocialLink;
};