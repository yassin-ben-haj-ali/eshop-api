const { CATEGORY_TYPE } = require('../enums');
const SubcategoryService = require('../services/subcategoryServices');

const getAllSubcategories = async (req, res) => {
    const subcategories = await SubcategoryService.getAllSubcategories();
    return res.status(200).json(subcategories);
};

const createSubcategory = async (req, res) => {
    const { name, description, imageUrl, category, slug } = req.body;

    const newSubcategory = await SubcategoryService.createSubcategory({
        name,
        description,
        imageUrl,
        category,
        slug,
    });
    return res.status(201).json(newSubcategory);
};

const deleteSubcategory = async (req, res) => {
    const subcategoryId = req.params.id;
    const subcategory = await SubcategoryService.deleteSubcategory(subcategoryId);
    return res.status(200).json(subcategory);
};

const getProductsBySubcategorySlug = async (req, res) => {
    const { slug } = req.params;

    const subcategory = await SubcategoryService.getSubcategoryBySlug(slug);
    const response = {
        name: subcategory.name,
        slug: subcategory.slug,
        description: subcategory.description,
        imageUrl: subcategory.imageUrl,
        products: subcategory.products,
    };
    return res.status(200).json(response);
};

const getAllSubcategoriesWithProductCount = async (req, res) => {
    const categories = [CATEGORY_TYPE.DESIGN, CATEGORY_TYPE.MARKETING_DIGITAL, CATEGORY_TYPE.DEVELOPMENT];
    const response = await SubcategoryService.getSubcategoriesWithProductCount(categories);
    return res.status(200).json(response);
};

module.exports = {
    getAllSubcategories,
    createSubcategory,
    deleteSubcategory,
    getAllSubcategoriesWithProductCount,
    getProductsBySubcategorySlug,
};
