const express = require('express');
const authControllers = require('../controllers/authControllers');
const catchMiddleware = require('../middlewares/api')
const router = express.Router();

router.get('/', (req, res) => {
    res.send('respond with a resource');
});

router.post('/register', catchMiddleware(authControllers.register));
router.post('/login', catchMiddleware(authControllers.login));



module.exports = router;