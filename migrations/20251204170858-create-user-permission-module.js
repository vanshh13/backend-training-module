'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS user_permissions (
          id SERIAL PRIMARY KEY,
          user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
          module_code VARCHAR(100) REFERENCES permission_modules(module_code) ON DELETE CASCADE,
          can_create BOOLEAN DEFAULT FALSE,
          can_update BOOLEAN DEFAULT FALSE,
          can_delete BOOLEAN DEFAULT FALSE,
          can_view BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );

      CREATE UNIQUE INDEX unique_user_module_idx
      ON user_permissions (user_id, module_code);

    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS user_permissions;
    `);
  }
};
