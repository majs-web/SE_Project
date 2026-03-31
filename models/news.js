
// Not yet in use, still using the mock database
import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
    slug: { type: String, unique: true, required: true},
    title: { type: String, required: true},
    date: { type: Date, required: true},
    summary: { type: String, required: true},
    body: { type: String, required: true}
});

export const newsArticles = mongoose.model('Article', articleSchema);