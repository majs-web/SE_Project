import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
    name: { type: String, required: true},
    slug: { type: String, unique: true},
    date: { type: Date, required: true},
    description: { type: String, required: true},
    isInStock: { type: Boolean, default: true}
});

// NB: Used ChatGPT to figure out how to create this function
// Turns the certificate name input into a slug
certificateSchema.pre('save', async function () {
    if (!this.slug) {
        this.slug = this.name
            .toLowerCase()
            .trim()
            .replace(/[\s\W-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }
});

export const Certificate = mongoose.model('Certificate', certificateSchema);