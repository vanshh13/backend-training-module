module.exports = function makeCheckUserPermission({ userPermissionDb }) {
    return async function checkUserPermission({ userId, moduleCode, action }) {

        const permission = await userPermissionDb.getUserPermission({
            userId,
            moduleCode
        });

        if (!permission) return false;

        const actionFlag = {
            can_create: permission.can_create,
            can_update: permission.can_update,
            can_delete: permission.can_delete,
            can_view: permission.can_view
        };

        return actionFlag[action] === true;
    };
};
