'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Applications', 'talentId');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('Applications', 'talentId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Talents',
        key: 'id',
      },
    });
  }
};
