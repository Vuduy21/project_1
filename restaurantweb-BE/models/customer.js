
module.exports = (sequelize, DataTypes) => {
const Customer = sequelize.define('customer', {
  CustomerID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  CustomerName: DataTypes.STRING(100),
  Password_customer: DataTypes.STRING(255),
  Phone_customer: DataTypes.STRING(20),
  Email_customer: DataTypes.STRING(100),
  LoyaltyPoints: DataTypes.INTEGER,
  Feedback: DataTypes.TEXT
}, {
  timestamps: false,
  freezeTableName: true
});

return Customer;
};