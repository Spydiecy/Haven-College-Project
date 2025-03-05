const express = require('express');
const path = require('path');
const router = express.Router();

// Destinations page
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/destinations.html'));
});

// Route with parameters: specific destination
router.get('/:id', (req, res) => {
  const destinationId = req.params.id;
  
  // For now, just log the ID and send a generic response
  console.log(`Requested destination: ${destinationId}`);
  
  // Send a response that includes the requested ID
  res.send(`<h1>Destination: ${destinationId}</h1><p>This page is under construction</p>`);
});

module.exports = router;