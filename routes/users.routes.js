const express = require('express')
const {createUser, deleteUsers} = require("../controllers/users.controller")
const {login} = require("../controllers/auth.controller")
const router = express.Router()

router.post("/users", createUser)
router.delete("/users", deleteUsers)
router.post("/users/login", login)

module.exports = router