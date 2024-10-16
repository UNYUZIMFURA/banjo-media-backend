const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const { sendCodeToEmail } = require("../services/email.service");

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

    await sendCodeToEmail(email, res, user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error creating user",
      err,
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
    console.log(err);
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
      err,
    });
  }
};

const resetPassword = async (req, res) => {
  const { password, userId } = req.body;

  if (!password || !userId) {
    return res.status(400).json({
      success: false,
      message: "Enter your new password and userId",
    });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId
      }
    })

    if(!user) {
      return res.status(400).json({
        success: false,
        message: "User not found!"
      })
    }

    if(!user.resetPasswordFlag) {
       return res.status(401).json({
        success: false,
        message: "Verify your email first!"
       })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashedPassword
      },
    });

    return res.status(200).json({
      success: true,
      message: "Updated your password!",
    });
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      message: "Error resetting password",
      err
    });
  }
};

module.exports = {
  createUser,
  getUsers,
  deleteUsers,
  resetPassword,
};
