const allDbs = require("../../data-access");
const joi = require("joi");

const makeCreateUserPermission = require("./create-user-permission");
const makeUpdateUserPermission = require("./update-user-permission");
const makeCheckPermission = require("./check-user-permission");
const userPermissionDb = allDbs.userPermissionDb;

const createUserPermission = makeCreateUserPermission({
    userPermissionDb,
    joi
});

const updateUserPermission = makeUpdateUserPermission({
    userPermissionDb,
    joi
});

const checkUserPermission = makeCheckPermission({
    userPermissionDb,
})
module.exports = {
    createUserPermission,
    updateUserPermission,
    checkUserPermission
};
