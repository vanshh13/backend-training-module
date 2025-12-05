module.exports = function ({
    createPermissionModule,
    updatePermissionModule,
    deletePermissionModule,
    createSuccessResponse,
    createErrorResponse
}) {

    return Object.freeze({

        create: async (req, res) => {
            try {
                const { module_code, name, description } = req.body;
                const created_by = req.user.id;
                const result = await createPermissionModule({
                    module_code,
                    name,
                    description,
                    created_by
                });

                return createSuccessResponse(201, result.permissionModule, res);

            } catch (error) {
                return createErrorResponse(error, res);
            }
        },

        update: async (req, res) => {
            try {
                const module_code = req.params.id;
                
                const { name, description } = req.body;

                const result = await updatePermissionModule({
                    module_code,
                    name,
                    description
                });

                return createSuccessResponse(200, result.permissionModule, res);

            } catch (error) {
                return createErrorResponse(error, res);
            }
        },

        delete: async (req, res) => {
            try {
                const module_code = req.params.id;

                await deletePermissionModule({ module_code });

                return createSuccessResponse(200, { message: "Module deleted" }, res);

            } catch (error) {
                return createErrorResponse(error, res);
            }
        }
    });
};
