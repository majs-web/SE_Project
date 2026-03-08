import express from 'express'
import { logger } from './middlewares/logger.js'

const app = express()
const PORT = 3000

app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(logger)

app.get('/', (request, response) => {
    response.send('Welcome to Bondeappen!')
})

app.get('/about', (request, response) => {
    console.log(request.query)

    response.send('Here you soon find information about us!')
})

app.post('/about', (request, response) => {
    console.log('Contact form submission: ', request.body)
    response.send("Thank you for reaching out - we'll get back to you soon.")
})

app.get('/legal', (request, response) => {
    response.send('Here you find the legal stuff.')
})

app.listen(PORT, () => {
    console.log(`Started server on port ${PORT}`)
})