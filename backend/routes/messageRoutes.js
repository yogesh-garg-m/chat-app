const express = require("express");
const {handleSendMessage, handleRecieveMessage } = require("../controllers/messageControllers.js");
const protectRoute = require("../middlewares/protectRoute.js")

const router = express.Router();

router.post("/send/:id", protectRoute, handleSendMessage);
router.get("/:id", protectRoute, handleRecieveMessage);

module.exports = router;