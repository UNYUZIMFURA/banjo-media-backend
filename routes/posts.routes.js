const express = require("express");
const router = express.Router();
const { createPost, getPosts } = require("../controllers/posts.controller");
const { verifyToken } = require("../middlewares/verifyToken");

router.get("/posts", getPosts)
router.post("/posts", verifyToken, createPost);

module.exports = router;
