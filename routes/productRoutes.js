const express = require('express');
const productControllers = require('../controllers/productController');
const catchMiddleware = require('../middlewares/api')
const router = express.Router();
const { authenticate } = require('../middlewares/auth');
const { singleUpload, multipleUpload } = require('../middlewares/fileUpload');
const { productValidate } = require('../middlewares/validate');

router.get('/', catchMiddleware(productControllers.getProducts));
router.get('/:productId', catchMiddleware(productControllers.getProduct));

router.use(authenticate);

router.post('/', multipleUpload('/uploads/public/products/gallery'),productValidate,catchMiddleware(productControllers.createProduct));
router.delete('/:productId', catchMiddleware(productControllers.deleteProduct));




module.exports = router;