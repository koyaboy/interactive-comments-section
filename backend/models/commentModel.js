const mongoose = require("mongoose")
const User = require("./userModel")
const Reply = require("./replyModel")

const Schema = mongoose.Schema

const commentSchema = new Schema({
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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Reply
    }]
})

module.exports = mongoose.model("Comment", commentSchema)