const express = require("express");
const router = express.Router();
const Controllers = require("./../controllers");
const { auth } = require("../lib/utils");

//create
router.post("/create", auth, Controllers.booking.create);

//update
router.put("/concretar", auth, Controllers.booking.concretar);

//read
router.post("/getSlot", auth, Controllers.booking.getAvailableSlot);
router.get("/getAll", auth, Controllers.booking.getAll);
router.get("/getByMonth", auth, Controllers.booking.getAllByMonth);
router.get("/getAllByUser/:_id", auth, Controllers.booking.getAllByUserId);
router.get("/getAllByBranchOffice/:_id", Controllers.booking.getAllByBranchOfficeId);

router.get("/getByUserHistory/:_id", auth, Controllers.booking.getByUserIdHistory);
router.get("/getByUserPending/:_id", auth, Controllers.booking.getByUserIdPending);

router.get("/getByBOHistory/:_id", auth, Controllers.booking.getByBranchOfficeHistory);
router.get("/getByBOPending/:_id", auth, Controllers.booking.getByBranchOfficePending);

router.get("/:_id", auth, Controllers.booking.getById);

//delete
//router.delete("/:_id/delete", auth, Controllers.feature.delete);
//router.post("/:_id/changeState", auth, Controllers.schedule.changeState);

module.exports = router;