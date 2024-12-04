
const authUserRole = (requiredRole) => (req, res, next) => {
    if (!req.user || req.user.role !== requiredRole) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
};

export default authUserRole;
