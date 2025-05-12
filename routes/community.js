const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('community', { title: 'Community' });
    }
);

module.exports = router;