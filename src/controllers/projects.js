import { getUpcomingProjects, getProjectDetails, createProject, updateProject } from "../models/projects.js";
import { getCategoriesByProjectId } from "../models/categories.js";
import { getAllOrganizations } from "../models/organizations.js";
import { body, validationResult } from "express-validator";
import { checkVolunteer } from "../models/users.js";

const projectValidation = [
    body('title')
        .trim()
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters'),
    body('description')
        .trim()
        .notEmpty().withMessage('Description is required')
        .isLength({ max: 1000 }).withMessage('Description must be less than 1000 characters'),
    body('location')
        .trim()
        .notEmpty().withMessage('Location is required')
        .isLength({ max: 200 }).withMessage('Location must be less than 200 characters'),
    body('date')
        .notEmpty().withMessage('Date is required')
        .isISO8601().withMessage('Date must be a valid date format'),
    body('organizationId')
        .notEmpty().withMessage('Organization is required')
        .isInt().withMessage('Organization must be a valid integer')
];

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
    let isVolunteering = false;
    if (req.session.user) {
        isVolunteering = await checkVolunteer(req.session.user.user_id, projectId);
    }
    res.render('project', { title, projectDetail, categories, isVolunteering });
};

const showNewProjectForm = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Add New Service Project';

    res.render('new-project', { title, organizations });
}

const processNewProjectForm = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Loop through validation errors and flash them
        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the new project form
        return res.redirect('/new-project');
    }
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

const editProjectForm = async (req, res) => {
    const title = 'Edit Project';
    const projectId = req.params.id;
    const projectDetail = await getProjectDetails(projectId);
    const organizations = await getAllOrganizations();
    res.render('edit-project', { title, projectDetail, organizations });
};

const processEditProjectForm =async (req, res) => {
    const projectId = req.params.id;
    const { title, description, location, date, organizationId } = req.body;
    await updateProject(projectId, title, description, location, date, organizationId);
    const results = validationResult(req);
    if (!results.isEmpty()) {
        // Validation failed - loop through errors
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the edit organization form
        return res.redirect('/edit-project/' + req.params.id);
    };
    // Set a success flash message
    req.flash('success', 'Project updated successfully!');

    res.redirect(`/project/${projectId}`);
}

export { projectsPage, projectDetailPage, showNewProjectForm, processNewProjectForm, projectValidation, editProjectForm, processEditProjectForm }