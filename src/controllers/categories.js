import { getAllCategories, getCategoryById, getProjectByCategoryId, getCategoriesByProjectId, updateCategoryAssignments, createCategory, updateCategory } from "../models/categories.js";
import { getProjectDetails } from "../models/projects.js";
import { body, validationResult } from "express-validator";

const categoryValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Category name is required')
        .isLength({ min: 3, max: 150 })
        .withMessage('Category name must be between 3 to 150 characters')
]

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

const newCategoryForm = async (req, res) => {
    const title = 'Create New Category';
    res.render('new-category', { title });
};

const processNewCategoryForm = async (req, res) => {
    // Check for validation errors
    const results = validationResult(req);
    if (!results.isEmpty()) {
        // Validation failed - loop through errors
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });
        // Redirect back to the new category form
        return res.redirect('/new-category');
    }
    const { name } = req.body;
    const categoryId = await createCategory(name);
    req.flash('success', 'Category added successfully.');
    res.redirect(`/category/${categoryId}`);
};

const editCategoryForm = async (req, res) => {
    const title = 'Edit Category';
    const categoryId = req.params.id;
    const categoryDetails = await getCategoryById(categoryId);
    res.render('edit-category', { title, categoryDetails });
};

const processEditCategoryForm = async (req, res) => {
    const categoryId = req.params.id;
    const { name } = req.body;
    await updateCategory(categoryId, name);
    const results = validationResult(req);
    if (!results.isEmpty()) {
        // Validation failed - loop through errors
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the edit organization form
        return res.redirect('/edit-category/' + req.params.id);
    }
    // Set a success flash message
    req.flash('success', 'Category updated successfully!');

    res.redirect(`/category/${categoryId}`);
}

export { categoriesPage, categoriesDetailPage, assignCategoriesForm, processAssignCategoriesForm, newCategoryForm, processNewCategoryForm, categoryValidation, editCategoryForm, processEditCategoryForm }