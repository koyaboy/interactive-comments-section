const express = require("express")

const {
    replyComment,
    editReply,
    upvoteReply,
    downvoteReply,
    deleteReply
} = require("../controllers/replyController")

const router = express.Router()

router.post("/:commentId", replyComment)
router.patch("/:replyId", editReply)
router.patch("/upvote/:replyId", upvoteReply)
router.patch("/downvote/:replyId", downvoteReply)
router.delete("/:replyId", deleteReply)


module.exports = router