const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 25
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true
    },
    admin: {
        type: Number,
        default: 0
    },
    fav: {
        type: Array,
        default: []
    },
    avatar: {
        type: String,
        default: "https://i.pravatar.cc/300"
    }
}, { timesStamps: true })




module.exports = mongoose.model("Users", userSchema)