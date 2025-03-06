const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const router = express.Router();

// Helper functions for user management
async function getUsers() {
  try {
    const data = await fs.readFile('users.json', 'utf8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      // If file doesn't exist, create an empty array
      await fs.writeFile('users.json', '[]');
      return [];
    }
    throw err;
  }
}

async function saveUsers(users) {
  await fs.writeFile('users.json', JSON.stringify(users, null, 2));
}

// Login page route
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/login.html'));
});

// Login handler
router.post('/login', async (req, res) => {
  try {
    console.log('Login attempt:', req.body);
    const { email, password } = req.body;
    
    // Simple validation
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }
    
    // Get users
    const users = await getUsers();
    
    // Find user
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      res.status(200).json({ success: true, redirect: '/dashboard' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Register handler
router.post('/register', async (req, res) => {
  try {
    console.log('Register attempt:', req.body);
    const { email, password } = req.body;
    
    // Simple validation
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }
    
    // Get users
    const users = await getUsers();
    
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
    await saveUsers(users);
    
    res.status(201).json({ success: true, message: 'Registration successful', redirect: '/auth/login' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;