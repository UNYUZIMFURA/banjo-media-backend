const express = require("express");
const { addComment, getComments, deleteComment } = require("../controllers/comments.controller");
const { verifyToken } = require("../middlewares/verifyToken");
const router = express.Router();

router.get("/comments", getComments)
router.post("/comments", verifyToken, addComment);
router.delete("/comments", verifyToken, deleteComment)

module.exports = router;
