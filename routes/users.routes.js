const express = require('express')
const router = express.Router()
const {createUser, deleteUsers, getUsers} = require("../controllers/users.controller")
const {login} = require("../controllers/auth.controller")

router.post("/users/login", login)
router.get("/users", getUsers)
router.post("/users", createUser)
router.delete("/users", deleteUsers)

module.exports = router