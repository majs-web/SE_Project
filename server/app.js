import express from 'express'
import { logger } from '../middlewares/logger.js'

const app = express()
const PORT = 3000

app.use(logger)

const name = ''

app.get('/maths', (request, response) => {
    const num1 = 10
    const num2 = 20
    const num3 = 15
    const average = (num1 + num2 + num3) / 3
    response.send(`The average of ${num1}, ${num2}, and ${num3} is ${average}!`)
})

app.post('/about', (request, response) => {
    response.send('Reach out if you have a question.')
})

app.get('/legal', (request, response) => {
    response.send(`Hi, ${name}! Welcome to this page. Today's dinner: ${favFood}`)
})

app.listen(PORT, () => {
    console.log(`Started server on port ${PORT}`)
})