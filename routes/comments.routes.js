const express = require("express");
const {
  addComment,
  getComments,
  deleteComment,
  updateComment,
} = require("../controllers/comments.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/comments", getComments);
router.post("/comments", verifyToken, addComment);
router.put("/comments/:id", verifyToken, updateComment);
router.delete("/comments", verifyToken, deleteComment);

module.exports = router;
