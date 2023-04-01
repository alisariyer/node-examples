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
            min: [0, 'Price must be positive!']
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
    },
    size: {
        type: String,
        enum: ['XS', 'S', 'M', 'L', 'XL']
    }
})

// const Product = model('Product', productSchema);

// const bike = new Product({ name: 'Cycling Jersey', price: 45, categories: ['Cycling'], size: 'XS' });

// bike.save()
//     .then(data => console.log('Saved: ', data))
//     .catch(err => console.log('Error: ', err.errors));

// Product.findOneAndUpdate({ name: 'Tire pump'}, { price: -30}, { new: true, runValidators: true})
//     .then(data => console.log(data))
//     .catch(err => console.log(err.errors.price.properties.message));

// productSchema.methods.greet = function () {
//     console.log('Hellooooo');
//     console.log(` from ${this.name}`)
// }

productSchema.methods.toggleOnSale = function () {
    this.onSale = !this.onSale;
    return this.save();
}

productSchema.methods.addCategory = function(newCategory) {
    this.categories.push(newCategory);
    return this.save();
}

productSchema.statics.fireSale = function() {
    return this.updateMany({}, { onSale: true, price: 0});
}

const Product = model('Product', productSchema);

const findProduct = async () => {
    const foundProduct = await Product.findOne({ name: 'Mountain bike'});
    // foundProduct.greet();
    console.log(foundProduct);
    await foundProduct.toggleOnSale();
    console.log(foundProduct);
    await foundProduct.addCategory('Outdoors');
    console.log(foundProduct);
}

// findProduct();

Product.fireSale().then(data => console.log(data));