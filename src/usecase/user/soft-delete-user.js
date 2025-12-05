module.exports = function ({ userDb, joi }) {
    return async ({ id, deletedBy }) => {

        const schema = joi.object({
            id: joi.number().required(),
            deletedBy: joi.number().required()
        });

        await schema.validateAsync({ id, deletedBy });

        const user = await userDb.softDeleteUser({ id, deletedBy });

        return { user };
    };
};
