module.exports = function ({
    softDeleteUser,
    createSuccessResponse,
    createErrorResponse
}) {
    return async (req, res) => {
        try {
            const userId = req.params.id;

            const { user } = await softDeleteUser({
                id: userId,
                deletedBy: req.user.id
            });

            return createSuccessResponse(200, user, res);
        } catch (error) {
            createErrorResponse(error, res);
        }
    };
};
