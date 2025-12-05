const TABLE_NAME = "user_permissions";

module.exports = function ({ postgresDb }) {

    async function createUserPermission({ userId, module_code, canCreate, canUpdate, canDelete, canView }) {
        const result = await postgresDb.query(
            `INSERT INTO ${TABLE_NAME} 
            (user_id, module_code, can_create, can_update, can_delete, can_view, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
            RETURNING *`,
            [userId, module_code, canCreate, canUpdate, canDelete, canView]
        );
        return result.rows[0];
    }

    async function updateUserPermission({ userId, module_code, canCreate, canUpdate, canDelete, canView }) {
        const result = await postgresDb.query(
            `UPDATE ${TABLE_NAME}
             SET can_create=$1, can_update=$2, can_delete=$3, can_view=$4, updated_at=NOW()
             WHERE user_id=$5 AND module_code=$6 RETURNING *`,
            [canCreate, canUpdate, canDelete, canView, userId, module_code]
        );
        return result.rows[0];
    }

    async function getUserPermissionById({ id }) {
        const result = await postgresDb.query(
            `SELECT * FROM ${TABLE_NAME} WHERE id=$1`,
            [id]
        );
        return result.rows[0];
    }
    async function getUserPermission({ userId, moduleCode }) {
        const query = `
            SELECT * FROM ${TABLE_NAME}
            WHERE user_id = $1 AND module_code = $2
        `;
        const values = [userId, moduleCode];

        const result = await postgresDb.query(query, values);
        return result.rows[0];
    }
    return Object.freeze({
        createUserPermission,
        updateUserPermission,
        getUserPermissionById,
        getUserPermission
    });
};
