import { getAllProjectServices } from "../models/projects.js";

const projectsPage = async (req, res) => {
    const title = 'Service Projects'
    const projects = await getAllProjectServices();
    res.render('projects', { title, projects });
};

export { projectsPage }