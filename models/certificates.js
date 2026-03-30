import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
    slug: { type: String, unique: true, required: true},
    name: { type: String, required: true},
    description: { type: String, requried: true},
    isInStock: { type: Boolean, default: true, required: true}
});

export const Certificate = mongoose.model('Certificate', certificateSchema);