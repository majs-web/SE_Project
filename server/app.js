import express from 'express'
import { logger } from '../middlewares/logger.js'
import path from 'path';
import { fileURLToPath} from 'url'

const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = 3000

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }))
app.use(logger)

app.post('./public/about', (request, response) => {
    console.log('Contact form submission: ', request.body)
    response.send("Thank you for reaching out - we'll get back to you soon.")
})

app.get('/', (request, response) => {
    response.send('Welcome to Bondeappen!')
})

app.get('/about', (request, response) => {
    console.log(request.query)

    response.send('Here you soon find information about us!')
})

app.listen(PORT, () => {
    console.log(`Started server on port ${PORT}`)
})