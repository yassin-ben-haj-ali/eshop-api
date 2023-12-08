const express = require('express');
const productControllers = require('../controllers/productController');
const catchMiddleware = require('../middlewares/api')
const router = express.Router();
const { authenticate } = require('../middlewares/auth');
const singleUpload = require('../middlewares/fileUpload');

router.get('/', catchMiddleware(productControllers.getProducts));
router.get('/:productId', catchMiddleware(productControllers.getProduct));

router.use(authenticate);

router.post('/', singleUpload('/uploads/private/products/photo', 'photo'), catchMiddleware(productControllers.createProduct));
router.delete('/:productId', catchMiddleware(productControllers.deleteProduct));




module.exports = router;