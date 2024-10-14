const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const nodemailer = require("nodemailer");
const { generateOtp } = require("../utils/generateOtp");

const sendOtpToEmail = async (email, res, user) => {
  try {
    const otp = await generateOtp();
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
      subject: "Banjo Media OTP Code",
      text: `Your OTP code is: ${otp}`,
    };

    await prisma.otp.create({
      data: {
        userId: user.id,
        otp,
        expiresAt: Date.now + 3600000,
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
      message: "Error sending OTP to email",
    });
  }
};

module.exports = { sendOtpToEmail };
