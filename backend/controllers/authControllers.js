const User = require("../models/user.js");
const generateTokenAndSetCookie = require("../utils/generateToken.js");
const bcrypt = require('bcryptjs');

async function handleLogin(req, res) {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send("Invalid username");
        } else {
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                return res.status(400).send("Invalid password");
            }
        }
        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        });
    } catch (err) {
        console.log("Error in login controller", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function handleSignup(req, res) {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
        if (password != confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }
        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ error: "username already exists" });
        }
        const boyProfile = `https://avatar-placeholder.iran.liara.run/public/boy?username=${username}`;
        const girlProfile = `https://avatar-placeholder.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullName: fullName,
            username: username,
            password: password,
            gender: gender,
            profilePic: gender == "male" ? boyProfile : girlProfile
        });

        if (newUser) {
        console.log("New user created:", newUser);
        generateTokenAndSetCookie(newUser._id, res);

            await newUser.save();

        res.status(201).json({

                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic
            });
        } else {
            res.status(400).json({ error: "Failed to create new user" });
        }
    } catch (err) {
        console.log("Error in signup controller", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function handleLogout(req, res) {
    try {
        res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
        res.status(200).json({ message: "Logged out successfully" });
    } catch(err) {
        console.log("Error in logout controller", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    handleLogin,
    handleSignup,
    handleLogout
};
