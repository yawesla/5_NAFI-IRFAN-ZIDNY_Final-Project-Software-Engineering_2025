'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User,{foreignKey:'userID'})
    }
  }
  Transaction.init({
    userID: DataTypes.INTEGER,
    total_amount: DataTypes.DECIMAL,
    quantity: DataTypes.INTEGER,
    status: DataTypes.STRING,
    payment_method: DataTypes.STRING,
    payment_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};