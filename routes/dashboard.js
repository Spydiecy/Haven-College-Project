const express = require('express');
const router = express.Router();

// Dashboard page
router.get('/', (req, res) => {
  const departments = [
    {
      name: 'Accommodations',
      subdepartments: ['Luxury Suites', 'Executive Rooms', 'Presidential Villas', 'Ocean View Rooms']
    },
    {
      name: 'Wellness Center',
      subdepartments: ['Spa Services', 'Yoga Studio', 'Fitness Center', 'Meditation Spaces']
    },
    {
      name: 'Dining',
      subdepartments: ['Fine Dining Restaurant', 'Casual Bistro', 'Rooftop Bar', 'Private Dining']
    },
    {
      name: 'Events & Meetings',
      subdepartments: ['Conference Rooms', 'Wedding Venues', 'Banquet Halls', 'Business Center']
    },
    {
      name: 'Recreation',
      subdepartments: ['Swimming Pools', 'Beach Access', 'Tennis Courts', 'Golf Course']
    },
    {
      name: 'Guest Services',
      subdepartments: ['Concierge', 'Transportation', 'Housekeeping', '24/7 Room Service']
    }
  ];

  const stats = [
    { number: '5', label: 'Luxury Locations' },
    { number: '150+', label: 'Staff Members' },
    { number: '1000+', label: 'Happy Guests' },
    { number: '95%', label: 'Satisfaction Rate' }
  ];

  res.render('dashboard', {
    title: 'Dashboard',
    departments: departments,
    stats: stats
  });
});

module.exports = router;