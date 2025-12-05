module.exports = function makeHardDeleteSoftUsersController({
    hardDeleteSoftUsers,
    createSuccessResponse,
    createErrorResponse
}) {
    return async function hardDeleteSoftUsersController(req, res) {
        try {
            const result = await hardDeleteSoftUsers();

            return createSuccessResponse(200, {
                message: "Soft deleted users permanently removed",
                deleted_count: result.deletedUsers.length,
                deletedUsers: result.deletedUsers
            }, res);

        } catch (error) {
            return createErrorResponse(error, res);
        }
    };
};
