const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'in-progress', 'completed'),
    defaultValue: 'pending'
  },
  priority: {
    type: DataTypes.ENUM('low', 'medium', 'high'),
    defaultValue: 'medium'
  },
  userId: { 
    type: DataTypes.INTEGER, 
    references: { 
      model: 'Users', 
      key: 'id' 
    }, 
    onDelete: 'CASCADE' 
  }
}, {
  timestamps: true,
});

Task.associate = (models) => {
  Task.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
};

module.exports = { Task };