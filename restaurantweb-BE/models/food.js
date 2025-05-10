
module.exports = (sequelize, DataTypes) => {
const Food = sequelize.define('food', {
    FoodID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    FoodName: DataTypes.STRING(100),
    Type: DataTypes.STRING(50),
    Price: DataTypes.DECIMAL(10, 2)
  }, {
    timestamps: false,
    freezeTableName: true
  });
  
  return Food;
};