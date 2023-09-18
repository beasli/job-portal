const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/config');
const Skill = require('./skill');
const UserSkill = require('./userSkill');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Hash the password before saving to the database
User.beforeCreate(async (user) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(user.password, saltRounds);
  user.password = hashedPassword;
});

// Verify user password during login
User.prototype.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

User.belongsToMany(Skill, { through: UserSkill, as: 'skills' });
Skill.belongsToMany(User, { through: UserSkill, as: 'users' });


module.exports = User;
