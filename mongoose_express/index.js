const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

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
app.use(methodOverride('_method'));

const categories = ['fruit', 'vegetable', 'dairy'];

app.get('/', (req, res) => {
    res.send('Homepage');
});

app.get('/products', async (req, res) => {
    const { category } = req.query;
    let products;
    if (category) {
        products = await Product.find({ category: category });
        res.render('products/index', { products, category });
    } else {
        products = await Product.find({});
        res.render('products/index', { products, category : "All"});
    }
});

app.get('/products/new', (req, res) => {
    res.render('products/new', { categories });
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
    res.render('products/detail', { product });
});

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product, categories })
});

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true});
    res.redirect(`/products/${product._id}`)
});

app.delete('/products/:id', async (req, res) => {
    const { id } = req. params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
});