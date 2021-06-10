const express = require("express");
const router = express.Router();
const Controllers = require("./../controllers");
const { auth } = require("../lib/utils");

//create
router.post("/create", auth, Controllers.slot.create);

//update
router.put("/update", auth, Controllers.slot.update);

//read
router.get("/getAll", auth, Controllers.slot.getAll);
router.get("/:_id", auth, Controllers.slot.getById);
router.get("/byBranchOffice/:id", auth, Controllers.slot.getByBranchOffice);

//delete
router.post("/:_id/changeState", auth, Controllers.slot.deactivate);

module.exports = router;