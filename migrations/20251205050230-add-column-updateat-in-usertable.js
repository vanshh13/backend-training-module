'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE users 
          ADD COLUMN updated_at TIMESTAMP
    `);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE users 
      DROP COLUMN updated_at;
    `);
  }
};
