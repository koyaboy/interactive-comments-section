const mongoose = require("mongoose")
const User = require("./userModel")

const Schema = mongoose.Schema

const replySchema = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    replyingTo: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
})

module.exports = mongoose.model("Reply", replySchema)