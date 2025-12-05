const bcrypt = require("bcrypt");

module.exports = function ({
    config,
    userDb,
    userPermissionDb,
    joi,
}) {
    return async ({ username, phoneNumber, address1, address2, password, createdBy, logger }) => {

        await validateUser({ username, phoneNumber, address1 });
        console.log("usecase reached");
        // Check if user exists
        const existingUser = await userDb.getUserByUsername({ username });

        if (existingUser) {
            throw new Error("User already exists");
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await userDb.createUser({
            username,
            phoneNumber,
            password: hashedPassword,
            address1,
            address2,
            createdBy: createdBy || null,
        });

        delete user.password;
        console.log(user);

        await userPermissionDb.createUserPermission({
            userId: user.id,
            module_code: "USER_MANAGEMENT",
            canCreate: false,
            canUpdate: false,
            canDelete: false,
            canView: false
        });

        return { user };
    };

    async function validateUser({ username, phoneNumber, address1 }) {
        const schema = joi.object({
            username: joi.string().required(),
            phoneNumber: joi.string().optional(),
            address1: joi.string().required(),
        });

        return schema.validateAsync({ username, phoneNumber, address1 });
    }
};
