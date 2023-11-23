const productModel = require('../models/Product');
const { NotFoundError } = require('../utils/appErrors');


const createProduct = async (body) => {
    const product = new productModel(body);
    await product.save();
    return product;
}


const getProducts = async () => {
    const products = productModel.find();
    return products
}

const getProduct = async (productId) => {
    const product = await productModel.findById(productId);
    if (!product) throw new NotFoundError('product not found');
    return product;
}


const deleteProduct = async (productId) => {
    const product = await productModel.findById(productId)
    if (!product) {
        throw new NotFoundError('product not found');
    }
    await productModel.deleteOne({ _id: productId });
    return product;
}


module.exports = {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct
}