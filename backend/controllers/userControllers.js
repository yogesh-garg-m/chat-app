const User = require("../models/user.js")

async function getUsersForSidebar(req, res) {
    try{
        const loggedInUserId = req.user._id;
        const allUsers = await User.find({_id : { $ne: loggedInUserId }}).select("-password").select("-salt");
        res.status(200).json(allUsers);
    }
    catch (err){
        console.log("Error in getUsersForSidebar controller ", err);
        res.status(500).json({ error: "Internal server error"});
    }
}

module.exports = {
    getUsersForSidebar
}