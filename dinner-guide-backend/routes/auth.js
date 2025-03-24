const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const router = express.Router();
const SECRET_KEY = "your_secret_key";

// Middleware xác thực token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Không tìm thấy token!" });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token không hợp lệ!" });
    }
    req.user = user;
    next();
  });
};

// Route đăng ký
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin!" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã tồn tại!" });
    }

    // Tạo user mới - password sẽ được hash tự động bởi hooks
    const newUser = await User.create({ 
      username, 
      email, 
      password 
    });

    res.status(201).json({ message: "Đăng ký thành công!" });
  } catch (error) {
    console.error("Lỗi đăng ký:", error);
    res.status(500).json({ message: "Lỗi server!" });
  }
});

// Route đăng nhập
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt - Email:", email);
    console.log("Login attempt - Password:", password);
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin!" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Email không tồn tại!" });
    }

    if (!user.password) {
      return res.status(500).json({ message: "Lỗi: Password bị null trong DB!" });
    }

    console.log("Stored hashed password:", user.password);
    
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password comparison result:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Mật khẩu không đúng!" });
    }

    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email,
        username: user.username 
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json({ 
      token, 
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    res.status(500).json({ message: "Lỗi server!" });
  }
});

// Route cập nhật và lấy thông tin người dùng (yêu cầu xác thực)
router.route("/profile")
  .get(authenticateToken, async (req, res) => {
    try {
      const user = await User.findOne({ 
        where: { email: req.user.email },
        attributes: ['id', 'username', 'email'] // Không trả về password
      });

      if (!user) {
        return res.status(404).json({ message: "Không tìm thấy người dùng!" });
      }

      res.json({ user });
    } catch (error) {
      console.error("Lỗi lấy thông tin người dùng:", error);
      res.status(500).json({ message: "Lỗi server!" });
    }
  })
  .put(authenticateToken, async (req, res) => {
    try {
      console.log("Dữ liệu nhận được từ client:", req.body);

      const { 
        username, 
        email, 
        address, 
        phone, 
        city, 
        country, 
        newPassword, 
        currentPassword 
      } = req.body;
      
      // Lấy user từ token thay vì từ email trong request body
      const user = await User.findOne({ where: { id: req.user.id } });
      if (!user) {
        return res.status(400).json({ message: "Người dùng không tồn tại!" });
      }

      // Nếu muốn đổi mật khẩu, kiểm tra mật khẩu hiện tại
      if (newPassword) {
        if (!currentPassword) {
          return res.status(400).json({ 
            message: "Vui lòng nhập mật khẩu hiện tại!" 
          });
        }

        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
          return res.status(400).json({ 
            message: "Mật khẩu hiện tại không đúng!" 
          });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
      }

      // Cập nhật các trường thông tin cơ bản
      if (username) user.username = username;
      if (email) user.email = email;
      
      // Thêm các trường mới cần cập nhật
      if (address !== undefined) user.address = address;
      if (phone !== undefined) user.phone = phone;
      if (city !== undefined) user.city = city;
      if (country !== undefined) user.country = country;

      await user.save();
      
      res.status(200).json({ 
        message: "Cập nhật thành công!", 
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          address: user.address,
          phone: user.phone,
          city: user.city,
          country: user.country
        }
      });
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      res.status(500).json({ message: "Lỗi server!" });
    }
  });

// Tạo tài khoản admin (chỉ admin hiện tại mới có quyền)
router.post("/create-admin", authenticateToken, async (req, res) => {
  try {
    // Kiểm tra người tạo có phải admin không
    const adminUser = await User.findByPk(req.user.id);
    if (!adminUser || adminUser.role !== 'admin') {
      return res.status(403).json({ 
        message: "Bạn không có quyền tạo tài khoản admin!" 
      });
    }

    const { username, email, password } = req.body;
    
    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin!" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã tồn tại!" });
    }

    // Tạo admin mới
    const newAdmin = await User.create({ 
      username, 
      email, 
      password,
      role: 'admin'
    });

    res.status(201).json({ 
      message: "Tạo tài khoản admin thành công!",
      admin: {
        id: newAdmin.id,
        username: newAdmin.username,
        email: newAdmin.email,
        role: newAdmin.role
      }
    });
  } catch (error) {
    console.error("Lỗi tạo admin:", error);
    res.status(500).json({ message: "Lỗi server!" });
  }
});

module.exports = router;
