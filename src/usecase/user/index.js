
const allDbs = require("../../data-access");
const joi = require("joi");
const config = require("../../config");

// Import all usecases
const makeRegisterUser = require("./register-user");
const makeLoginUser = require("./login-user");
const makeGetUserById = require("./get-user-by-id");
const makeUpdatePassword = require("./update-password");
const makeUpdateProfile = require("./update-profile");
const makeSoftDeleteUser = require("./soft-delete-user");
const makeHardDeleteSoftUsers = require("./hard-delete-soft-users");

// Initialize usecases
const registerUser = makeRegisterUser({
    config,
    userDb: allDbs.userDb,
    userPermissionDb: allDbs.userPermissionDb,
    joi
});

const loginUser = makeLoginUser({
    userDb: allDbs.userDb,
    joi
});

const getUserByIdUse = makeGetUserById({
    userDb: allDbs.userDb,
    joi
});

const updatePassword = makeUpdatePassword({
    userDb: allDbs.userDb,
    joi
});

const updateProfile = makeUpdateProfile({
    config,
    userDb: allDbs.userDb,
    joi
});

const softDeleteUser = makeSoftDeleteUser({
    userDb: allDbs.userDb,
    joi
});

const hardDeleteSoftUsers = makeHardDeleteSoftUsers({
    userDb: allDbs.userDb
});

module.exports = {
    registerUser,
    loginUser,
    getUserByIdUse,
    updatePassword,
    updateProfile,
    softDeleteUser,
    hardDeleteSoftUsers
};
