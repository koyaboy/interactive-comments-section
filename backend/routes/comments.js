const express = require("express")

const {
    postComment,
    editComment,
    deleteComment
} = require("../controllers/commentController")


const router = express.Router()


router.post("/", postComment)
router.patch("/:commentId", editComment)
router.delete("/:commentId", deleteComment)

module.exports = router