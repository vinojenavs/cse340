import db from "./db.js";

const getAllCategories = async () => {
    const query = `
    SELECT name, category_id
    FROM categories`;
    const results = await db.query(query);
    return results.rows;
};

const getCategoryById = async (categoryId) => {
    const query = `
    SELECT name, category_id
    FROM public.categories
    WHERE category_id = $1`;
    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);
    return result.rows.length > 0 ? result.rows[0] : null;
};

const getCategoriesByProjectId = async (projectId) => {
    const query = `
    SELECT name, cat.category_id, pro.project_id, title
    FROM public.categories cat JOIN public.project_categories procat
    ON cat.category_id = procat.category_id
    JOIN public.projects pro
    ON procat.project_id = pro.project_id
    WHERE pro.project_id = $1`;

    const queryParams = [projectId];
    const result = await db.query(query, queryParams);
    return result.rows;
};

const getProjectByCategoryId = async (categoryId) => {
    const query = `
    SELECT name, cat.category_id, pro.project_id, title, pro.description, project_date, location
    FROM public.categories cat JOIN public.project_categories procat
    ON cat.category_id = procat.category_id
    JOIN public.projects pro
    ON procat.project_id = pro.project_id
    WHERE cat.category_id = $1`;

    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);
    return result.rows;
};

const assignCategoryToProject = async (categoryId, projectId) => {
    const query = `
    INSERT INTO project_categories (category_id, project_id)
    VALUES ($1, $2);
    `;
    await db.query(query, [categoryId, projectId]);
};

const updateCategoryAssignments = async (projectId, categoryIds) => {
    const deleteQuery = `
    DELETE FROM project_categories
    WHERE project_id = $1;
    `;
    await db.query(deleteQuery, [projectId]);
    for (const categoryId of categoryIds) {
        await assignCategoryToProject(categoryId, projectId);
    }
};

const createCategory = async (name) => {
    const query = `
    INSERT INTO categories (name)
    VALUES ($1)
    RETURNING category_id;
    `;
    const queryParams = [name];
    const result = await db.query(query, queryParams);
    return result.rows[0].category_id;
};

const updateCategory = async (categoryId, name) => {
    const query = `
    UPDATE categories
    SET name = $1
    WHERE category_id = $2
    RETURNING category_id;
    `;
    const queryParams = [name, categoryId];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Category not found');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Updated Category with ID:', categoryId);
    }

    return result.rows[0].category_id;
};

export { getAllCategories, getCategoryById, getCategoriesByProjectId, getProjectByCategoryId, updateCategoryAssignments, createCategory, updateCategory } 