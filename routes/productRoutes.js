const express = require('express');
const productControllers = require('../controllers/productController');
const catchMiddleware = require('../middlewares/api')
const router = express.Router();
const { authenticate } = require('../middlewares/auth');

router.get('/', catchMiddleware(productControllers.getProducts));
router.get('/:productId', catchMiddleware(productControllers.getProduct));

router.use(authenticate);

router.post('/', catchMiddleware(productControllers.createProduct));
router.delete('/:productId', catchMiddleware(productControllers.deleteProduct));




module.exports = router;