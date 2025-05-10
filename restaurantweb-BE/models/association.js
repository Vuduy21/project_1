module.exports = (Customer, Order, Food, OrderDetails) => {
    Order.belongsTo(Customer, { foreignKey: 'CustomerID' });
    Customer.hasMany(Order, { foreignKey: 'CustomerID' });
  
    OrderDetails.belongsTo(Order, { foreignKey: 'OrderID' });
    Order.hasMany(OrderDetails, { foreignKey: 'OrderID' });
  
    OrderDetails.belongsTo(Food, { foreignKey: 'FoodID' });
    Food.hasMany(OrderDetails, { foreignKey: 'FoodID' });
  };