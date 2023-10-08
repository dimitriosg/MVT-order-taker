// funcSOS.js
import User from '../models/User.js';

export const deleteAllUsers = async (req, res) => {
  console.log(`CONSOLE: Entered deleteAllUsers function`);
  console.log(`CONSOLE: req.user:`, req.user);
  console.log(`CONSOLE: req.user.role:`, req.user.role);
  try {
    // Check if the user is authenticated and has a developer role
    if (req.user && req.user.role === 'developer') {
      // Delete all users except for the one who made the request
      await User.deleteMany({ _id: { $ne: req.user.id } });

      console.log('All users have been deleted, except you.');
      return res.status(200).json({ message: 'All users have been deleted except for the requester.' });
    } else {
      return res.status(401).json({ message: '401 Unauthorized.' });
    }
  } catch (error) {
    console.error('Error deleting all users:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const repairDatabase = () => {
    // Code to repair database inconsistencies
};
  
export const emergencyUnlockAccounts = () => {
  // Code to unlock all user accounts
};

export const runDebugTools = (req, res, next) => {
  // Code to run debugging tools
  console.log(`CONSOLE: Entering runDebugTools`);

  return res.status(200).json({ message: 'runDebugTools called successfully' });
};
