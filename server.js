import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

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

//Gets the file 
app.get('/', async (req, res) => {
    const title = 'Home';
    res.render('home', { title });
});
app.get('/organizations', async (req, res) => {
    const title = 'Our Partner Organizations'
    res.render('organizations', { title });
});
app.get('/projects', (req, res) => {
    const title = 'Service Projects'
    res.render('projects', { title });
});


app.listen(PORT, () => {
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
});

