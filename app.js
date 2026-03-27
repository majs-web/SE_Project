
import express, { response } from 'express';

// Node.js path modules for path joining
import path from 'path';

// url is a built in Node.js tool
// fileURLToPath converts a file URL into a normal file path
import { fileURLToPath } from 'url';

import { logger } from '../middlewares/logger.js';

// Import mock articles
import { newsArticles } from '../data/news.js';
import { request } from 'http';

//_________________________


// ODM import + ensure that mongoose is connected
import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/testingthis')
    .then(() => console.log('Database connected'))
    .catch(error => console.error(error))

const cookieSchema = new mongoose.Schema({
    slug: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    priceInCents: { type: Number, required: true },
    isInStock: { type: Boolean, default: true, required: true }
})

const Cookie = mongoose.model('Cookie', cookieSchema);



//---------------------
const app = express();
const PORT = 3000;
/* import { fileURLToPath } from 'url'; */
//import { connectToDb, getDb } from './db.js';
/* const { connectToDb, getDb } = require('./db') */

// __filename is the full path of the current file
// import.meta.url provides the current file URL
const __filename = fileURLToPath(import.meta.url);

// __dirname is the folder this file lives in
// path.dirname() strips off the filename to get the folder
const __dirname = path.dirname(__filename);

// Config 
app.set('view engine', 'ejs');

// Looks for files in the 'views' folder when EJS templating is used
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(logger);

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

// ---------------------

/* app.post('/cookies', (request, response) => {
    const cookie = new Cookie({
        slug: 'chocolate-chip',
        name: 'Chocolate Chip',
        priceInCents: 350
    })
    cookie.save()

    response.send('Cookie Created')
})  */




// ---------------------

//Define the root
/* app.get('/', (request, response) => {
    response.sendFile('index', {root: './'});
}) */


/* app.use(express.static('public')); */

// I added app.get() for the static pages to avoid the .html in the URLs. 
app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, 'public', 'index.html'));
})

// When accessing "localhost:3000/news", Express sends back the rendered 
// news.ejs template with a list of all articles.
// "articles:" is what is used in the .ejs file, "newsArticles" is what I defined it as in this file
app.get('/news', (request, response) => {
    response.render('news', { articles: newsArticles });
})

// How to use a the same file in two routes but display some information only on one:
/* app.get('/shop', (request, response) => {
    if(cookies !== 'undefined') {
        console.log('cookies')
    }
}) */

// Using .find() to go through newsArticles array in news.js --> when slug is a match, 
// Express renders article.ejs with the correct article 
app.get('/news/:slug', (request, response) => {
    const article = newsArticles.find(a => a.slug === request.params.slug);
    response.render('article', { article });
});

app.get('/about', (request, response) => {
    response.sendFile(path.join(__dirname, 'public', 'about.html'));
})

// After form is filled out and user clicks send, they return to the about-page.
app.post('/about', (request, response) => {
    console.log('Contact form submission: ', request.body);
    response.redirect("/about.html?success=1");
})

app.get('/legal', (request, response) => {
    response.sendFile(path.join(__dirname, 'public', 'legal.html'));
})

app.listen(PORT, () => {
    console.log(`Started server on port ${PORT}`);
})