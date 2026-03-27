import express, { response } from 'express';
import { Router } from 'express'

// Import mock articles
import { newsArticles } from './data/news.js';

const app = express();
const router = Router();

// When accessing "localhost:3000/news", Express sends back the rendered 
// news.ejs template with a list of all articles.
// "articles:" is what is used in the .ejs file, "newsArticles" is what I defined it as in this file
app.router('/news', async (request, response) => {
    response.render('news', { articles: newsArticles });
})

// Using .find() to go through newsArticles array in news.js --> when slug is a match, 
// Express renders article.ejs with the correct article 
app.router('/news/:slug', async (request, response) => {
    const article = newsArticles.find(a => a.slug === request.params.slug);
    response.render('article', { article });
})
