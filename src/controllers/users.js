import bcrypt from 'bcrypt';
import { createUser } from '../models/users.js';

const userRegistrationForm = async(req, res) => {
    const title = 'Registration Page';
    res.render('register', { title });
};

const processRegistrationForm = async(req, res) => {
    
    const { name, email, password } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        const userId = await createUser(name, email, passwordHash);
        
        req.flash('success', 'Registration successfull! Please log in.');
        res.redirect('/');
    } catch (error) {
        console.error('Error registering user:', error);
        req.flash('error', 'An error occurred during registration. Please try again.');
        res.redirect('/register');
    }
};

export { userRegistrationForm, processRegistrationForm }