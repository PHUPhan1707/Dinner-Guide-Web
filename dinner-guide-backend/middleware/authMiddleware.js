const jwt = require("jsonwebtoken");
const User = require("../models/User");
const SECRET_KEY = "your_secret_key";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Không tìm thấy token!" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token không hợp lệ!" });
    }
    req.user = decoded;
    next();
  });
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ 
        message: "Bạn không có quyền thực hiện hành động này!" 
      });
    }
    
    next();
  } catch (error) {
    console.error("Lỗi kiểm tra quyền admin:", error);
    res.status(500).json({ message: "Lỗi server!" });
  }
};

module.exports = { authenticateToken, isAdmin }; 