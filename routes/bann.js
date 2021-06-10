const express = require("express");
const router = express.Router();
const Controllers = require("./../controllers");
const { auth } = require("../lib/utils");

//create
router.post("/create", auth, Controllers.bann.create);

//read
router.get("/byUser/:id", auth, Controllers.bann.getByUser);
router.get("/byBranchOffice/:id", auth, Controllers.bann.byBranchOffice);

//update

//delete
router.delete("/delete/:id",auth, Controllers.bann.delete);

module.exports = router;