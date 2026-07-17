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
    const result =  await db.query(query, queryParams);
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

export { getAllCategories, getCategoryById, getCategoriesByProjectId, getProjectByCategoryId } 