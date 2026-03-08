import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { logger } from './middlewares/logger.js';
import { newsArticles } from './data/news.js';


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = 3000;


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(logger);


app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, 'public', 'index.html'));
})


app.get('/news', (request, response) => {
    response.render('news', { articles: newsArticles })
})

app.get('/news/:slug', (request, response) => {
    const article = newsArticles.find(a => a.slug === request.params.slug);
    if (article) {
        response.render('article', { article });
    } else {
        res.status(404).send('Article not found');
    }
});


app.get('/about', (request, response) => {
    response.sendFile(path.join(__dirname, 'public', 'about.html'));
})

app.post('/about', (request, response) => {
    console.log('Contact form submission: ', request.body)
    response.redirect("/about.html?success=1")
})


app.get('/legal', (request, response) => {
    response.sendFile(path.join(__dirname, 'public', 'legal'));
})


app.listen(PORT, () => {
    console.log(`Started server on port ${PORT}`)
})