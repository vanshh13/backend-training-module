const makePermissionModuleController = require("./permission-module.controller");

const {
    createPermissionModule,
    updatePermissionModule,
    deletePermissionModule
} = require("../../usecase/permission");

const createSuccessResponse = require("../../utils/create-success-response");
const createErrorResponse = require("../../utils/create-error-response")
const permissionModuleController = makePermissionModuleController({
    createPermissionModule,
    updatePermissionModule,
    deletePermissionModule,
    createSuccessResponse,
    createErrorResponse
});

module.exports = permissionModuleController;
