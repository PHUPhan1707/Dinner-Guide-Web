const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const router = express.Router();
const SECRET_KEY = "your_secret_key";

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser)
    return res.status(400).json({ message: "Email đã tồn tại!" });
  const newUser = await User.create({ username, email, password });
  res.status(201).json({ message: "Đăng ký thành công!" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) return res.status(400).json({ message: "Email không tồn tại!" });

  console.log("User từ DB:", user);
  console.log("Mật khẩu nhập:", password);
  console.log("Mật khẩu trong DB:", user.password);

  if (!user.password) {
    return res.status(500).json({ message: "Lỗi: Password bị null trong DB!" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(400).json({ message: "Mật khẩu không đúng!" });

  const token = jwt.sign(
    { id: user.id, email: user.email },
    "your_secret_key",
    { expiresIn: "1h" }
  );
  res.json({ token, username: user.username });
});

module.exports = router;
