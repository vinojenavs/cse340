import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { testConnection } from './src/models/db.js';
import { getAllOrganizations } from './src/models/organizations.js';
import { getAllProjectServices } from './src/models/projects.js';
import { getAllCategories } from './src/models/categories.js';

//Define application environment
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';
//Define port number for server
const PORT = process.env.PORT || 3000;

//Converts the URL of the current module to a file system path.
const __filename = fileURLToPath(import.meta.url);
//extracts just the directory name
const __dirname = path.dirname(__filename);

const app = express();

/** Configure Express Middleware */
//Tells express that any file from public directory should be accessible directly through the website
app.use(express.static(path.join(__dirname, 'public')));

//Set EJS as the templating engine
app.set('view engine', 'ejs');
//Tell Express where to find templates
app.set('views', path.join(__dirname, 'src/views'));

// Middleware to log all incoming requests
app.use((req, res, next) => {
    if (NODE_ENV === 'development') {
        console.log(`${req.method} ${req.url}`);
    }
    next(); // Pass control to the next middleware or route
});

// Middleware to make NODE_ENV available to all templates
app.use((req, res, next) => {
    res.locals.NODE_ENV = NODE_ENV;
    next();
});

//Gets the file 
app.get('/', async (req, res) => {
    const title = 'Home';
    res.render('home', { title });
});
app.get('/organizations', async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Our Partner Organizations'
    res.render('organizations', { title, organizations });
});
app.get('/projects', async (req, res) => {
    const title = 'Service Projects'
    const projects = await getAllProjectServices();
    res.render('projects', { title, projects });
});
app.get('/categories', async (req, res) => {
    const title = 'Categories'
    const categories = await getAllCategories();
    res.render('categories', { title, categories });
});

app.get('/test-error', (req, res, next) => {
    const err = new Error('This is a test error');
    err.status = 500;
    next(err);
});

// Catch-all route for 404 errors
app.use((req, res, next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    // Log error details for debugging
    console.error('Error occurred:', err.message);
    console.error('Stack trace:', err.stack);
    
    // Determine status and template
    const status = err.status || 500;
    const template = status === 404 ? '404' : '500';
    
    // Prepare data for the template
    const context = {
        title: status === 404 ? 'Page Not Found' : 'Server Error',
        error: err.message,
        stack: err.stack
    };
    
    // Render the appropriate error template
    res.status(status).render(`errors/${template}`, context);
});

app.listen(PORT, async () => {
    try {
        await testConnection();
        console.log(`Server is running at http://127.0.0.1:${PORT}`);
        console.log(`Environment: ${NODE_ENV}`);
    } catch (error) {
        console.error('Error connecting to the database:', error);
    } 
});

