import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// CORRECT: Use createTransport (not createTransporter)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async (to, subject, html, text = '') => {
  try {
    const mailOptions = {
      from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
      to,
      subject,
      text,
      html,
    };

    const result = await transporter.sendMail(mailOptions);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: error.message };
  }
};

// Email templates (keep the same as before)
export const emailTemplates = {
  welcome: (name) => ({
    subject: 'Welcome to Our Platform!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Welcome, ${name}!</h2>
        <p>Thank you for joining our platform. We're excited to have you on board!</p>
        <p>Start exploring our features and let us know if you need any help.</p>
        <br>
        <p>Best regards,<br>The Team</p>
      </div>
    `
  }),
  // ... other templates
};