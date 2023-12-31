const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema({
    img: {
        type: String,
        // required: true
    },
    username: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("User", userSchema)