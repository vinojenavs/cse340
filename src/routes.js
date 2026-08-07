import express from 'express';
import { homePage } from './controllers/index.js';
import { organizationsPage, organizationDetailPage, processNewOrganization, newOrganizationForm, organizationValidation, editOrganizationForm, processEditOrganizationForm } from './controllers/organizations.js';
import { projectsPage, projectDetailPage, showNewProjectForm, processNewProjectForm, projectValidation, editProjectForm, processEditProjectForm } from './controllers/projects.js';
import { categoriesPage, categoriesDetailPage, assignCategoriesForm, processAssignCategoriesForm, newCategoryForm, processNewCategoryForm, categoryValidation, editCategoryForm, processEditCategoryForm } from './controllers/categories.js';
import { userRegistrationForm, processRegistrationForm } from './controllers/users.js';
import { errorPage } from './controllers/error.js';


const router = express.Router();

router.get('/', homePage);
router.get('/organizations', organizationsPage);
router.get('/projects', projectsPage);
router.get('/categories', categoriesPage);
router.get('/organization/:id', organizationDetailPage);
router.get('/project/:id', projectDetailPage);
router.get('/category/:id', categoriesDetailPage);
router.get('/new-organization', newOrganizationForm);
router.post('/new-organization', organizationValidation, processNewOrganization);
router.get('/edit-organization/:id', editOrganizationForm);
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);
router.get('/new-project', showNewProjectForm);
router.post('/new-project', projectValidation, processNewProjectForm);
router.get('/assign-categories/:projectId', assignCategoriesForm);
router.post('/assign-categories/:projectId', processAssignCategoriesForm);
router.get('/edit-project/:id', editProjectForm);
router.post('/edit-project/:id', projectValidation, processEditProjectForm);
router.get('/new-category', newCategoryForm);
router.post('/new-category', categoryValidation, processNewCategoryForm);
router.get('/edit-category/:id', editCategoryForm);
router.post('/edit-category/:id', categoryValidation, processEditCategoryForm);
router.get('/register', userRegistrationForm);
router.post('/register', processRegistrationForm);

// error-handling routes
router.get('/test-error', errorPage);

export default router;