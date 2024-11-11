const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true  // This will auto-increment the integer ID
  },
  name: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  password: DataTypes.STRING,
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  role: {
    type: DataTypes.ENUM('user', 'admin'),
    defaultValue: 'user'
  },
}, {
  hooks: {
    beforeCreate: async (user) => {
      user.password = await bcrypt.hash(user.password, 10);
    },
  },
  timestamps: true,
});

// Associations
User.associate = (models) => {
  User.hasMany(models.Application, { foreignKey: 'userId' });
  User.hasMany(models.Job, { foreignKey: 'userId' });
  User.hasMany(models.Talent, { foreignKey: 'userId' });
};

module.exports = { User };