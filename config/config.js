const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('job_portal', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
