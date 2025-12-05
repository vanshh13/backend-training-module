module.exports = function makeDeletePermissionModule({ permissionModuleDb }) {
    return async function deletePermissionModule({ module_code }) {

        await permissionModuleDb.delete({ module_code });

        return { success: true };
    };
};
