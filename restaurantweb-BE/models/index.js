const Sequelize = require('sequelize');
const sequelize = require('../db');

// Import models
const Customer = require('./customer')(sequelize, Sequelize.DataTypes);
const Food = require('./food')(sequelize, Sequelize.DataTypes);
const Order = require('./order')(sequelize, Sequelize.DataTypes);
const OrderDetails = require('./orderdetails')(sequelize, Sequelize.DataTypes);


const applyAssociations = require('./association');
applyAssociations(Customer, Order, Food, OrderDetails);


module.exports = {
  sequelize,
  Sequelize,
  Customer,
  Food,
  Order,
  OrderDetails
};