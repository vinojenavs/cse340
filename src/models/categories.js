import db from "./db.js";

const getAllCategories = async () => {
    const query = `
    SELECT name FROM categories`;
    const results = await db.query(query);
    return results.rows;
}

export { getAllCategories } 