import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Import models (we'll create these next)
import { blogModel } from "../model/blog.js";
import { categoryModel } from "../model/category.js";
import { certificationModel } from "../model/certification.js";
import { contactModel } from "../model/contact.js";
import { educationModel } from "../model/education.js";
import { experienceModel } from "../model/experience.js";
import { projectModel } from "../model/project.js";
import { resumeModel } from "../model/resume.js";
import { serviceModel } from "../model/service.js";
import { settingModel } from "../model/setting.js";
import { skillModel } from "../model/skill.js";
import { socialLinkModel } from "../model/socialLink.js";
import { testimonialModel } from "../model/testimonial.js";
import { userModel } from "../model/user.js";

// ✅ Load .env variables
dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
    port: process.env.DATABASE_PORT || 3306,
    dialectOptions: {
      // Add any MySQL-specific options here
      decimalNumbers: true,
    },
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Model instances
let BlogModel = null;
let CategoryModel = null;
let CertificationModel = null;
let ContactModel = null;
let EducationModel = null;
let ExperienceModel = null;
let ProjectModel = null;
let ResumeModel = null;
let ServiceModel = null;
let SettingModel = null;
let SkillModel = null;
let SocialLinkModel = null;
let TestimonialModel = null;
let UserModel = null;

async function connect() {
  try {
    await sequelize.authenticate();
    console.log("MySQL database connected successfully.");

    // Initialize all models
    BlogModel = await blogModel(sequelize);
    CategoryModel = await categoryModel(sequelize);
    CertificationModel = await certificationModel(sequelize);
    ContactModel = await contactModel(sequelize);
    EducationModel = await educationModel(sequelize);
    ExperienceModel = await experienceModel(sequelize);
    ProjectModel = await projectModel(sequelize);
    ResumeModel = await resumeModel(sequelize);
    ServiceModel = await serviceModel(sequelize);
    SettingModel = await settingModel(sequelize);
    SkillModel = await skillModel(sequelize);
    SocialLinkModel = await socialLinkModel(sequelize);
    TestimonialModel = await testimonialModel(sequelize);
     UserModel = await userModel(sequelize);

    // Sync models
    await sequelize.sync({ alter: true }); // Use { force: true } only in development to reset DB
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  
  return {
    BlogModel,
    CategoryModel,
    CertificationModel,
    ContactModel,
    EducationModel,
    ExperienceModel,
    ProjectModel,
    ResumeModel,
    ServiceModel,
    SettingModel,
    SkillModel,
    SocialLinkModel,
    TestimonialModel,
    UserModel
  };
}

export {
  connect,
  sequelize,
  BlogModel,
  CategoryModel,
  CertificationModel,
  ContactModel,
  EducationModel,
  ExperienceModel,
  ProjectModel,
  ResumeModel,
  ServiceModel,
  SettingModel,
  SkillModel,
  SocialLinkModel,
  TestimonialModel,
  UserModel
};