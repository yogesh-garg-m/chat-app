const express = require("express");
const { getUsersForSidebar } = require("../controllers/userControllers.js");
const protectRoute = require("../middlewares/protectRoute.js")

const router = express.Router();

router.get("/", protectRoute,  getUsersForSidebar);

module.exports = router;