const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const AuthController = {
  async register(req, res) {
    try {
      const { username, email, password } = req.body;

      const userExists = await User.findOne({ where: { email } });
      if (userExists)
        return res.status(400).json({ message: "Email đã tồn tại" });

      const newUser = await User.create({ username, email, password });
      res.status(201).json({ message: "Đăng ký thành công", user: newUser });
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user)
        return res.status(400).json({ message: "Sai email hoặc mật khẩu" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ message: "Sai email hoặc mật khẩu" });

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({
        token,
        user: { id: user.id, username: user.username, email: user.email },
      });
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error });
    }
  },
};

module.exports = AuthController;
