
import express from 'express';

// Node.js path modules for path joining
import path from 'path';

// url is a built in Node.js tool
// fileURLToPath converts a file URL into a normal file path
import { fileURLToPath } from 'url';

import { logger } from './middlewares/logger.js';

// Import mock articles
import { newsArticles } from './data/news.js';

const app = express();
const PORT = 3000;

// __filename is the full path of the current file
// import.meta.url provides the current file URL
const __filename = fileURLToPath(import.meta.url);

// __dirname is the folder this file lives in
// path.dirname() strips off the filename to get the folder
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');

// Looks for files in the 'views' folder when EJS templating is used
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// I added app.get() for the static pages to avoid the .html in the URLs. 
app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, 'public', 'index.html'));
})

// When accessing "localhost:3000/news", Express sends back the rendered 
// news.ejs template with a list of all articles.
app.get('/news', (request, response) => {
    response.render('news', { articles: newsArticles });
})

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