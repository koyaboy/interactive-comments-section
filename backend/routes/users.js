const express = require("express")

const {
    fetchUser
} = require("../controllers/userController")

const router = express.Router()

//FETCH ACTIVE USER
router.get("/:username", fetchUser)


module.exports = router