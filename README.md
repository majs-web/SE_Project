# Bondeappen / The farmers app

A web platform aimed to help farmers find and organize information about important regulations and requirements.

## Project Overview, first hand-in SE_19
- 3 static HTML pages linked to each other:
    - Landing Page (index.html)
    - About Page (about.html)
    - Legal Page (legal.html)
- Styled using CSS (style.css)
- Responsive layout

## Updated overview, second hand-in SE_19
- 2 pages added:
    - news.ejs: Overview page of all news articles
        - Currently connected to a mock article database (data/news.js)
    - article.ejs: function in backend allows users to access different articles with different URLs. 
- Contact-form added to about-page:
    - Allows users to write a message, submit name, email, and phone nr. 
    - Logger function (middlewares/logger.js) ensures request from user is posted in server console.

## How to run
1. Ensure you have Node.js installed --> node -v
2. Initialize npm --> npm init
3. Install Express --> npm install express
4. To start server --> npm run start
    - Also install nodemon to keep server running and auto update when saving --> npm install nodemon --save-dev
    - To start nodemon, run --> npm run dev
    - To stop server --> ctrl + c

## Features (goal down the line)
- Users can register and login
- Personalized dashboard to store relevant files, deadlines
- Connected to a database with news, certificates and regulations

## Author
Developed by Maja Lie for SE modules SE_01, SE_19, SE_14, SE_10.