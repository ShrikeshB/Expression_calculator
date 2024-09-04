const express = require("express");
const authController = require("../Controller/authController");
const router = express.Router();

router.post("/register", authController.signup);
router.post("/login",authController.login)
router.get("/getUserIdViaEmail/:email",authController.getUserIdViaEmail)

module.exports = router;
