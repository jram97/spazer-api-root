const express = require("express");
const router = express.Router();
const Controllers = require("./../controllers");
const { auth } = require("../lib/utils");

//create
router.post("/create", auth, Controllers.company.create);

//update
router.put("/update", auth, Controllers.company.update);
router.post("/addBranchOffice", auth, Controllers.company.addBranchOffice);

//read
router.get("/getAll", auth, Controllers.company.getAll);
router.get("/:_id", auth, Controllers.company.getById);

//delete
router.post("/:_id/changeState", auth, Controllers.company.deactivate);

module.exports = router;