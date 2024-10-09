const express = require("express");
const router = express.Router();
const { createPost, getPosts, deletePost, updatePost } = require("../controllers/posts.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.get("/posts", getPosts)
router.post("/posts", verifyToken, createPost);
router.put("/posts/:id", verifyToken, updatePost)
router.delete("/posts/:id", verifyToken, deletePost)

module.exports = router;
