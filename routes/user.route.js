const { Router } = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require("../models/user.model");
require("dotenv").config()

const userController = Router();

//SIGNUP

userController.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    bcrypt.hash(password, 5, async function (err, hash) {
        if (err) {
            res.send("Something went wrong Please try again")
        }
        const user = new UserModel({
            email,
            password:hash,
            IP: req.ip
        })
        try {
            await user.save()
            res.send({ "msg": "Signup Successful" })
        } catch (err) {
            console.log(err)
            res.send({ "msg": "Try again after sometime" })
        }
    });
})

//LOGIN

userController.post("/login", async(req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email })
    const hashed_password = user.password;

    bcrypt.compare(password, hashed_password, function (err, result) {
        if (err) {
            res.send("Something went wrong, Please try again")
        }
        if (result) {
            const token = jwt.sign({ userId: user._id }, process.env.PRIVATE_KEY);
            res.send({"msg":"Login Successful",token:token})
        }
        else{
            res.send({"msg":"Invalid credentials please Login again"})
        }

    })

})


module.exports = { userController }