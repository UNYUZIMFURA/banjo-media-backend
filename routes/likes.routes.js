const express = require("express")
const { likePost, unlikePost } = require("../controllers/likes.controller")
const { verifyToken } = require("../middlewares/auth.middleware")
const router = express.Router()

router.post('/like/:id',verifyToken, likePost)
router.delete("/unlike/:id",verifyToken, unlikePost)

module.exports = router