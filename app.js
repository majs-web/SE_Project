
import express, { response } from 'express';
import { logger } from './middlewares/logger.js';

import session from 'express-session';
import authRoutes from './controllers/auth.js'

// Import controllers
import simpleRoutes from './controllers/simple-pages.js';
import newsRoutes from './controllers/news.js';
import aboutRoutes from './controllers/about.js';

const app = express();
const PORT = 3000;

// Config 
app.set('view engine', 'ejs');

// Looks for files in the 'views' folder when EJS templating is used
app.set('views', 'views');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.use(session({
    name: 'MySessionID',
    secret: process.env.SECRET || 'dev_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false //only works false when localhost
    }
}));

// Controllers
app.use(simpleRoutes);
app.use(newsRoutes);
app.use(aboutRoutes);
app.use(authRoutes);

app.listen(PORT, () => {
    console.log(`Started server on port ${PORT}`);
})

// db connection
/* let db
connectToDb((err) => {
    if (!err) {
        app.listen(3000, () => {
            console.log(`Started server on port 3000`);
        })
        db = getDb()
    }
}) */

// Test with book example
/* app.get('/books', (request, response) => {
    let books = [] // Where the books get stored after retreiving from db

    db.collection('books')
        .find() // .find() returns cursor, can use two methods, toArray and forEach -> brings back different 
        .sort({ author: 1 })
        .forEach(book => books.push(book)) // Iterate each book individually
        .then(() => {
            response.status(200).json(books)
        })
        .catch(() => {
            response.status(500).json({error: 'Could not fetch the documents'})
        })
}) */