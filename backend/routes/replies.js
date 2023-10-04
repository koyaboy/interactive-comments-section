const express = require("express")

const {
    replyComment,
    editReply,
    deleteReply
} = require("../controllers/replyController")

const router = express.Router()

router.post("/:commentId", replyComment)

router.patch("/:replyId", editReply)

router.delete("/:replyId", deleteReply)


module.exports = router