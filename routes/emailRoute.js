import express from 'express';
import { sendEmail, emailTemplates } from '../config/email.js';
import { authenticateToken } from '../middleware/auth.js';

const emailRoute = express.Router();

// Send custom email (protected)
emailRoute.post('/send', authenticateToken, async (req, res) => {
  try {
    const { to, subject, message } = req.body;
    
    const result = await sendEmail(to, subject, message);
    
    if (result.success) {
      res.json({ message: 'Email sent successfully' });
    } else {
      res.status(500).json({ message: 'Failed to send email', error: result.error });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Newsletter subscription
emailRoute.post('/subscribe', async (req, res) => {
  try {
    const { email, name } = req.body;
    
    // Send welcome email
    const template = emailTemplates.welcome(name || 'there');
    await sendEmail(email, template.subject, template.html);
    
    res.json({ message: 'Subscribed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Subscription failed', error: error.message });
  }
});

export default emailRoute;