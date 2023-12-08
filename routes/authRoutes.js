const express = require('express');
const authControllers = require('../controllers/authControllers');
const catchMiddleware = require('../middlewares/api');
const { userValidate } = require('../middlewares/validate');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('respond with a resource');
});

router.post('/register', userValidate, catchMiddleware(authControllers.register));
router.post('/login', catchMiddleware(authControllers.login));
router.get('/verify-account', catchMiddleware(authControllers.verifyAccount));




module.exports = router;