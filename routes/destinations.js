const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const Booking = require('../models/Booking');

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

// Handle booking submission
router.post('/book', protect, async (req, res) => {
  try {
    const {
      destination,
      checkIn,
      checkOut,
      adults,
      children,
      roomType,
      paymentMethod,
      totalPrice
    } = req.body;

    // Create new booking
    const booking = await Booking.create({
      user: req.user._id,
      destination,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      guests: {
        adults: parseInt(adults),
        children: parseInt(children)
      },
      roomType,
      totalPrice: parseInt(totalPrice),
      paymentMethod,
      status: 'confirmed'
    });

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking
    });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing booking'
    });
  }
});

module.exports = router;