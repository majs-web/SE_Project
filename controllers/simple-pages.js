
//Define the root
app.get('/', (request, response) => {
    response.render('index', {root: './'});
})

// Legal page
app.get('/legal', (request, response) => {
    response.render('legal');
})