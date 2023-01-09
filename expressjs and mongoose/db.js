const { Schema, default: mongoose } = require("mongoose");
mongoose.set('strictQuery', false);

async function connectDB() {
    await mongoose.connect('mongodb://localhost:27017/vengatesan');
}
/* Movie Schema */
const movies_list = new Schema({
    movieName: {
        type: String,
        required: true
    },
    actour: {
        type: String,
        required: true
    },
    villan: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Number,
        min: 2000,
        max: 2022,
        required: true

    }
})
/* User Schema */
const user = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports.user_details = mongoose.model('userdetails', user);
module.exports.movie_schema = mongoose.model('movies_lists', movies_list);

module.exports.mongoose = connectDB
