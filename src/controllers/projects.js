import { getUpcomingProjects, getProjectDetails } from "../models/projects.js";
import { getCategoriesByProjectId } from "../models/categories.js";

const projectsPage = async (req, res) => {
    const title = 'Upcoming Service Projects';
    const number_of_upcoming_projects = 5;
    const projects = await getUpcomingProjects(number_of_upcoming_projects);
    res.render('projects', { title, projects });
};

const projectDetailPage = async (req, res) => {
    const title = 'Project Details';
    const projectId = req.params.id;
    const projectDetail = await getProjectDetails(projectId);
    const categories = await getCategoriesByProjectId(projectId);
    res.render('project', { title, projectDetail, categories });
};

export { projectsPage, projectDetailPage }