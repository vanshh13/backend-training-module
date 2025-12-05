module.exports = function ({ updateUserPermission, createSuccessResponse, createErrorResponse }) {
    return async (req, res) => {
        try {
            const { userId, module_code, canCreate, canUpdate, canDelete, canView } = req.body;

            const { userPermission } = await updateUserPermission({
                userId,
                module_code,
                canCreate,
                canUpdate,
                canDelete,
                canView
            });

            return createSuccessResponse(200, userPermission, res);
        } catch (error) {
            createErrorResponse(error, res);
        }
    };
};
