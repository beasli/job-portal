const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const UserSkill = sequelize.define('UserSkill', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
});

module.exports = UserSkill;
