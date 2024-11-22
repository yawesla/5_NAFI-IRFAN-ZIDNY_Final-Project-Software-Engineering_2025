'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Showtime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Movie,{foreignKey:'movieID'})
    }
  }
  Showtime.init({
    movieID: DataTypes.INTEGER,
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE,
    price: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Showtime',
  });
  return Showtime;
};