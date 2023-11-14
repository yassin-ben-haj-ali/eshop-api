const express = require('express');

const router = express.Router();

const authRoutes = require('./authRoutes');


router.get('/', (req, res) => {
    res.json('welcome to intone api');
});

router.use('/auth', authRoutes);


module.exports = router;