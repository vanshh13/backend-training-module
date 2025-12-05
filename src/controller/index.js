const createSuccessResponse = require('../utils/create-success-response');
const makeHeathCheck = require('./makeHealthCheck');

const healthCheck = makeHeathCheck({
  createSuccessResponse: createSuccessResponse,
});
const makeMessage = require('./message');
const message = makeMessage({
  createSuccessResponse: createSuccessResponse,
});

module.exports = {
    healthCheck,
    message,
    userActions: require('./user'),
    userPermissionAction: require('./user-permission'),
    permissionModuleController: require('./permission'),
}