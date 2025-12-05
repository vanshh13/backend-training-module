module.exports = function sessionAuth(req, res, next) {
    if (!req.session || !req.session.user) {
        return res.status(401).json({ message: "Not logged in" });
    }
    req.user = req.session.user;
    if(!req.user.is_admin){
        return res.status(403).json({message: "Admin access only" });
    }
    next();
};
