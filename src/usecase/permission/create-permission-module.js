module.exports = function makeCreatePermissionModule({ permissionModuleDb, joi }) {
    return async function createPermissionModule({ module_code, name, description, created_by }) {

        const schema = joi.object({
            created_by: created_by,
            module_code: joi.string().required(),
            name: joi.string().required(),
            description: joi.string().optional()
        });

        const { error } = schema.validate({ module_code, name, description });
        if (error) throw new Error(error.message);

        const existing = await permissionModuleDb.getByCode({ module_code });
        if (existing) throw new Error("module_code already exists");

        const created = await permissionModuleDb.create({
            module_code,
            name,
            description,
            created_by
        });

        return { permissionModule: created };
    };
};
