'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Talents', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true  // This will auto-increment the integer ID
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false, 
      },
      expertise: {
        type: Sequelize.ENUM('Product Designer', 'Software Developer', 'Data Scientist', 'UX/UI Designer'),  // Add expertise values
        allowNull: false, 
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),  
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), 
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Talents');
  }
};