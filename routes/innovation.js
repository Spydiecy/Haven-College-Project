const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('innovation', { title: 'Innovation' });
    }
);

module.exports = router;