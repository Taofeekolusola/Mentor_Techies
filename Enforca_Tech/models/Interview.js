const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Interview = sequelize.define('Interview', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('scheduled', 'completed', 'canceled'),
    defaultValue: 'scheduled',
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
}, {
  timestamps: true,
});

Interview.associate = (models) => {
  Interview.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
};

module.exports = { Interview };