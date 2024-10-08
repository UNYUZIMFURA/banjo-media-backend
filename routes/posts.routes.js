const express = require("express");
const router = express.Router();
const { createPost, getPosts, deletePost } = require("../controllers/posts.controller");
const { verifyToken } = require("../middlewares/verifyToken");

router.get("/posts", getPosts)
router.post("/posts", verifyToken, createPost);
router.delete("/posts/:id", verifyToken, deletePost)

module.exports = router;
