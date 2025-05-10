const { Customer, Order, OrderDetails, sequelize } = require('../models/index'); 

exports.placeOrder = async (req, res) => {
  
  const { CustomerID, TotalAmount, CartItems  } = req.body;

  // Kiểm tra dữ liệu đầu vào
  if (!CustomerID) {
    return res.status(400).json({ error: 'Thiếu CustomerID' });
  }
  if (!CartItems || CartItems.length === 0) {
    return res.status(400).json({ error: 'Giỏ hàng không được để trống' });
  }
  if (typeof TotalAmount === 'undefined' || TotalAmount === null || TotalAmount < 0) {
    return res.status(400).json({ error: 'Tổng tiền không hợp lệ' });
  }

  // Kiểm tra từng item trong CartItems
  for (const item of CartItems) {
    if (typeof item.FoodID === 'undefined' || item.FoodID === null) {
      return res.status(400).json({ error: `Sản phẩm ${item.name || '(không tên)'} thiếu FoodID` });
    }
    if (typeof item.Quantity !== 'number' || item.Quantity <= 0) {
      return res.status(400).json({ error: `Số lượng cho sản phẩm ${item.FoodID} không hợp lệ` });
    }
    if (typeof item.Price !== 'number' || item.Price < 0) {
      return res.status(400).json({ error: `Giá cho sản phẩm ${item.FoodID} không hợp lệ` });
    }
  }
  
  const t = await sequelize.transaction();

  try {
    
    const newOrder = await Order.create({
      CustomerID,
      // OrderTime: OrderDate, // Bỏ vì OrderTime tự sinh. Nếu FE gửi OrderDate thì đổi tên field trong model
      TotalAmount, 
      NumberOfFoods: CartItems.reduce((sum, item) => sum + item.Quantity, 0), 
      Status_Order: 'Pending', 
    }, { transaction: t });

    // Duyệt từng món ăn trong giỏ hàng và thêm vào OrderDetails
    const orderDetailsPromises = CartItems.map(item => {

      return OrderDetails.create({
        OrderID: newOrder.OrderID,
        FoodID: item.FoodID,
        Quantity: item.Quantity,

        TotalPrice: item.Price * item.Quantity 
      }, { transaction: t });
    });

    await Promise.all(orderDetailsPromises);

    await t.commit();

    res.status(201).json({ message: 'Đặt hàng thành công', order: newOrder });

  } catch (err) {
    // Nếu có lỗi, rollback transaction
    await t.rollback();
    console.error("Lỗi chi tiết khi đặt hàng:", err);
    res.status(500).json({ 
        error: 'Lỗi máy chủ khi đặt hàng.', 
        details: err.message,
        ...(err.errors && { sequelizeErrors: err.errors.map(e => ({ message: e.message, type: e.type, path: e.path })) })
    });
  }
};
