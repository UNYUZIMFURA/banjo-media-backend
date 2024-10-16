const express = require("express");
const router = express.Router();
const {
  createUser,
  deleteUsers,
  getUsers,
  resetPassword,
} = require("../controllers/users.controller");
const { login } = require("../controllers/auth.controller");
const { verifyCode, sendCodeToResetEmail } = require("../controllers/verification-codes.controller");

router.post("/users/login", login);
router.get("/users", getUsers);
router.post("/users", createUser);
router.delete("/users", deleteUsers);
router.post("/codes/verify", verifyCode)
router.post("/reset-password/email", sendCodeToResetEmail)
router.post("/reset-password", resetPassword)


module.exports = router;
