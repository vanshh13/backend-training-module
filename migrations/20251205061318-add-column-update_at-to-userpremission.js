'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE user_permissions
      ADD COLUMN updated_at TIMESTAMP DEFAULT NOW();
    `);

  },

  async down (queryInterface, Sequelize) {
        await queryInterface.sequelize.query(`
      ALTER TABLE user_permissions 
      DROP COLUMN updated_at;
    `);
  }
};
