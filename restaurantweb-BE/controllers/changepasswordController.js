const { Customer } = require('../models/index');  
const bcrypt = require('bcrypt');

exports.changePassword = async (req, res) => {
  const { phone, oldPassword, newPassword } = req.body;

  try {
    const customer = await Customer.findOne({ where: { Phone_customer: phone } });

    if (!customer) {
      return res.status(404).json({ message: 'Khách hàng không tồn tại' });
    }

    const match = await bcrypt.compare(oldPassword, customer.Password_customer);
    if (!match) {
      return res.status(400).json({ message: 'Mật khẩu cũ không đúng' });
    }

    // Băm mật khẩu mới trước khi lưu
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    customer.Password_customer = hashedPassword;
    await customer.save();

    res.json({ message: 'Đổi mật khẩu thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi đổi mật khẩu', error: error.message });
  }
};
