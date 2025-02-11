const express = require("express");
const {handleLogin, handleLogout, handleSignup} = require("../controllers/authControllers.js")

const router = express.Router();

router
    .post("/login", handleLogin )
    .post("/signup", handleSignup )
    .post("/logout", handleLogout )

module.exports = router;