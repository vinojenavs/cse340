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

const createProject = async (title, description, location, date, organizationId) => {
    const query = `
      INSERT INTO projects (title, description, location, project_date, organization_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING project_id;
    `;

    const queryParams = [title, description, location, date, organizationId];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create project');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new project with ID:', result.rows[0].project_id);
    }

    return result.rows[0].project_id;
};

const showNewProjectForm = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Add New Service Project';

    res.render('new-project', { title, organizations });
};

const processNewProjectForm = async (req, res) => {
    // Extract form data from req.body
    const { title, description, location, date, organizationId } = req.body;

    try {
        // Create the new project in the database
        const newProjectId = await createProject(title, description, location, date, organizationId);

        req.flash('success', 'New service project created successfully!');
        res.redirect(`/project/${newProjectId}`);
    } catch (error) {
        console.error('Error creating new project:', error);
        req.flash('error', 'There was an error creating the service project.');
        res.redirect('/new-project');
    }
};

export { getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails, createProject, showNewProjectForm, processNewProjectForm }
