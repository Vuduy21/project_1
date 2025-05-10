const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(
  'restaurantdb',
  'root', 
  'bakugou21092004',
{
    host: 'localhost',
    port:3306, 
    dialect: 'mysql'
  }
);
sequelize.authenticate()
  .then(() => console.log('Đã kết nối MySQL với Sequelize'))
  .catch(err => console.error('Lỗi kết nối MySQL:', err));

module.exports = sequelize;