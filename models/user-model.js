import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    slug: { type: String, unique: true, required: true},
    useName: { type: String, required: true},
    password: { type: [String, Number], required: true},
});

const User = mongoose.model('User', userSchema);