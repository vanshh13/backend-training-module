const allDbs = require("../../data-access");
const joi = require("joi");

const makeCreatePermissionModule = require("./create-permission-module");
const makeUpdatePermissionModule = require("./update-permission-module");
const makeDeletePermissionModule = require("./delete-permission-module");

const createPermissionModule = makeCreatePermissionModule({
    permissionModuleDb: allDbs.permissionModuleDb,
    joi
});

const updatePermissionModule = makeUpdatePermissionModule({
    permissionModuleDb: allDbs.permissionModuleDb,
    joi
});

const deletePermissionModule = makeDeletePermissionModule({
    permissionModuleDb: allDbs.permissionModuleDb,
    joi
});

module.exports = {
    createPermissionModule,
    updatePermissionModule,
    deletePermissionModule
};
