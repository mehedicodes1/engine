import { DataTypes } from "sequelize";

export const blogModel = (sequelize) => {
  const Blog = sequelize.define("Blog", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    excerpt: {
      type: DataTypes.STRING
    },
    content: {
      type: DataTypes.TEXT
    },
    image: {
      type: DataTypes.STRING
    },
    category: {
      type: DataTypes.STRING
    },
    tags: {
      type: DataTypes.STRING // Store as "tag1,tag2,tag3"
    },
    metaTitle: {
      type: DataTypes.STRING
    },
    metaDescription: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "draft"
    },
    publishedAt: {
      type: DataTypes.DATE
    },
    viewCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    tableName: "blogs",
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  });

  return Blog;
};