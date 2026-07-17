import express from 'express';
import { homePage } from './controllers/index.js';
import { organizationsPage, organizationDetailPage } from './controllers/organizations.js';
import { projectsPage, projectDetailPage } from './controllers/projects.js';
import { categoriesPage, categoriesDetailPage } from './controllers/categories.js';
import { errorPage } from './controllers/error.js';


const router = express.Router();

router.get('/', homePage);
router.get('/organizations', organizationsPage);
router.get('/projects', projectsPage);
router.get('/categories', categoriesPage);
router.get('/organization/:id', organizationDetailPage);
router.get('/project/:id', projectDetailPage);
router.get('/category/:id', categoriesDetailPage);

// error-handling routes
router.get('/test-error', errorPage);

export default router;