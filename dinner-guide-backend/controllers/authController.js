const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { sendVerificationEmail } = require("../services/emailService");

const JWT_SECRET = process.env.JWT_SECRET || "dinner-guide-secret-key-2024";

// Generate verification code
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Register new user
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields!" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    // Generate verification code
    const verificationCode = generateVerificationCode();
    const verificationCodeExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    // Create unverified user
    const newUser = await User.create({ 
      username, 
      email, 
      password,
      verificationCode,
      verificationCodeExpires,
      isVerified: false
    });

    // Send verification email
    const emailSent = await sendVerificationEmail(email, verificationCode);

    if (!emailSent) {
      return res.status(201).json({ 
        message: "Account created but verification email failed to send. Please contact support.",
        requiresVerification: true
      });
    }

    res.status(201).json({ 
      message: "Please check your email for the verification code.",
      requiresVerification: true
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error!" });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill in all fields!" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    // Check if user is verified
    if (!user.isVerified) {
      // Generate new verification code if needed
      const verificationCode = generateVerificationCode();
      const verificationCodeExpires = new Date(Date.now() + 15 * 60 * 1000);
      
      user.verificationCode = verificationCode;
      user.verificationCodeExpires = verificationCodeExpires;
      await user.save();
      
      await sendVerificationEmail(email, verificationCode);
      
      return res.status(401).json({
        message: "Please verify your email. A new verification code has been sent.",
        requiresVerification: true
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      message: "Login successful!",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error!" });
  }
};

// Verify email
exports.verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "Email already verified!" });
    }

    if (!user.verificationCode || !user.verificationCodeExpires) {
      return res.status(400).json({ message: "No verification code found!" });
    }

    if (Date.now() > user.verificationCodeExpires) {
      // Generate new code if expired
      const newCode = generateVerificationCode();
      const newExpiry = new Date(Date.now() + 15 * 60 * 1000);
      
      user.verificationCode = newCode;
      user.verificationCodeExpires = newExpiry;
      await user.save();
      
      await sendVerificationEmail(email, newCode);
      
      return res.status(400).json({ 
        message: "Verification code expired. A new code has been sent to your email." 
      });
    }

    if (user.verificationCode !== code) {
      return res.status(400).json({ message: "Invalid verification code!" });
    }

    // Verify user
    user.isVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpires = null;
    await user.save();

    res.json({ message: "Email verified successfully!" });
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ message: "Server error!" });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const { username, email, address, phone, city, country, newPassword, currentPassword } = req.body;
    
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    // If changing password, verify current password
    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ message: "Current password is required!" });
      }

      const isPasswordValid = await user.comparePassword(currentPassword);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Current password is incorrect!" });
      }

      user.password = newPassword;
    }

    // Update other fields
    if (username) user.username = username;
    if (email) user.email = email;
    if (address) user.address = address;
    if (phone) user.phone = phone;
    if (city) user.city = city;
    if (country) user.country = country;

    await user.save();

    res.json({ 
      message: "Profile updated successfully!",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        address: user.address,
        phone: user.phone,
        city: user.city,
        country: user.country,
        role: user.role,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Server error!" });
  }
}; 