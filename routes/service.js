const express = require("express");
const router = express.Router();
const Controllers = require("./../controllers");
const { auth } = require("../lib/utils");

//create
router.post("/create", Controllers.service.create);

//update
router.put("/update", auth, Controllers.service.update);

//read
router.get("/getAll", auth, Controllers.service.getAll);
//router.get("/:_id", auth, Controllers.feature.getById);
router.get("/getByBranchOffice/:id", auth, Controllers.service.getByBranchOfficeId);

//delete
//router.delete("/:_id/delete", auth, Controllers.feature.delete);
//router.post("/:_id/changeState", auth, Controllers.schedule.changeState);

module.exports = router;