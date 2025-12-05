'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(150) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        address1 TEXT,
        address2 TEXT,
        phone_number VARCHAR(10),
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        is_deleted BOOLEAN DEFAULT FALSE,
        deleted_by INTEGER,
        deleted_at TIMESTAMP,
        is_admin BOOLEAN DEFAULT FALSE
    );
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS users;
    `);
  }
};
