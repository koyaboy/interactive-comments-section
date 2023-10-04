require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")

const commentRoutes = require("./routes/comments")
const replyRoutes = require("./routes/replies")

const app = express()

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
})

app.use('/comments', commentRoutes)
app.use('/reply', replyRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("connected to db & listening on port ", process.env.PORT);
        })
    })
    .catch((error) => {
        console.log(error);
    })











