const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('nature', { title: 'Nature' });
    }
);

module.exports = router;