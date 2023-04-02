const mongoose = require('mongoose');

async function main () {
    await mongoose.connect('mongodb://127.0.0.1/shopApp');
    console.log('Connected to DB');
}

main().catch(e => console.log(e));

const personSchema = mongoose.Schema({
    first: String,
    last: String
});

personSchema.virtual('fullName')
    .get(function () {
        return `${this.first} ${this.last}`;
    });

personSchema.pre('save', async function() {
    this.first = 'Another';
    this.last = 'Person';
    console.log('About to save!!!');
});

personSchema.post('save', async function() {
    console.log('Just saved!!!');
});

const Person = mongoose.model('Person', personSchema);

