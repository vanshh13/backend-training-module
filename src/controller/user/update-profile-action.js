module.exports = function ({
    updateProfile,
    createSuccessResponse,
    createErrorResponse
}) {
    return async (req, res) => {
        try {
            const { address1, address2, phoneNumber } = req.body;
            const userId = req.params.id;
            const { user } = await updateProfile({
                id: userId,
                address1,
                address2,
                phoneNumber
            });

            return createSuccessResponse(200, user, res);
        } catch (error) {
            createErrorResponse(error, res);
        }
    };
};
