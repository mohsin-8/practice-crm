const express = require("express");
const { CreateTags, GetTags, DeleteTagsById } = require("../controllers/tagsController");

const router = express.Router();

router.post("/create/tag", CreateTags);
router.get("/get/tag", GetTags);

module.exports = router;