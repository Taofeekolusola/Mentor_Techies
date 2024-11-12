const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Talent = sequelize.define('Talent', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    primaryKey: true,
    autoIncrement: true
  },
 name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        len: [2, 50]
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
    expertise: { 
      type: DataTypes.ENUM('Product Designer', 'Software Developer', 'Data Scientist', 'UX/UI Designer') 
  }
}, {
  timestamps: true
})
 

Talent.associate = (models) => {
  Talent.belongsTo(models.User, { foreignKey: 'userId', as: 'talent' });
};

module.exports = { Talent };