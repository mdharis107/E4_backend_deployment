const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    userId: { type:String, required: true},
    taskname: { type: String, required: true },
    status: { type: String, required: true },
    tag:{type:String, required: true }
})

const TodoModel = mongoose.model("todo", todoSchema)

module.exports = { TodoModel }