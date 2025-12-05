module.exports = function sessionAuth(req, res, next) {
    if (!req.session || !req.session.user) {
        return res.status(401).json({ message: "Not logged in" });
    }
    req.user = req.session.user;
    next();
};
