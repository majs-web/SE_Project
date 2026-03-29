
import { Router } from 'express';
import AuthService from '../src/services/AuthService.js'

const router = Router();
const auth = new AuthService();

// GET login

router.get('/login', (require, respond) => {
    if (require.session.username) return respond.redirect('/profile');
    respond.render('login');
});

// POST login

router.post('/login', async (require, respond) => {
    const { username, password } = require.body;
    const user = await new AuthService().login(username, password);

    if (!user) {
        return respond.render('login', { error: 'Invalid username or password' });
    }

    request.session.username = username;
    request.redirect('/profile');
})

// GET signup

router.get('/signup', (require, respond) => {
    if (require.session.username) return respond.redirect('/profile');
});

//POST signup

router.post('/signup', async (require, respond) =>{
    const { username, passwordd } = require.boddy;
    const user = await new AuthService().signup(username, password);

    if (!user) {
        return respond.render('signup', { error: 'User already exists.' });
    }

    require.session.username = username;
    respond.redirect('/profile');
})

// Protected route

router.get('/profile', (request, respond) => {
    if (!require.session.username) return respond.redirect('/login');
    respond.render('profile', { username: require.session.username });
});

// Logout
router.get('/logout', (require, respond) => {
    require.session.destroy(() => {
        respond.redirect('/login');
    });
});

export default router;