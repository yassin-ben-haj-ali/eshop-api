const productService = require('../services/productServices');
const createProduct = async (req, res) => {
    const product = await productService.createProduct({ ...req.body, userId: req.user.id, photo: req.files[0].path, gallery: req.files.map((photo) => ({ path: photo.path })) });
    return res.status(200).json(product);
};

const getProducts = async (req, res) => {
    const product = await productService.getProducts();
    return res.status(200).json(product);
};

const getProduct = async (req, res) => {
    const product = await productService.getProduct(req.params.productId);
    return res.status(200).json(product);
};

const deleteProduct = async (req, res) => {
    const product = await productService.deleteProduct(req.params.productId);
    return res.status(200).json(product);
};


module.exports = {
    createProduct,
    getProducts,
    deleteProduct,
    getProduct,
};