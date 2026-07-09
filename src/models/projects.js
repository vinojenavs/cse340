import db from "./db.js";

const getAllProjectServices = async () => {
    const query = `
    SELECT title, pro.description, location, project_date, name 
    FROM public.organization org JOIN public.projects pro
    ON org.organization_id = pro.organization_id;`
    const result = await db.query(query);
    return result.rows;
}

export { getAllProjectServices }
