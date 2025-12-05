'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE permission_modules 
          ADD COLUMN name VARCHAR(150)
    `);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE permission_modules 
      DROP COLUMN name;
    `);
  }
};
