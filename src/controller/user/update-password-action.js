module.exports = function ({
    updatePassword,
    createSuccessResponse,
    createErrorResponse
}) {
    return async (req, res) => {
        try {
            const { oldPassword, newPassword } = req.body;

            const { user } = await updatePassword({
                userId: req.user.id,
                oldPassword,
                newPassword
            });

            return createSuccessResponse(200, user, res);
        } catch (error) {
            createErrorResponse(error, res);
        }
    };
};
