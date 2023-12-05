const express = require('express');
const router = express.Router();
const { getAllSubcategoriesWithProductCount, getProductsBySubcategorySlug } = require('../controllers/subcategoryController');
const catchMiddleware = require('../middlewares/api');


// Route for getting products by subcategory slug
router.get('/:slug', catchMiddleware(getProductsBySubcategorySlug));

// Route for getting all subcategories with product counts by category
router.get('/', catchMiddleware(getAllSubcategoriesWithProductCount));

module.exports = router;
