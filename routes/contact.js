const express = require('express');
const router = express.Router();

// Contact page
router.get('/', (req, res) => {
  res.render('contact', {
    title: 'Contact Us'
  });
});

// Handle contact form submissions (for future implementation)
router.post('/submit', (req, res) => {
  // This would process form data and send emails in a real application
  const { name, email, subject, message } = req.body;
  
  // For now, just log the submission
  console.log('Contact form submission:', { name, email, subject, message });
  
  // Send a success response
  res.status(200).json({ 
    success: true, 
    message: 'Thank you for your message. We will get back to you soon!' 
  });
});

module.exports = router;