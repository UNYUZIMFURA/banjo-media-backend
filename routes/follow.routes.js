const express = require("express")
const { verifyToken } = require("../middlewares/auth.middleware")
const { followUser, unfollowUser } = require("../controllers/follow.controller")
const router = express.Router()

router.post("/follow/:id", verifyToken, followUser)
router.delete("/unfollow/:id", verifyToken, unfollowUser)

module.exports = router