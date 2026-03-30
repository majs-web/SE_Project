
import { Router } from 'express';
import AuthService from '../src/services/AuthService.js'

const router = Router();
const auth = new AuthService();

// GET login

router.get('/login', (request, response) => {
    if (request.session.username) {
        return response.redirect('/profile');
    }
    response.render('login');
});

// POST login

router.post('/login', async (request, response) => {
    const { username, password } = request.body;
    const user = await auth.login(username, password);

    if (!user) {
        return response.render('login', { error: 'Invalid username or password' });
    }

    request.session.username = username;
    response.redirect('/profile');
})

// GET signup

router.get('/signup', (request, response) => {
    if (request.session.username) {
        return response.redirect('/profile');
    }
    response.render('signup');
});

//POST signup

router.post('/signup', async (request, response) => {
    const { username, password } = request.body;
    const user = await auth.signup(username, password);

    if (!user) {
        return response.render('signup', { error: 'User already exists.' });
    }

    request.session.username = username;
    response.redirect('/profile');
});

// Protected route

router.get('/profile', (request, response) => {
    if (!request.session.username) {
        return response.redirect('/login');
    }
    response.render('profile', { username: request.session.username });
});

// Logout
router.get('/logout', (request, response) => {
    request.session.destroy(() => {
        response.redirect('/login');
    });
});

router.get('/certificates', (request, response) => {
    response.render('certificates');
});

export default router;