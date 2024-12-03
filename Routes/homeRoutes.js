const express = require("express");
const router = express.Router();
const { home } = require("../Controller/homeController");
const authMiddleware = require("../Middleware/authMiddleware");

router.get("/", authMiddleware, home);

module.exports = router;
