const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user: { type: String, required: true },
    text: { type: String, required: true },
    score: { type: Number, default: 5 }
}, { timestamps: true });

const postSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true
    },
    images: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    comment: [commentSchema]
}, {
    timestamps: true
})



module.exports = mongoose.model("Posts", postSchema)