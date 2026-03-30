import { request, Router } from 'express';
import { Certificate } from '../models/certificates.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';

const router = Router();

// GET all certificates
router.get('/certificates', isLoggedIn, async (request, response) => {
    try {
        const certificates = await Certificate.find({});
        response.render('certificates/index', { certificates });
    }catch(error) {
        console.error(error);
        response.render('certificates/index', { certificates: [] });
    }
});

// GET new certificate form
router.get('/certificates/new', isLoggedIn, (request, response) => {
    response.render('certificates/new');
});

// POST create new certificate
router.post('/certificates/new', isLoggedIn, async (request, response) => {
    try {
        const certificate = new Certificate({
            slug: request.body.slug,
            name: request.body.name,
        description: request.body.description
        });

        await certificate.save();
        response.redirect('/certificates');
    }catch(error) {
        console.error(error);
        response.send('Error: The certificate could not be created.');
    }
});

// GET single certificate
router.get('/certificates/:slug', isLoggedIn, async (request, response) => {
    try {
        const certificate = await Certificate.findOne({ slug: request.params.slug });

        if (!certificate) {
            return response.status(404).send('Certificate not found.');
        }

        response.render('certificates/show', { certificate });
    }catch(error) {
        console.error(error);
        response.status(404).send('Error loading certificate.');
    }
});

// GET edit certificate page
router.get('/certificates/:slug/edit', isLoggedIn, async (request, response) => {
    try {
        const certificate = await Certificate.findOne({ slug: request.params.slug });

        if (!certificate) {
            return response.status(404).send('Certifiicate not found.');
        }

        response.render('certificates/edit', { certificate });
    }catch(error) {
        console.error(error);
        response.status(404).send('Couldd not load edit page.');
    }
});

// POST update certificate
router.post('/certificates/:slug', isLoggedIn, async (request, response) => {
    try {
        const certificate = await Certificate.findOneAndUpdate(
            { slug: request.params.slug },
            request.body,
            { new: true }
        );

        if (!certificate) {
            return response.status(404).send('Certificate not foundd.');
        }

        response.redirect(`/certificates/${certificate.slug}`);
    }catch(error) {
        console.error(error);
        response.send('Error: The certificate could not be updated.');
    }
});

// DELETE certificate
router.get('/certificates/:slug/delete', isLoggedIn, async (request, response) => {
    try {
        await Certificate.findOneAndDelete({ slug: request.params.slug });
        response.redirect('/certificates');
    }catch(error) {
        console.error(error);
        response.send('Error: No certificate was deleted.');
    }
});

export default router;
