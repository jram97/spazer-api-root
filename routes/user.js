const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");
const { auth } = require("../lib/utils");

//create
//Estas rutas se encuentran en la autenticacion

//read
router.get("/getByEmail/:email", auth, Controllers.user.getByEmail);
router.get("/getById/:id", auth, Controllers.user.getById);
router.get("/verifyEmail/:email", Controllers.user.verifyEmail);

//update
router.post("/update", Controllers.user.update);
router.post("/changePicture", auth, Controllers.user.changeProfilePicture);
router.post("/:_id/changeState", auth, Controllers.user.changeState);
router.post("/addBann", Controllers.user.addBann);
router.post("/clean", Controllers.user.cleanBannHistory);
router.put("/addFirebaseToken", auth, Controllers.user.addFirebaseToken);
router.put("/deleteFirebaseToken", auth, Controllers.user.deleteFirebaseToken);
router.post("/notificar", auth, Controllers.user.notificar);

//delete

module.exports = router;
