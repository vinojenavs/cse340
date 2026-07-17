import { getAllCategories, getCategoryById, getProjectByCategoryId } from "../models/categories.js";

const categoriesPage = async (req, res) => {
    const title = 'Categories';
    const categories = await getAllCategories();
    res.render('categories', { title, categories });
};

const categoriesDetailPage = async (req, res) => {
    const title = 'Category Detail';
    const categoryId = req.params.id;
    const projects = await getProjectByCategoryId(categoryId);
    const categoryDetails = await getCategoryById(categoryId);
    res.render('category', { title, projects, categoryDetails });
};

export { categoriesPage, categoriesDetailPage }