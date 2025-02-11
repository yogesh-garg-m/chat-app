const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (userId, res)=>{
    const token = jwt.sign({userId }, process.env.SECRET_KEY, {expiresIn: "12h"});
    res.cookie("token", token, {httpOnly: true, maxAge: 43200000, sameSite: "strict"});
}

module.exports = generateTokenAndSetCookie;