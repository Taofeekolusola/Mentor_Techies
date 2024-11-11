'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Applications', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true  // This will auto-increment the integer ID
      },
      status: {
        type: Sequelize.ENUM('active', 'pending', 'rejected', 'accepted'), 
        allowNull: false,  
      },
      jobId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Jobs', 
          key: 'id'
        },
        onDelete: 'CASCADE', 
      },
      talentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Talents',  
          key: 'id'
        },
        onDelete: 'CASCADE', 
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
    await queryInterface.dropTable('Applications');
  }
}