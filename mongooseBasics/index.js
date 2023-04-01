const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test')
const { Schema, model } = mongoose;

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
    console.log('Connection established!');
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

main().catch(err => console.log(err));

const movieSchema = new Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
});

const Movie = model('Movie', movieSchema);

// const avatar = new Movie({ title: 'Avatar', year: 2022, score: 7.8, rating: "R" })

// Movie.insertMany([
//     { title: "Mission Impossible 10", year: 2025, score: 9.0, rating: "R"},
//     { title: "Superman returns", year: 2024, score: 7.0, rating: "R"},
//     { title: "The king was there", year: 2024, score: 6.3, rating: "R"},
//     { title: "Scare of the night", year: 2022, score: 7.1, rating: "R"},
// ])
// .then(data => {
//     console.log('Worked: ', data);
// })