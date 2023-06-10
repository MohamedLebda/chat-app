const express = require("express");
const controller = require("./../Controllers/profileController");

const router = express.Router();

router.get("/profile", controller.profile);

module.exports = router;
