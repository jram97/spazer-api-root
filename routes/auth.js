const express = require("express");
const router = express.Router();
const util= require("../lib/utils");
const authController = require("../controllers/auth");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/sendEmailPass", util.limitApi ,authController.enviarCodigoCambioContrasena);
router.post("/verifyCodePass", authController.recibirCodigoCambioContrasena);
router.post("/sendVerifyNumber", util.limitApi ,authController.enviarVerifyPhoneNumber);
router.post("/verifyNumber", util.limitApi ,authController.verifyPhoneNumber);


module.exports = router