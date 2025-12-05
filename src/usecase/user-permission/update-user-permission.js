module.exports = function ({ userPermissionDb, joi }) {
    return async ({ userId, module_code,canCreate, canUpdate, canDelete, canView }) => {

        const schema = joi.object({
            userId: joi.number().required(),
            module_code: joi.string().required(),
            canCreate: joi.boolean().required(),
            canUpdate: joi.boolean().required(),
            canDelete: joi.boolean().required(),
            canView: joi.boolean().required()
        });

        await schema.validateAsync({ userId,module_code,canCreate, canUpdate, canDelete, canView });

        const userPermission = await userPermissionDb.updateUserPermission({
            userId,
            module_code,
            canCreate,
            canUpdate,
            canDelete,
            canView
        });

        return { userPermission };
    };
};
