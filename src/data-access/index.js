const config = require("../config");
const PostgresDb = require("../utils/lib/postgres");

// CREATE INSTANCE
const postgresDb = new PostgresDb({
  host: config.postgres.host,
  user: config.postgres.user,
  password: config.postgres.password,
  database: config.postgres.database,
  port: config.postgres.port,
});

const makeUserDb = require("./user-db");
const userDb = makeUserDb({ postgresDb });

const makePermissionDb = require('./permission-module.db');
const permissionModuleDb = makePermissionDb({ postgresDb });

const makeUserPermission = require("./user-permission-db");
const userPermissionDb = makeUserPermission({ postgresDb });
module.exports = {
  userDb,
  permissionModuleDb,
  userPermissionDb,
};
