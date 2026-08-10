import bcrypt from 'bcrypt';
import { createUser, authenticateUser } from '../models/users.js';
import { body, validationResult } from 'express-validator';

// const userValidation = [
//     body('name')
//         .trim()
//         .notEmpty().withMessage('Name is required')
//         .isLength({ min: 3, max: 200 }).withMessage('Name must be between 3 and 200 characters');
//     body('email')
//         .trim()
//         .notEmpty().withMessage('Email is required')
//         .isEmail().withMessage('Please enter a valid email address')
//         .normalizeEmail()
//     body('password')
//         
// ];

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

const loginForm = async (req, res) => {
    const title = 'Login'
    res.render('login', { title });
}

const processLoginForm = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await authenticateUser(email, password);
        if (user) {
            //Store user info in session
            req.session.user = user;
            req.flash('success', 'Login successful!');
            
            if (res.locals.NODE_ENV === 'development') {
                console.log('User logged in:', user);
            }

            res.redirect('/');
        } else {
            req.flash('error', 'Invalid email or password.');
            res.redirect('/login');
        }
    } catch (error) {
        console.error('Error during login:', error);
        req.flash('error', 'An error occurred during login. Please try again.');
        res.redirect('/login');
    }
};

const processLogout = async (req, res) => {
    if (req.session.user) {
        delete req.session.user;
    }

    req.flash('success', 'Logout successful!');
    res.redirect('/login');
};

export { userRegistrationForm, processRegistrationForm, loginForm, processLoginForm, processLogout }