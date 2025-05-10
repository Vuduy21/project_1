module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define('orders', {
    OrderID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    OrderTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW // ✅ Tự sinh ngày giờ hiện tại
    },
    Status_Order: {
      type: DataTypes.ENUM('Pending', 'Confirmed', 'Completed', 'Cancelled'),
      defaultValue: 'Pending'
    },
    TotalAmount: DataTypes.DECIMAL(10, 2),
    NumberOfFoods: DataTypes.INTEGER,
    TableID: DataTypes.INTEGER,
    EmployeeID: DataTypes.INTEGER,
    CustomerID: DataTypes.INTEGER
  }, {
    timestamps: false,
    freezeTableName: true
  });

  return Orders;
}; 