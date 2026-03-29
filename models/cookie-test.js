
// ODM import + ensure that mongoose is connected
import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/testingthis')
    .then(() => console.log('Database connected'))
    .catch(error => console.error(error))

const cookieSchema = new mongoose.Schema({
    slug: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    priceInCents: { type: Number, required: true },
    isInStock: { type: Boolean, default: true, required: true }
})

const Cookie = mongoose.model('Cookie', cookieSchema);