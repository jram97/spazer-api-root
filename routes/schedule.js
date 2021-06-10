const express = require("express");
const router = express.Router();
const Controllers = require("./../controllers");
const { auth } = require("../lib/utils");

//create
router.post("/create", auth, Controllers.schedule.create);

//update
router.put("/update", auth, Controllers.schedule.update);

//read
router.get("/getAll", auth, Controllers.schedule.getAll);
router.get("/:_id", auth, Controllers.schedule.getById);

//delete
router.delete("/:_id/delete", auth, Controllers.schedule.delete);
router.post("/:_id/changeState", auth, Controllers.schedule.changeState);

module.exports = router;