module.exports = function ({ userDb, joi }) {
    return async ({ id, address1, address2, phoneNumber }) => {
        await joi.object({
            id: joi.number().required(),
            address1: joi.string().optional(),
            address2: joi.string().optional(),
            phoneNumber: joi.string().optional()
        }).validateAsync({ id, address1, address2, phoneNumber });

        const user = await userDb.updateProfile({
            id,
            address1,
            address2,
            phoneNumber
        });

        delete user.password;
        return { user };
    };
};
