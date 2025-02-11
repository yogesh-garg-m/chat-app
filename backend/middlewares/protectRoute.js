const jwt = require("jsonwebtoken");
const User = require("../models/user.js");


const protectRoute = async (req, res, next )=>{
    try{
        const token = req.cookies.token;
        if(!token) {
            return res.status(401).json({error : "Unauthorised - No Token Provided "});
        }
        const decoded = jwt.verify(token,process.env.SECRET_KEY);

        if(!decoded){
            return res.status(401).json({error : "Unauthorised - Invalid Token "});
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user) {
            return res.status(401).json({error : "Invalid User"});
        }

        req.user = user;

        next();
    }
    catch(err){
        console.log("Error in protected route ", err.message);
        res.status(500).json({error: "Internal Server Error in protectRoute"});
    }
}

module.exports = protectRoute;