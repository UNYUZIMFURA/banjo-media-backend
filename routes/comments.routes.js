const express = require("express");
const { addComment } = require("../controllers/comments.controller");
const { verifyToken } = require("../middlewares/verifyToken");
const router = express.Router();

router.post("/comments", verifyToken, addComment);

module.exports = router;
