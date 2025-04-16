const express = require('express');
const router = express.Router();

// About page
router.get('/', (req, res) => {
  // Team data
  const team = [
    { name: 'Tanishq Gupta', role: 'Wellness Director', image: '/images/team/tanishq.jpg' },
    { name: 'Krishna Saxena', role: 'Innovation Lead', image: '/images/team/krishna.jpg' },
    { name: 'Ansh Jolly', role: 'Nature Integration Specialist', image: '/images/team/jolly.jpg' },
    { name: 'Arjit Pandey', role: 'Community Director', image: '/images/team/arjit.jpg' }
  ];

  // Destinations data
  const destinations = [
    { name: 'Aurelia', description: 'Urban wellness sanctuaries', image: 'https://i.imgur.com/jdiFTa9.jpeg' },
    { name: 'Elysian', description: 'Mountain retreat experiences', image: 'https://i.imgur.com/jdiFTa9.jpeg' },
    { name: 'Serenity', description: 'Coastal wellness escapes', image: 'https://i.imgur.com/jdiFTa9.jpeg' },
    { name: 'Terra Nova', description: 'Desert oasis retreats', image: 'https://i.imgur.com/jdiFTa9.jpeg' },
    { name: 'Celestia', description: 'Forest immersion resorts', image: 'https://i.imgur.com/jdiFTa9.jpeg' },
    { name: 'Elementis', description: 'Wellness retreat', image: 'https://i.imgur.com/jdiFTa9.jpeg' }
  ];

  res.render('about_us', {
    title: 'About Us',
    team: team,
    destinations: destinations
  });
});

// Team members data API endpoint
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