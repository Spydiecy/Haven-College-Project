const express = require('express');
const router = express.Router();

// Destinations page
router.get('/', (req, res) => {
  const destinations = [
    {
      id: 'bali',
      name: 'Bali Retreat',
      description: 'An oceanfront sanctuary nestled in the heart of Bali\'s spiritual center.',
      image: 'https://i.imgur.com/yrBr9sk.jpeg'
    },
    {
      id: 'swiss-alps',
      name: 'Swiss Alps Lodge',
      description: 'A mountain hideaway offering year-round wellness experiences.',
      image: 'https://i.imgur.com/WUIeXnO.jpeg'
    },
    {
      id: 'maldives',
      name: 'Maldives Haven',
      description: 'Overwater villas with direct access to pristine coral reefs.',
      image: 'https://i.imgur.com/FxmFR4f.jpeg'
    }
  ];

  res.render('destinations', {
    title: 'Destinations',
    destinations: destinations
  });
});

// Route with parameters: specific destination
router.get('/:id', (req, res) => {
  const destinationId = req.params.id;
  
  // For now, just log the ID and send a generic response
  console.log(`Requested destination: ${destinationId}`);
  
  // In a real app, you would fetch the destination from a database
  // and render a template with the data
  res.send(`<h1>Destination: ${destinationId}</h1><p>This page is under construction</p>`);
});

module.exports = router;