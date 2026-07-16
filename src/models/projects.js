import db from "./db.js";

const getAllProjectServices = async () => {
    const query = `
    SELECT title, pro.description, location, project_date, name 
    FROM public.organization org JOIN public.projects pro
    ON org.organization_id = pro.organization_id;`
    const result = await db.query(query);
    return result.rows;
};

const getProjectsByOrganizationId = async (organizationId) => {
      const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          project_date
        FROM projects
        WHERE organization_id = $1
        ORDER BY project_date;
      `;
      
      const queryParams = [organizationId];
      const result = await db.query(query, queryParams);

      return result.rows;
};

export { getAllProjectServices, getProjectsByOrganizationId }
