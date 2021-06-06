const mongoose = require('mongoose');



const suggestBook = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("SuggestBook", suggestBook)