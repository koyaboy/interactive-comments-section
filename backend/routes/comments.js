const express = require("express")

const {
    getAllComments,
    postComment,
    editComment,
    deleteComment
} = require("../controllers/commentController")


const router = express.Router()

router.get("/", getAllComments)
router.post("/", postComment)
router.patch("/:commentId", editComment)
router.delete("/:commentId", deleteComment)

module.exports = router