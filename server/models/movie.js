'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Showtime,{foreignKey:'movieID'})
    }
  }
  Movie.init({
    title: DataTypes.STRING,
    image_link: DataTypes.STRING,
    synopsis: DataTypes.TEXT,
    director: DataTypes.STRING,
    genre: DataTypes.STRING,
    release_date: DataTypes.DATE,
    duration: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};