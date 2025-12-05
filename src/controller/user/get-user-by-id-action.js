module.exports = function ({
    createSuccessResponse,
    createErrorResponse,
    getUserByIdUse
}) {
    return async (req, res) => {
        try {
            const userId = req.params.id;
            const { user } = await getUserByIdUse({ id: userId });

            return createSuccessResponse(200, user, res);
        } catch (error) {
            createErrorResponse(error, res);
        }
    };
};
