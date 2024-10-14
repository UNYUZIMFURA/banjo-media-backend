const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendOtpToEmail } = require("../services/email.service");

const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Enter all user fields",
    });
  }

  try {
    const userExists = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "An account with that email or username already exists!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    await sendOtpToEmail(email, res, user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error creating user",
      err
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        posts: true,
        comments: true,
        followers: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Fetched users",
      users,
    });
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      message: "Error fetching users",
      err,
    });
  }
};

const deleteUsers = async (req, res) => {
  try {
    await prisma.user.deleteMany();
    return res.status(204).json({});
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error creating user",
      err
    });
  }
};

const verifyOtp = async (req, res) => {
  let { userId, otp } = req.body;

  if (!otp) {
    return res.status(400).json({
      success: false,
      message: "Please provide OTP code",
    });
  }

  try {
    const originalOtp = await prisma.otp.findFirst({
      where: {
        userId,
      },
    });

    if (!originalOtp) {
      return res.status(404).json({
        success: false,
        message: "The user didn't receive an OTP code",
      });
    }

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (originalOtp.otp === otp) {
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET
      );

      return res.status(200).json({
        success: true,
        message: "Email successfully verified",
        user,
        token,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Incorrect verification code",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error verifying otp",
      err
    });
  }
};

module.exports = { createUser, getUsers, deleteUsers, verifyOtp };
