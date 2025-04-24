const jwt = require("jsonwebtoken");
const User = require("../models/User");
const SECRET_KEY = process.env.JWT_SECRET || "dinner-guide-secret-key-2024";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Token not found!" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token!" });
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
        message: "You don't have permission to perform this action!" 
      });
    }
    
    next();
  } catch (error) {
    console.error("Error checking admin rights:", error);
    res.status(500).json({ message: "Server error!" });
  }
};

module.exports = { authenticateToken, isAdmin }; 