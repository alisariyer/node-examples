const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/product');

const main = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/farmStand');
};

main()
    .then(msg => console.log('Connection open'))
    .catch(err => console.log('DB Error: ', err));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('Homepage');
});

app.get('/products', async (req, res) => {
    const products = await Product.find({});
    console.log(products);
    res.render('products/index', { products });
});

app.get('/products/new', (req, res) => {
    res.render('products/new');
});

app.post('/products', async (req, res) => {
    const { name, price, category } = req.body;
    const newProduct = new Product({ name: name, price: price, category: category});
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    console.log(product);
    res.render('products/detail', { product });
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
});