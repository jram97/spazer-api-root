const express = require("express");
const router = express.Router();
const Controllers = require("./../controllers");
const { auth } = require("../lib/utils");

//create
router.post("/create", Controllers.businessCategory.create);

//update
router.put("/update", auth, Controllers.businessCategory.update);
router.post("/addFeature", Controllers.businessCategory.addFeature);
router.post("/addService", Controllers.businessCategory.addService);

//read
router.get("/getAll",Controllers.businessCategory.getAll);
router.get("/getAllActive", Controllers.businessCategory.getAllActive);
router.get("/:_id", Controllers.businessCategory.getById);

//delete
router.post("/:_id/changeState", auth, Controllers.businessCategory.changeState);

module.exports = router;