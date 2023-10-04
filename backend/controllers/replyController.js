const Comment = require("../models/commentModel")
const Reply = require("../models/replyModel")

const mongoose = require("mongoose")

//POST A REPLY
const replyComment = async (req, res) => {
    const { content, createdAt, score, user } = req.body
    const { commentId } = req.params

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
        return res.status(404).json({ error: "No such Comment" })
    }

    //Find the comment, create the reply and add reply to comment
    try {
        const comment = await Comment.findById({ _id: commentId }).populate("user")

        const replyingTo = comment.user.username

        const reply = await Reply.create({
            content, createdAt, score, replyingTo, user
        })

        const replyId = reply._id

        comment.replies.push(replyId)

        await comment.save()

        res.status(200).json(reply)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//EDIT REPLY
const editReply = async (req, res) => {
    const { content } = req.body
    const { replyId } = req.params

    if (!mongoose.Types.ObjectId.isValid(replyId)) {
        return res.status(404).json({ error: "No such Reply" })
    }

    try {
        const reply = await Reply.findOneAndUpdate({ _id: replyId }, {
            content
        }, { new: true })

        if (!reply) {
            return res.status(404).json({ error: "No such Reply" })
        }

        res.status(200).json(reply)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteReply = async (req, res) => {
    const { replyId } = req.params

    const reply = await Reply.findOneAndDelete({ _id: replyId })

    if (!reply) {
        return res.status(404).json({ error: "No such Reply" })
    }

    res.status(200).json(reply)
}

module.exports = {
    replyComment,
    editReply,
    deleteReply
}