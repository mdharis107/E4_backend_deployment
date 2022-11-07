const express = require("express");
const { connection } = require("./config/db");
const { authentication } = require("./middleware/authentication");
const { todoController } = require("./routes/todo.route");
const { userController } = require("./routes/user.route");
require("dotenv").config()

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 8000

app.get("/", (req, res) => {
    res.send("THe link is working")
})

app.use("/user", userController)

app.use(authentication)

app.use("/todo",todoController)

app.listen(PORT, async () => {
    try {
        await connection
        console.log("connected to db Successfully")
    }
    catch (err) {
        console.log("Error connecting to DB")
        console.log(err)
    }
    console.log(`The port is listening in ${PORT}`)
})