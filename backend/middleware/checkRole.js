// auth/checkRole.js
export const checkRole = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Authentication is required.' });
        }

        // Check if the user's role is included in the allowed roles
        if (roles.includes(req.user.role)) {
            next();
        } else {
            return res.status(403).json({ message: 'Check Role: Access denied.' });
        }
    };
};
