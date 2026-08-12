import express from 'express';
import { homePage } from './controllers/index.js';
import { organizationsPage, organizationDetailPage, processNewOrganization, newOrganizationForm, organizationValidation, editOrganizationForm, processEditOrganizationForm } from './controllers/organizations.js';
import { projectsPage, projectDetailPage, showNewProjectForm, processNewProjectForm, projectValidation, editProjectForm, processEditProjectForm } from './controllers/projects.js';
import { categoriesPage, categoriesDetailPage, assignCategoriesForm, processAssignCategoriesForm, newCategoryForm, processNewCategoryForm, categoryValidation, editCategoryForm, processEditCategoryForm } from './controllers/categories.js';
import { userRegistrationForm, processRegistrationForm, loginForm, processLoginForm, processLogout, displayDashboard, requireLogin, requireRole, displayAllUsers, volunteer, unVolunteer, unVolunteerFromDashBoard, requireVolunteer, requireNonVolunteer } from './controllers/users.js';
import { errorPage } from './controllers/error.js';


const router = express.Router();

router.get('/', homePage);
router.get('/organizations', organizationsPage);
router.get('/projects', projectsPage);
router.get('/categories', categoriesPage);
router.get('/organization/:id', organizationDetailPage);
router.get('/project/:id', projectDetailPage);
router.get('/category/:id', categoriesDetailPage);
router.get('/new-organization', requireRole('admin'), newOrganizationForm);
router.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganization);
router.get('/edit-organization/:id', requireRole('admin'), editOrganizationForm);
router.post('/edit-organization/:id', requireRole('admin'), organizationValidation, processEditOrganizationForm);
router.get('/new-project', requireRole('admin'), showNewProjectForm);
router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);
router.get('/assign-categories/:projectId', requireRole('admin'), assignCategoriesForm);
router.post('/assign-categories/:projectId', requireRole('admin'), processAssignCategoriesForm);
router.get('/edit-project/:id', requireRole('admin'), editProjectForm);
router.post('/edit-project/:id', requireRole('admin'), projectValidation, processEditProjectForm);
router.get('/new-category', requireRole('admin'), newCategoryForm);
router.post('/new-category', requireRole('admin'), categoryValidation, processNewCategoryForm);
router.get('/edit-category/:id', requireRole('admin'), editCategoryForm);
router.post('/edit-category/:id', requireRole('admin'), categoryValidation, processEditCategoryForm);
router.get('/register', userRegistrationForm);
router.post('/register', processRegistrationForm);
router.get('/login', loginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);
router.get('/dashboard', requireLogin, displayDashboard );
router.get('/users-page', requireRole('admin'), displayAllUsers);
router.post('/project/:id/volunteer', requireLogin, requireNonVolunteer, volunteer);
router.post('/project/:id/unvolunteer', requireLogin, requireVolunteer, unVolunteer);
router.post('/project/:id/unvolunteerdb', requireLogin, requireVolunteer, unVolunteerFromDashBoard);

// error-handling routes
router.get('/test-error', errorPage);

export default router;