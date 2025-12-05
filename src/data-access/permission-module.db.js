module.exports = function makePermissionModuleDb({ postgresDb }) {

    return Object.freeze({

        create: async ({ created_by, module_code, name, description }) => {
            const result = await postgresDb.query(
                `INSERT INTO permission_modules 
                    (module_code, name, module_description, created_by, created_at)
                 VALUES ($1, $2, $3, $4, NOW())
                 RETURNING *`,
                [module_code, name, description, created_by]
            );
            return result.rows[0];
        },

        update: async ({ module_code, name, description }) => {
            const result = await postgresDb.query(
                `UPDATE permission_modules 
                 SET name=$1, module_description=$2
                 WHERE module_code=$3
                 RETURNING *`,
                [name, description, module_code]
            );
            return result.rows[0];
        },

        delete: async ({ module_code }) => {
            await postgresDb.query(
                `UPDATE permission_modules
                 SET is_active = FALSE
                 WHERE module_code=$1`,
                [module_code]
            );
            return { success: true };
        },

        getByCode: async ({ module_code }) => {
            const result = await postgresDb.query(
                `SELECT * FROM permission_modules 
                 WHERE module_code=$1`,
                [module_code]
            );
            return result.rows[0];
        }
    });

};
