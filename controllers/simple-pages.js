
import { Router } from 'express';

const router = Router();

//Define the root
router.get('/', (request, response) => {
    response.render('index', {root: './'});
})

// Legal page
router.get('/legal', (request, response) => {
    response.render('legal');
})

export default router;