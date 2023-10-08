const express = require("express")

const {
    getAllComments,
    postComment,
    editComment,
    upvoteComment,
    downvoteComment,
    deleteComment
} = require("../controllers/commentController")


const router = express.Router()

router.get("/", getAllComments)
router.post("/", postComment)
router.patch("/:commentId", editComment)
router.patch("/upvote/:commentId", upvoteComment)
router.patch("/downvote/:commentId", downvoteComment)
router.delete("/:commentId", deleteComment)

module.exports = router