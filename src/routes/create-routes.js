const { healthCheck } = require('../controller');
const { userActions, userPermissionAction, permissionModuleController } = require("../controller");
const { sessionAuth, isAdmin, makeCheckPermission, ownershipCheck } = require("../internal_calls/user-service");   

const { checkUserPermission } = require("../usecase/user-permission");
const checkPermission = makeCheckPermission({ checkUserPermission });



module.exports = function({router}) {

    router.get(`/v1/user-service/health-check`, healthCheck);

    router.post(`/v1/user-service/register`,  checkPermission({ moduleCode: "USER_MANAGEMENT", action: "can_create",  public: true }), userActions.registerUserAction);

    router.post(`/v1/user-service/login`, userActions.loginUserAction);
    router.post("/v1/user-service/logout", (req, res) => {
        req.session.destroy();
        res.clearCookie("connect.sid", { path: "/" });
        res.json({ message: "Logged out" });
    });

    router.get('/v1/user-service/:id', checkPermission({ moduleCode: "USER_MANAGEMENT", action: "can_view" }), sessionAuth, userActions.getUserByIdAction);
    router.post('/v1/user-service/update-profile/:id', checkPermission({ moduleCode: "USER_MANAGEMENT", action: "can_view" }), sessionAuth, userActions.getUserByIdAction);
    router.put('/v1/user-service/update-password', checkPermission({ moduleCode: "USER_MANAGEMENT", action: "can_update" }),  sessionAuth, userActions.updatePasswordAction);
    router.put('/v1/user-service/update-profile/:id', checkPermission({ moduleCode: "USER_MANAGEMENT", action: "can_update" }), sessionAuth, userActions.updateProfileAction);
    router.delete('/v1/user-service/:id', checkPermission({ moduleCode: "USER_MANAGEMENT", action: "can_delete" }), sessionAuth, userActions.softDeleteUserAction);
    // router.delete("/v1/user-service/hard-delete-soft-users",userActions.hardDeleteSoftUsersAction);


    router.post('/v1/user-service/user-permission', sessionAuth, userPermissionAction.createUserPermissionAction);
    router.put('/v1/user-service/user-permission', sessionAuth, userPermissionAction.updateUserPermissionAction);

    router.post('/v1/user-service/permission/module', isAdmin, permissionModuleController.create);
    router.put('/v1/user-service/permission/:id', isAdmin, permissionModuleController.update);
    router.delete('/v1/user-service/permission/:id', isAdmin, permissionModuleController.delete);  
};
