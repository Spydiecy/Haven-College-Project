const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('new_development', { title: 'new_development' });
    }
);

module.exports = router;