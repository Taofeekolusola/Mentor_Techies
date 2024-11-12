'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Applications', 'talentId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Talents',
        key: 'id',
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Applications', 'talentId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Talents',
        key: 'id',
      },
    });
  }
};
