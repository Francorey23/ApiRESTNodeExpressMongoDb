const { mongo } = require("mongoose");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    imageUrl: {   
        type: String,
        required: false
    }
});

module.exports = mongoose.model('User', userSchema);
