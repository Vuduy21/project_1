module.exports = (sequelize, DataTypes) => {
  const OrderDetails = sequelize.define('orderdetails', {
    OrderID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'orders',
        key: 'OrderID'
      }
    },
    FoodID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'food',
        key: 'FoodID'
      }
    },
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    TotalPrice: {
      type: DataTypes.DECIMAL(10, 2)
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });

  return OrderDetails;
};
