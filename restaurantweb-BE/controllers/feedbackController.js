const { Customer } = require('../models/index');
exports.sendFeedback = async (req, res) => {
  const { CustomerID, Content } = req.body;

  try {
    const customer = await Customer.findByPk(CustomerID);
    if (!customer) return res.status(404).json({ error: 'Không tìm thấy khách hàng' });

    customer.Feedback = Content;
    await customer.save();

    res.status(200).json({ message: 'Phản hồi đã được lưu' });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi khi gửi phản hồi', details: err.message });
  }
};