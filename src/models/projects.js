import db from "./db.js";

// const getAllProjectServices = async () => {
//     const query = `
//     SELECT title, pro.description, location, project_date, name 
//     FROM public.organization org JOIN public.projects pro
//     ON org.organization_id = pro.organization_id;`
//     const result = await db.query(query);
//     return result.rows;
// };

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

const getUpcomingProjects = async (number_of_projects) => {
  const query = `
  SELECT project_id, title, pro.description, project_date, location, pro.organization_id, name
  FROM public.projects pro JOIN public.organization org
  ON pro.organization_id = org.organization_id
  WHERE project_date >= CURRENT_DATE
  ORDER BY project_date
  LIMIT $1;
  `;
  const queryParams = [number_of_projects];
  const result = await db.query(query, queryParams);
  return result.rows;
};

const getProjectDetails = async (projectId) => {
  const query = `
  SELECT project_id, title, pro.description, project_date, location, pro.organization_id, name
  FROM public.projects pro JOIN public.organization org
  ON pro.organization_id = org.organization_id
  WHERE project_id = $1`

  const queryParams = [projectId];
  const result = await db.query(query, queryParams);
  return result.rows.length > 0 ? result.rows[0] : null;;
};

export { getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails }
