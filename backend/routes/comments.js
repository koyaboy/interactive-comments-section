const express = require("express")

// const {
//     createWorkout,
//     getWorkouts,
//     getWorkout,
//     deleteWorkout,
//     updateWorkout
// } = require("../controllers/workoutController")

const router = express.Router()

router.post("/", async (req, res) => {
    res.json({ msg: "POST A COMMENT" })
})

router.post("/:commentId/reply", async (req, res) => {
    res.json({ msg: "REPLY A COMMENT" })
})

router.patch("/:commentId", async (req, res) => {
    res.json({ msg: "EDIT A COMMENT" })
})

router.delete("/:commentId", async (req, res) => {
    res.json({ msg: "DELETE A COMMENT" })
})


module.exports = router