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

//Gets the file 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/views/home.html'));
});
app.get('/organizations', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/views/organizations.html'));
});
app.get('/projects', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/views/projects.html'));
});


app.listen(PORT, () => {
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
});

