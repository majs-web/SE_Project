
import express from 'express';
import { logger } from './middlewares/logger.js';

import mongoose from 'mongoose';

import session from 'express-session';
import authRoutes from './controllers/auth.js';

// Import controllers
import simpleRoutes from './controllers/simple-pages.js';
import newsRoutes from './controllers/news.js';
import aboutRoutes from './controllers/about.js';
import certificateRoutes from './controllers/certificates.js';

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/bondeappen')
    .then(() => console.log('Database connected'))
    .catch(error => console.error(error))

// Config 
app.set('view engine', 'ejs');

// Looks for files in the 'views' folder when EJS templating is used
app.set('views', 'views');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.use(session({
    secret: 'dev_secret',
    resave: false,
    saveUninitialized: false,
}));

// Controllers
app.use(authRoutes);
app.use(simpleRoutes);
app.use(newsRoutes);
app.use(aboutRoutes);
app.use(certificateRoutes);

app.listen(PORT, () => {
    console.log(`Started server on port ${PORT}`);
});