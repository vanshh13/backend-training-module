'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE users 
      ADD COLUMN created_by INTEGER NULL REFERENCES users(id),
      ADD COLUMN is_active BOOLEAN DEFAULT TRUE;
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE users 
      DROP COLUMN created_by,
      DROP COLUMN is_active;
    `);
  }
};