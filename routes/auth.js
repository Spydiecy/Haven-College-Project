const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const router = express.Router();

// Login page
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/login.html'));
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Read users from JSON file
    const usersData = await fs.readFile('users.json', 'utf8');
    const users = JSON.parse(usersData);
    
    // Find user by email and check password
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      res.status(200).json({ success: true, redirect: '/dashboard' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Register route
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Read users from JSON file
    let users = [];
    try {
      const usersData = await fs.readFile('users.json', 'utf8');
      users = JSON.parse(usersData);
    } catch (err) {
      // If file doesn't exist, create an empty array
      if (err.code === 'ENOENT') {
        users = [];
      } else {
        throw err;
      }
    }
    
    // Check if email exists
    if (users.some(user => user.email === email)) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }
    
    // Add new user
    users.push({
      email,
      password,
      createdAt: new Date().toISOString()
    });
    
    // Save users
    await fs.writeFile('users.json', JSON.stringify(users, null, 2));
    
    res.status(201).json({ success: true, message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;