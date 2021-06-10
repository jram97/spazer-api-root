const express = require("express");
const router = express.Router();
const Controllers = require("./../controllers");
const { auth } = require("../lib/utils");

//create
router.post("/create", auth, Controllers.role.create);

//update
//router.post("/update", auth, Controllers.feature.update);

//read
router.get("/getAll", auth, Controllers.role.getAll);
//router.get("/:_id", auth, Controllers.feature.getById);
//router.get("/getByCategory/:_id", Controllers.feature.getByCategoryId);

//delete
//router.delete("/:_id/delete", auth, Controllers.feature.delete);
//router.post("/:_id/changeState", auth, Controllers.schedule.changeState);

module.exports = router;