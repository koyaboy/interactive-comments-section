const Comment = require("../models/commentModel")

const mongoose = require("mongoose")


//GET ALL COMMENTS
const getAllComments = async (req, res) => {
    const comments = await Comment.find({})
        .sort({ createdAt: 1 })
        .populate({
            path: 'replies',
            populate: {
                path: 'user',
                model: 'User'
            }
        })
        .populate('user');

    res.status(200).json(comments)
}

//POST A COMMENT
const postComment = async (req, res) => {
    const { content, createdAt, score, user } = req.body
    const replies = []

    //add doc to db
    try {
        const comment = await Comment.create({
            content, createdAt, score, user, replies
        })
        res.status(200).json(comment)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//EDIT COMMENT
const editComment = async (req, res) => {
    const { content } = req.body
    const { commentId } = req.params

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
        return res.status(404).json({ error: "No such Comment" })
    }

    try {
        const comment = await Comment.findOneAndUpdate({ _id: commentId }, {
            content
        }, { new: true })

        if (!comment) {
            return res.status(404).json({ error: "No such Comment" })
        }

        res.status(200).json(comment)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteComment = async (req, res) => {
    const { commentId } = req.params

    const comment = await Comment.findOneAndDelete({ _id: commentId })

    if (!comment) {
        return res.status(404).json({ error: "No such Comment" })
    }

    res.status(200).json(comment)
}
module.exports = {
    getAllComments,
    postComment,
    editComment,
    deleteComment
}