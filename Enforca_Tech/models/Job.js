const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Job = sequelize.define('Job', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
}, {
  timestamps: true,
});

// Associations
Job.associate = (models) => {
  Job.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
};

module.exports = { Job };