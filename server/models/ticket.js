'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Transaction,{foreignKey:'transactionID'})
      this.belongsTo(models.Showtime,{foreignKey:'showtimeID'})
    }
  }
  Ticket.init({
    transactionID: DataTypes.INTEGER,
    showtimeID: DataTypes.INTEGER,
    seat_number: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};