
const makeRegisterUserAction = require('./register-user-action');
const makeLoginUserAction = require('./login-user-action');
const makeGetUserByIdAction = require('./get-user-by-id-action');
const makeUpdatePasswordAction = require('./update-password-action');
const makeUpdateProfileAction = require('./update-profile-action');
const makeSoftDeleteUserAction = require('./soft-delete-user-action');
const makeHardDeleteSoftUsersController  = require('./hard-delete-soft-users-action');

const { registerUser, loginUser, getUserByIdUse,updatePassword, updateProfile, softDeleteUser, hardDeleteSoftUsers} = require('../../usecase/user');

const { utilities } = require('eva-utilities');
const createSuccessResponse = utilities.createSuccessResponse;
const createErrorResponse = utilities.createErrorResponse;

// Actions

const registerUserAction = makeRegisterUserAction({
    createSuccessResponse,
    createErrorResponse,
    registerUser
});

const loginUserAction = makeLoginUserAction({
    createSuccessResponse,
    createErrorResponse,
    loginUser
});

const getUserByIdAction = makeGetUserByIdAction({
    createSuccessResponse,
    createErrorResponse,
    getUserByIdUse
});

const updatePasswordAction = makeUpdatePasswordAction({
    createSuccessResponse,
    createErrorResponse,
    updatePassword
});

const updateProfileAction = makeUpdateProfileAction({
    createSuccessResponse,
    createErrorResponse,
    updateProfile
});

const softDeleteUserAction = makeSoftDeleteUserAction({
    createSuccessResponse,
    createErrorResponse,
    softDeleteUser
});


const hardDeleteSoftUsersAction = makeHardDeleteSoftUsersController({
    hardDeleteSoftUsers,
    createSuccessResponse,
    createErrorResponse
});

module.exports = {
    registerUserAction,
    loginUserAction,
    getUserByIdAction,
    updatePasswordAction,
    updateProfileAction,
    softDeleteUserAction,
    hardDeleteSoftUsersAction,
};
