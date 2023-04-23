const mongoose = require('mongoose');
// We do not need to connect db here, because we will require this file inside index.js file
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A proper value required!']
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['fruit', 'vegetable', 'dairy']
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;