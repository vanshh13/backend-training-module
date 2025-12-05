module.exports = function ({ userDb, joi }) {
    return async ({ id }) => {
        const schema = joi.object({
            id: joi.number().required()
        });

        await schema.validateAsync({ id });

        const user = await userDb.getUserById({ id });
        if (!user) throw new Error("User not found");

        delete user.password;
        return { user };
    };
};
