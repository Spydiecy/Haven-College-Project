const express = require('express');
const path = require('path');
const router = express.Router();

// About page
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/about_us.html'));
});

// Team members data
router.get('/team', (req, res) => {
  // Team data
  const team = [
    { name: 'Tanishq Gupta', role: 'Wellness Director' },
    { name: 'Krishna Saxena', role: 'Innovation Lead' },
    { name: 'Ansh Jolly', role: 'Nature Integration Specialist' },
    { name: 'Arjit Pandey', role: 'Community Director' }
  ];
  
  res.status(200).json(team);
});

module.exports = router;