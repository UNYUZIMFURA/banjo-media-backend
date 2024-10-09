const express = require("express");
const { addComment, getComments } = require("../controllers/comments.controller");
const { verifyToken } = require("../middlewares/verifyToken");
const router = express.Router();

router.get("/comments", getComments)
router.post("/comments", verifyToken, addComment);

module.exports = router;
