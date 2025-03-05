const express = require('express');
const path = require('path');
const router = express.Router();

// Dashboard page
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/dashboard.html'));
});

module.exports = router;