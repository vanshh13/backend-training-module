module.exports = function makeUpdatePermissionModule({ permissionModuleDb, joi }) {
    return async function updatePermissionModule({ module_code, name, description }) {

        const schema = joi.object({
            module_code: joi.string().required(),
            name: joi.string().required(),
            description: joi.string().optional()
        });

        const { error } = schema.validate({ module_code, name, description });
        if (error) throw new Error(error.message);

        const updated = await permissionModuleDb.update({
            module_code,
            name,
            description
        });

        return { permissionModule: updated };
    };
};
