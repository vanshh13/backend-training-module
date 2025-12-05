const bcrypt = require("bcrypt");

module.exports = function ({ userDb, joi }) {
    return async ({ username, password }) => {

        const schema = joi.object({
            username: joi.string().required(),
            password: joi.string().required()
        });

        await schema.validateAsync({ username, password });

        const user = await userDb.getUserByUsername({ username });

        if (!user) {
            throw new Error("Invalid username or password");
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw new Error("Invalid username or password");
        }

        delete user.password;
        return { user };
    };
};
