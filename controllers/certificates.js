import { Router } from 'express';
import { Certificate } from '../models/certificates.js';

const router = Router();

router.post('/certificates', async (request, response) => {
    try {
        const certificate = new Certificate({
            slug: request.body.slug,
            name: request.body.name,
            description: request.body.description
        });
        await certificate.save()

        response.send('Certificate was uploaded');
    }catch (error) {
        console.error(error);
        response.send('Error: The certificate could not be uploaded.');
    };
});

router.get('/certificates', (request, response) => {
    response.render('certificates');
});

/* router.get('/certificates', async (request, response) => {
    try {
        const certificates = await Certificate.find({ isInStock: true }).exec()
        if(!cookie) throw new Error ('Certificate not found')

        response.render('certificates/index', {
            certificates: certificates,
            description: description
        })
    }catch(error) {
        console.error(error)
        response.status(404).send("Could not find the certificate you're looking for.")
    }
}); */

router.get('/certificates/:slug/edit', async (request, response) => {
    try {
        const slug = request.params.slug
        const certificate = await Certificate.findOne({ slug: slug }).exec()
        if(!certificate) throw new Error('Certifiicate not found')
        
        response.render('certificates/edit', { certificate: certificate })
    }catch(error) {
        console.error(error)
        response.status(404).send("Could not find the certificate you're looking for.")
    }
});

router.post('/certificates/:slug', async (request, response) => {
    try {
        const certificate = await Certificate.findOneAndUpdate(
            { slug: request.params.slug },
            request.body,
            { new: true }
        )

        response.redirect(`/certificates/${certificate.slug}`)
    }catch (error) {
        console.error(error)
        response.send('Error: The certificate could not be updated.')
    }
});

router.get('/certificates/:slug/delete', async (request, response) => {
    try {
        await Certificate.findOneAndDelete({ slug: request.params.slug })

        response.redirect('/certificates')
    }catch (error) {
        console.error(error)
        response.send('Error: No certificate was deleted.')
    }
})

export default router;