const SubcategoryModel = require('../models/Subcategory');
const { NotFoundError } = require('../utils/appErrors');

const getAllSubcategories = async () => {
  const subcategories = await SubcategoryModel.find().lean();
  return subcategories;
};

const createSubcategory = async (subcategoryData) => {
  const newSubcategory = await SubcategoryModel.create(subcategoryData);
  return newSubcategory;

};

const deleteSubcategory = async (subcategoryId) => {
  const subcategory = await SubcategoryModel.findById(subcategoryId);
  if (!subcategory) {
    throw new NotFoundError('subcategory not found');
  }
  await productModel.deleteOne({ _id: productId });
  return product;
}
const getSubcategoryBySlug = async (slug) => {
  const subcategory = await SubcategoryModel.findOne({ slug }).populate('products');
  return subcategory;
};

const getSubcategoriesWithProductCount = async (categories) => {
  const response = await Promise.all(
    categories.map(async (category) => {
      const subcategories = await SubcategoryModel.find({ category });
      const subcategoryWithCounts = subcategories.map((subcategory) => ({
        name: subcategory.name,
        slug: subcategory.slug,
        description: subcategory.description,
        imageUrl: subcategory.imageUrl,
        productCount: subcategory.products.length,
      }));

      return {
        category,
        subcategories: subcategoryWithCounts,
      };
    }),
  );
  return response;
};

module.exports = {
  getAllSubcategories,
  createSubcategory,
  deleteSubcategory,
  getSubcategoryBySlug,
  getSubcategoriesWithProductCount,
};
