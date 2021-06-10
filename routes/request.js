const express = require("express");
const router = express.Router();
const Controllers = require("./../controllers");
const { auth } = require("../lib/utils");
var multer = require('multer')

const uuid = require("uuid").v4;
const path = require('path');

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, req.body.companyName + uuid() + Date.now() + path.extname(file.originalname))
    }
});

var uploads = multer({ storage });

//create
router.route("/create").post(uploads.fields([
    { name: "images", maxCount: 10 }
]), Controllers.request.create)

//update
router.post("/update", auth, Controllers.request.update);
router.post("/accept", auth, Controllers.request.acceptRequest);

//read
router.get("/getAll", auth, Controllers.request.getAll);
router.get("/:_id", auth, Controllers.request.getById);

//delete
router.delete("/:_id/delete", auth, Controllers.request.delete);
router.post("/:_id/changeState", auth, Controllers.request.changeState);

module.exports = router;