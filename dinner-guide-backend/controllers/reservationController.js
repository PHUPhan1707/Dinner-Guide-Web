const Reservation = require("../models/Reservation");
const Restaurant = require("../models/Restaurant");
const User = require("../models/User");

// Lấy tất cả đặt chỗ của người dùng hiện tại
exports.getMyReservations = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const reservations = await Reservation.findAll({
      where: { userId },
      include: [
        {
          model: Restaurant,
          attributes: ['id', 'name', 'address', 'imageUrl']
        }
      ],
      order: [['date', 'DESC'], ['time', 'DESC']]
    });
    
    res.json(reservations);
  } catch (error) {
    console.error("Lỗi lấy danh sách đặt chỗ:", error);
    res.status(500).json({ message: "Lỗi server!" });
  }
};

// Tạo đặt chỗ mới
exports.createReservation = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      restaurantId,
      date,
      time,
      partySize,
      specialRequests,
      contactPhone
    } = req.body;
    
    // Validate dữ liệu
    if (!restaurantId || !date || !time || !partySize) {
      return res.status(400).json({ 
        message: "Thiếu thông tin bắt buộc cho đặt chỗ!" 
      });
    }
    
    // Kiểm tra nhà hàng tồn tại và đang hoạt động
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant || !restaurant.isActive) {
      return res.status(404).json({ message: "Không tìm thấy nhà hàng!" });
    }
    
    // Tạo đặt chỗ mới
    const newReservation = await Reservation.create({
      userId,
      restaurantId,
      date,
      time,
      partySize,
      specialRequests,
      contactPhone,
      status: 'pending'
    });
    
    res.status(201).json({
      message: "Đặt chỗ thành công! Chờ nhà hàng xác nhận.",
      reservation: newReservation
    });
  } catch (error) {
    console.error("Lỗi tạo đặt chỗ:", error);
    res.status(500).json({ message: "Lỗi server!" });
  }
};

// Cập nhật đặt chỗ
exports.updateReservation = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const {
      date,
      time,
      partySize,
      specialRequests,
      contactPhone,
      status
    } = req.body;
    
    // Chỉ admin mới được cập nhật status
    const isAdmin = req.user.role === 'admin';
    
    const reservation = await Reservation.findOne({
      where: { id },
      include: [{ model: Restaurant }]
    });
    
    if (!reservation) {
      return res.status(404).json({ message: "Không tìm thấy đặt chỗ!" });
    }
    
    // Kiểm tra người dùng có quyền cập nhật không
    if (reservation.userId !== userId && !isAdmin) {
      return res.status(403).json({ 
        message: "Bạn không có quyền cập nhật đặt chỗ này!" 
      });
    }
    
    // Chỉ cho phép cập nhật nếu status là pending
    if (reservation.status !== 'pending' && !isAdmin) {
      return res.status(400).json({ 
        message: "Không thể cập nhật đặt chỗ đã được xác nhận hoặc hủy!" 
      });
    }
    
    // Cập nhật các trường
    if (date) reservation.date = date;
    if (time) reservation.time = time;
    if (partySize) reservation.partySize = partySize;
    if (specialRequests !== undefined) reservation.specialRequests = specialRequests;
    if (contactPhone) reservation.contactPhone = contactPhone;
    
    // Chỉ admin mới được cập nhật status
    if (isAdmin && status) {
      reservation.status = status;
    }
    
    await reservation.save();
    
    res.json({
      message: "Cập nhật đặt chỗ thành công!",
      reservation
    });
  } catch (error) {
    console.error("Lỗi cập nhật đặt chỗ:", error);
    res.status(500).json({ message: "Lỗi server!" });
  }
};

// Hủy đặt chỗ
exports.cancelReservation = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    
    const reservation = await Reservation.findOne({ where: { id } });
    
    if (!reservation) {
      return res.status(404).json({ message: "Không tìm thấy đặt chỗ!" });
    }
    
    // Kiểm tra người dùng có quyền hủy không
    const isAdmin = req.user.role === 'admin';
    if (reservation.userId !== userId && !isAdmin) {
      return res.status(403).json({ 
        message: "Bạn không có quyền hủy đặt chỗ này!" 
      });
    }
    
    // Chỉ cho phép hủy nếu status là pending hoặc confirmed
    if (reservation.status === 'cancelled') {
      return res.status(400).json({ message: "Đặt chỗ này đã được hủy!" });
    }
    
    reservation.status = 'cancelled';
    await reservation.save();
    
    res.json({ message: "Hủy đặt chỗ thành công!" });
  } catch (error) {
    console.error("Lỗi hủy đặt chỗ:", error);
    res.status(500).json({ message: "Lỗi server!" });
  }
};

// [ADMIN] Lấy tất cả đặt chỗ
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll({
      include: [
        {
          model: Restaurant,
          attributes: ['id', 'name']
        },
        {
          model: User,
          attributes: ['id', 'username', 'email', 'phone']
        }
      ],
      order: [['date', 'DESC'], ['time', 'DESC']]
    });
    
    res.json(reservations);
  } catch (error) {
    console.error("Lỗi lấy tất cả đặt chỗ:", error);
    res.status(500).json({ message: "Lỗi server!" });
  }
}; 