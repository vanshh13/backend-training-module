module.exports = function makeHardDeleteSoftUsers({ userDb }) {
    return async function hardDeleteSoftUsers() {

        const deletedUsers = await userDb.hardDeleteSoftDeletedUsers();
        return { deletedCount: deletedUsers.length };

    };
};
