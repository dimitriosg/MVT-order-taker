import User from '../models/User.js';

export const fetchOldValues = async (req, res, next) => {
    try {
        switch (true) {
            case req.method === 'PUT' && req.originalUrl.includes('/api/adm/assignRole'):
                const user = await User.findOne({ email: req.body.email });
                if (user) {
                    req.oldValues = { role: user.role };
                }
                break;

            case req.method === 'POST' && req.originalUrl.includes('/api/users/lock'):
                // Assuming you lock using email as the identifier
                const lockedUser = await User.findOne({ email: req.body.email });
                if (lockedUser) {
                    req.oldValues = { isLocked: lockedUser.isLocked }; // assuming isLocked is a field
                }
                break;

            // ... add more cases as necessary

            default:
                req.oldValues = {};
                break;
        }

        next();
    } catch (err) {
        console.error('Error fetching old values:', err);
        next(err);
    }
}
