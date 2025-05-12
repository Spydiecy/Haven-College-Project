const express = require('express');
const router = express.Router();

// Wellness page
router.get('/', (req, res) => {
  // Expert data
  const experts = [
    { name: 'Dr. Amara Silva', title: 'Integrative Medicine', bio: 'Board-certified in both Western medicine and Ayurvedic healing traditions, Dr. Silva oversees our comprehensive wellness assessments and personalized treatment protocols.', image: '/images/team/arjit.jpg' },
    { name: 'Master Kai Zhang', title: 'Movement & Meditation', bio: 'With over 30 years of practice in Tai Chi, Qigong, and meditation, Master Zhang guides our guests in mindful movement and cultivating present awareness.', image: '/images/team/tanishq.jpg' },
    { name: 'Elena Vasquez', title: 'Nutritional Sciences', bio: 'A pioneer in functional nutrition, Elena creates personalized nutritional plans that support optimal cellular health, energy balance, and intuitive eating practices.', image: '/images/team/jolly.jpg' },
    { name: 'Dr. James Okonjo', title: 'Therapeutic Psychology', bio: 'Specializing in mind-body connection and emotional release techniques, Dr. Okonjo facilitates profound personal transformation and emotional healing.', image: '/images/team/krishna.jpg' }
  ];

  // Testimonials data
  const testimonials = [
    { text: 'My experience at Haven completely transformed my approach to wellbeing. The personalized program addressed not just my physical health but helped me resolve emotional patterns I\'d carried for decades. Six months later, I\'m still implementing the practices I learned.', author: 'Sarah J.', location: 'Executive, New York' },
    { text: 'After years of chronic stress and burnout, the wellness program at Haven gave me practical tools to reclaim balance in my life. The integration of cutting-edge science with ancient wisdom practices created a powerful healing experience.', author: 'Michael T.', location: 'Entrepreneur, London' },
    { text: 'The mindfulness retreats at Haven have become an essential part of my yearly wellness routine. Each visit deepens my practice and provides clarity and purpose that sustains me through life\'s challenges.', author: 'Priya M.', location: 'Artist, Mumbai' }
  ];

  res.render('wellness', {
    title: 'Wellness',
    experts: experts,
    testimonials: testimonials
  });
});

module.exports = router;