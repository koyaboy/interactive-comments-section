require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors');

const commentRoutes = require("./routes/comments")
const replyRoutes = require("./routes/replies")
const userRoutes = require("./routes/users")

const app = express()

//middleware
app.use(cors())

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
})

app.use('/users', userRoutes)
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


app.get("/", (req, res) => {
    res.json("Hello");
})










