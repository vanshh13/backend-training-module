module.exports = function ({ createUserPermission, createSuccessResponse, createErrorResponse }) {
    return async (req, res) => {
        try {
            const { userId, module_code, canCreate, canUpdate, canDelete, canView } = req.body;

            const { userPermission } = await createUserPermission({
                userId,
                module_code,
                canCreate,
                canUpdate,
                canDelete,
                canView
            });

            return createSuccessResponse(201, userPermission, res);
        } catch (error) {
            createErrorResponse(error, res);
        }
    };
};
