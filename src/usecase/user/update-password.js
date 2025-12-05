const bcrypt = require("bcrypt");

module.exports = function ({ userDb, joi }) {
    return async ({ userId, oldPassword, newPassword }) => {

        const schema = joi.object({
            userId: joi.number().required(),
            oldPassword: joi.string().required(),
            newPassword: joi.string().required(),
        });

        await schema.validateAsync({ userId, oldPassword, newPassword });

        const user = await userDb.getUserById({ id: userId });
        if (!user) throw new Error("User not found");

        const match = await bcrypt.compare(oldPassword, user.password);
        if (!match) throw new Error("Old password incorrect");

        const hashed = await bcrypt.hash(newPassword, 10);

        const updatedUser = await userDb.updatePassword({
            id: userId,
            password: hashed
        });

        delete updatedUser.password;
        return { user: updatedUser };
    };
};
