'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tb_projects.init({
    start_date: DataTypes.TIME,
    end_date: DataTypes.TIME,
    description: DataTypes.STRING,
    technologies: DataTypes.STRING,
    image: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tb_projects',
  });
  return tb_projects;
};