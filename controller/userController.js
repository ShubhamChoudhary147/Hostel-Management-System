const expressAsyncHandler = require("express-async-handler");
const User = require("../models/user")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports.registerUser = expressAsyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400)
        throw new Error("User already register")
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username, email, password: hashPassword,
    })
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email });
    } else {
        res.status(400)
        throw new Error("User Data is not valid")
    }
})

module.exports.loginUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },
        },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );
        res.status(201).json({ accessToken });
    } else {
        res.status(401);
        throw new Error("Password is not valid")
    }
})

module.exports.currentUser = expressAsyncHandler(async (req, res) => {
    res.json(req.user);
})