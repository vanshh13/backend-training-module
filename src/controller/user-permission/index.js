const makeCreateUserPermissionAction = require("./create-user-permission-action");
const makeUpdateUserPermissionAction = require("./update-user-permission-action");
const { createUserPermission, updateUserPermission } = require("../../usecase/user-permission");
const { utilities } = require("eva-utilities");

const createSuccessResponse = utilities.createSuccessResponse;
const createErrorResponse = utilities.createErrorResponse;

const createUserPermissionAction = makeCreateUserPermissionAction({
    createUserPermission,
    createSuccessResponse,
    createErrorResponse
});

const updateUserPermissionAction = makeUpdateUserPermissionAction({
    updateUserPermission,
    createSuccessResponse,
    createErrorResponse
});

module.exports = {
    createUserPermissionAction,
    updateUserPermissionAction
};
