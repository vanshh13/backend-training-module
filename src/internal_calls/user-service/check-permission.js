module.exports = function makeCheckPermission({ checkUserPermission }) {
    return function checkPermission({ moduleCode, action, public = false }) {
        return async (req, res, next) => {
            try {
                const sessionUser = req.session?.user;
                console.log( moduleCode ,action, public);
                // 1. PUBLIC ROUTE → IF NOT LOGGED IN ALLOW
                if (public && !sessionUser) {
                    console.log("public route");
                    return next();
                }
                console.log("continue");
                // 2. IF NOT PUBLIC AND NOT LOGGED → DENY
                if (!public && !sessionUser) {
                    return res.status(401).json({ message: "Not logged in" });
                }

                // 3. LOGGED IN USER → CHECK PERMISSION
                const userId = sessionUser.id;

                if(userId == req.params.id){
                    console.log("own object route");
                    return next();
                }
                const allowed = await checkUserPermission({
                    userId,
                    moduleCode,
                    action
                });

                if (!allowed) {
                    return res.status(403).json({ message: "Permission denied" });
                }

                next();
            } catch (err) {
                next(err);
            }
        };
    };
};
