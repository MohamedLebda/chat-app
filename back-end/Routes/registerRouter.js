const express = require("express");
const controller = require("./../Controllers/registerController");

const router = express.Router();

router.post("/register", controller.register);

module.exports = router;
