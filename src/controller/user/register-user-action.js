module.exports = function ({
    createErrorResponse,
    createSuccessResponse,
    registerUser,
}) {
    return async (req, res) => {
        const logger = req.log;
        console.log("reached controller");
        const sessionUser = req.session?.user || null;
        console.log("SESSION USER:", sessionUser);
        try {
            const { user } = await registerUser({
                username: req.body.username,
                password: req.body.password,
                address1: req.body.address1,
                address2: req.body.address2,
                phoneNumber: req.body.phone_number,
                createdBy: sessionUser?.id || null,   // optional
                logger: logger,
            });

            createSuccessResponse(201, user, res);

        } catch (err) {
            logger.error("Error in registerUserController", err);
            createErrorResponse(err, res);
        }
    };
};
