const { Customer} = require('../models/index');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    const { Phone_customer, Password } = req.body;
    console.log("Thông tin đăng nhập nhận được:", req.body);

    try {
        const customer = await Customer.findOne({ where: { Phone_customer } });

        if (!customer) {
            console.log("Không tìm thấy người dùng");
            return res.status(404).json({ error: 'Không tìm thấy người dùng' });
        }

        const match = await bcrypt.compare(Password, customer.Password_customer);

        if (!match) {
            console.log("Sai mật khẩu");
            return res.status(401).json({ error: 'Sai mật khẩu' });
        }

        res.status(200).json({ message: 'Đăng nhập thành công', customer });
    } catch (err) {
        console.error("Lỗi trong quá trình đăng nhập:", err);
        res.status(500).json({ error: 'Lỗi đăng nhập', details: err.message });
    }
};