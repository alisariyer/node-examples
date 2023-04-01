const mongoose = require('mongoose');
const { Schema, model } = mongoose;

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/shopApp');
    console.log('Connection established');
}

main().catch(err => console.log('Error: ', err));

const productSchema = new Schema({
    name: { 
            type: String,
            required: true,
            maxLength: 20
        },
    price: { 
            type: Number,
            required: true,
            min: 0
         },
    onSale: {
            type: Boolean,
            default: false
    },
    categories: [String],
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    }
})

const Product = model('Product', productSchema);

// const bike = new Product({ name: 'Tire pump', price: 25, categories: ['Cycling'] });

// bike.save()
//     .then(data => console.log('Saved: ', data))
//     .catch(err => console.log('Error: ', err));

Product.findOneAndUpdate({ name: 'Tire pump'}, { price: -30}, { new: true, runValidators: true})
    .then(data => console.log(data))
    .catch(err => console.log(err));