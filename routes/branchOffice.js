const express = require("express");
const router = express.Router();
const Controllers = require("./../controllers");
const { auth } = require("../lib/utils");
var multer = require('multer');

const uuid = require("uuid").v4;
const path = require('path');

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, req.body.name + uuid() + Date.now() + path.extname(file.originalname))
    }
});

const uploads = multer({ storage });

//create
router.route("/create").post(uploads.fields([
    { name: "images", maxCount: 10 }
]), Controllers.branchOffice.create);

router.post("/probarImagenes", uploads.array('images'), Controllers.branchOffice.probarImagenes);

//update
router.put("/update", auth, Controllers.branchOffice.update);
router.post("/addUser", auth, Controllers.branchOffice.addUser);
router.post("/addSlot", auth, Controllers.branchOffice.addSlot);

//read
router.get("/getAll", auth, Controllers.branchOffice.getAll);
router.get("/:_id", auth, Controllers.branchOffice.getById);
router.get("/getByCategory/:_id", auth, Controllers.branchOffice.getByCategoryId);

//delete
router.post("/:_id/changeState", auth, Controllers.branchOffice.deactivate);

module.exports = router;