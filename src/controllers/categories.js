import { getAllCategories } from "../models/categories.js";

const categoriesPage = async (req, res) => {
    const title = 'Categories'
    const categories = await getAllCategories();
    res.render('categories', { title, categories });
};

export { categoriesPage }