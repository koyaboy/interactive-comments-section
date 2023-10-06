const User = require("../models/userModel")

//FETCH USER
const fetchUser = async (req, res) => {
    const { username } = req.params

    const user = await User.findOne({ username: username })

    if (!user) {
        res.status(400).json({ error: "No such User" })
    }

    res.status(200).json(user)
}



module.exports = {
    fetchUser
}