const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Application = sequelize.define('Application', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  jobId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Jobs',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
    defaultValue: 'pending',
  },
}, {
  timestamps: true,
});

// Associations
Application.associate = (models) => {
  Application.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  Application.belongsTo(models.Job, { foreignKey: 'jobId', as: 'job' });
};

module.exports = { Application };