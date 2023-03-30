const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test')

async function main() {
    await mongoose.connect('mongodb://localhost:27017/test');
    console.log('Connection established!');
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

main().catch(err => console.log(err));