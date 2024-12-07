const bcrypt = require("bcrypt");
const twilio = require("twilio");
const nodemailer = require("nodemailer");
const userModel = require("../../model/user");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = new twilio(accountSid, authToken);

// Password strength validation
const isValidPassword = (password) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
  return regex.test(password);
};

const userSignUpController = async (req, res) => {
  try {
    const { name, phoneOrEmail, password, dateOfBirth, gender, preferredGenders } = req.body;

    if (!name || !phoneOrEmail || !password || !dateOfBirth || !gender || !preferredGenders) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Please provide all required fields.",
      });
    }

    // Password validation
    if (!isValidPassword(password)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Password must be 8-20 characters long and contain at least one letter, one number, and one special character.",
      });
    }

    const existingUser = await userModel.findOne({ phoneOrEmail });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: true,
        message: "User already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    const userData = new userModel({
      name,
      phoneOrEmail,
      dateOfBirth,
      gender,
      preferredGenders,
      password: hashedPassword,
      role: "USER",
      verificationCode,
      otpExpires,
    });

    await userData.save();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(phoneOrEmail)) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_OF_LIBIN,
          pass: process.env.PASSWORD_OF_NODEMAILER,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_OF_LIBIN,
        to: phoneOrEmail,
        subject: "Email Verification",
        text: `Your verification code is: ${verificationCode}`,
      };

      try {
        await transporter.sendMail(mailOptions);
        return res.status(201).json({
          success: true,
          error: false,
          message: "User created successfully. Please check your email for the verification code.",
        });
      } catch (error) {
        console.error("Email Error: ", error);
        return res.status(500).json({
          success: false,
          error: true,
          message: "Error sending verification email.",
        });
      }
    } else if (/^\+\d{1,3}\d{10,15}$/.test(phoneOrEmail)) {
      try {
        await client.messages.create({
          body: `Your OTP is: ${verificationCode}`,
          from: "918289929846",
          to: phoneOrEmail,
        });

        return res.status(201).json({
          success: true,
          error: false,
          message: "User created successfully. Please check your phone for the OTP.",
        });
      } catch (error) {
        console.error("Twilio Error: ", error);
        return res.status(500).json({
          success: false,
          error: true,
          message: "Error sending OTP via SMS.",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid phone number or email format.",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
};

module.exports = userSignUpController;
