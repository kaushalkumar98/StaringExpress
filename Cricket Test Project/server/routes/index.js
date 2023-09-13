const express = require("express");
const {
  createData,
  findByName,
  editById,
  findByid,
} = require("../controllers");
const router = express.Router();

router.route("/").post(createData);
router.route("/search").post(findByName);
router.route("/:id").get(findByid);
router.route("/:id").put(editById);

module.exports = router;
