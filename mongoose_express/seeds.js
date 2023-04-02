const mongoose = require('mongoose');
const Product = require('./models/product');

const main = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/farmStand');
};

main()
    .then(msg => console.log('Connection open'))
    .catch(err => console.log('DB Error: ', err));

// const p = new Product({
//     name: 'Ruby Grapefruit',
//     price: 1.99,
//     category: 'fruit'
// });

// p.save().then(p => console.log(p)).catch(e => console.log(e));

const seedProducts = [
    {
        name: 'Fairy Eggplant',
        price: 1.00,
        category: 'vegetable'
    },
    {
        name: 'Organic Goddess Melon',
        price: 4.99,
        category: 'fruit'
    },
    {
        name: 'Organic Mini Seedless Watermelon',
        price: 3.99,
        category: 'fruit'
    }
];

Product.insertMany(seedProducts)
    .then(res => console.log(res))
    .catch(err => console.log(err));