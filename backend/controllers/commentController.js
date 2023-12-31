const Comment = require("../models/commentModel")

const mongoose = require("mongoose")


//GET ALL COMMENTS
const getAllComments = async (req, res) => {
    const comments = await Comment.find({})
        .sort({ score: -1 })
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
    const { newComment } = req.body
    console.log("Request Body:", req.body);
    console.log(newComment)
    const { commentId } = req.params

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
        return res.status(404).json({ error: "No such Comment" })
    }

    try {
        const comment = await Comment.findOneAndUpdate(
            { _id: commentId },
            { content: newComment },
            { new: true }
        )

        if (!comment) {
            return res.status(404).json({ error: "No such Comment" })
        }

        res.status(200).json(comment)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//UPVOTE COMMENT
const upvoteComment = async (req, res) => {
    const { commentId } = req.params

    const comment = await Comment.findById({ _id: commentId })

    if (!comment) {
        res.status(400).json({ error: "No such Comment" })
    }

    comment.score += 1

    await comment.save()

    res.status(200).json(comment)
}

//DOWNVOTE COMMENT
const downvoteComment = async (req, res) => {
    const { commentId } = req.params

    const comment = await Comment.findById({ _id: commentId })

    if (!comment) {
        res.status(400).json({ error: "No such Comment" })
    }

    comment.score -= 1

    await comment.save()

    res.status(200).json(comment)
}

//DELETE COMMENT
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
    upvoteComment,
    downvoteComment,
    deleteComment
}