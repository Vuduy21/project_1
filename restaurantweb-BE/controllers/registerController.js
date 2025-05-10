const { Customer } = require('../models');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  const { CustomerName, Password_customer, Phone_customer, Email_customer } = req.body;

  try {
    // Kiểm tra người dùng đã tồn tại
    const existingUser = await Customer.findOne({ where: { Phone_customer } });
    if (existingUser) {
      return res.status(400).json({ message: 'Số điện thoại đã được đăng ký' });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(Password_customer, 10);

    // Tạo người dùng mới
    const newCustomer = await Customer.create({
      CustomerName,
      Password_customer: hashedPassword,
      Phone_customer,
      Email_customer,
      LoyaltyPoints: 0
    });

    return res.status(201).json({ message: 'Đăng ký thành công', customer: newCustomer });
  } catch (error) {
    return res.status(500).json({ message: 'Đăng ký thất bại', error: error.message });
  }
};