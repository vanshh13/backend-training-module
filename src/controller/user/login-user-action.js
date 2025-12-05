module.exports = function ({
    createErrorResponse,
    createSuccessResponse,
    loginUser
}) {
    return async (req, res) => {
        try {
            const { user } = await loginUser({
                username: req.body.username,
                password: req.body.password,
            });

            // Save user in session
            req.session.user = {
                id: user.id,
                username: user.username,
                is_admin: user.is_admin
            };

            return createSuccessResponse(200, user, res);
        } catch (error) {
            console.log(error);
            createErrorResponse(error, res);
        }
    };
};
