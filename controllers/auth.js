
import { Router } from 'express';
import { User } from '../models/users.js';

const router = Router();

// GET login
router.get('/login', (request, response) => {
    response.render('login');
});

// POST login
router.post('/login', async (request, response) => {
    const { username, password } = request.body;
    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
        return response.render('login', { error: 'Wrong username or password.' });
    }

    request.session.username = user.username;
    response.redirect('/profile');
})

// GET signup
router.get('/signup', (request, response) => {
    response.render('signup');
});

//POST create new user
router.post('/signup', async (request, response) => {
    try {
        const { username, password } = request.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return response.render('signup', { error: 'This user already exists.' });
        }
        const user = new User({ username, password });
        await user.save();
        response.redirect('/login');
    }catch(error) {
        console.error(error);
        response.send('Something went wrong: Could not create user.');
    }
});

// GET profile
router.get('/profile', (request, response) => {
    if (!request.session.username) {
        return response.redirect('/login');
    }
    response.render('profile', { username: request.session.username });
});

// GET logout
router.get('/logout', (request, response) => {
    request.session.destroy(() => {
        response.redirect('/login');
    });
});

export default router;