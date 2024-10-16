const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const nodemailer = require("nodemailer");
const { generateCode } = require("../utils/generateCode");

const sendCodeToEmail = async (email, res, user) => {
  try {
    const code = await generateCode();
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Banjo Media Code",
      text: `Your code is: ${code}`,
    };

    const expiresAt = new Date(Date.now() + 3600000);

    await prisma.code.create({
      data: {
        userId: user.id,
        code,
        expiresAt
      },
    });

    
    transporter.sendMail(mailOptions);
    return res.status(200).json({
      success: true,
      id: user.id,
      message: "Verification code sent to your Email!",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error sending code to email",
    });
  }
};

module.exports = { sendCodeToEmail };
