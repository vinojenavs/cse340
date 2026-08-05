import { getAllCategories, getCategoryById, getProjectByCategoryId, getCategoriesByProjectId, updateCategoryAssignments } from "../models/categories.js";
import { getProjectDetails } from "../models/projects.js";

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

const assignCategoriesForm = async (req, res) => {
    const title = 'Assign Categories to Project';
    const projectId = req.params.projectId;
    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getCategoriesByProjectId(projectId);
    res.render('assign-categories', { title, projectDetails, categories, assignedCategories });
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};

export { categoriesPage, categoriesDetailPage, assignCategoriesForm, processAssignCategoriesForm }