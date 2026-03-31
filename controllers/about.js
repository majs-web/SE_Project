
import { Router } from 'express';

const router = Router();

router.get('/about', (request, response) => {
    response.render('about');
})

// After form is filled out and user clicks send, they return to the about-page.
router.post('/about', (request, response) => {
    console.log('Contact form submission: ', request.body);
    response.redirect("/about?success=1");
})

export default router;