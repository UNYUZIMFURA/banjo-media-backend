const express = require("express");
const router = express.Router();
const { createPost } = require("../controllers/posts.controller");
const { verifyToken } = require("../middlewares/verifyToken");

router.post("/posts", verifyToken, createPost);

module.exports = router;
