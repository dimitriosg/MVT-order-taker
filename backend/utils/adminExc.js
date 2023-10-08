// backend/utils/adminExc.js
import User from '../models/User.js';
import UserActivityLog from '../models/UserActivityLog.js';

// >>>> HELPER FUNCTIONS <<<<<
/////////////////////////
// Function to get ALL WAITERS
export const getAllWaiters = async (req, res) => {
    console.log(`CONSOLE: Entered getAllWaiters function`);
    res.send('SEND: getAllWaiters function running');
    try{
      const users = await User.find({ role: 'WAITER' });
      res.status(200).json(users);
    }catch(error){
      res.status(400).json({message: 'Error fetching waiters', error });
    }
  };
  
  // Function to get ALL CASHEIRS
  export const getAllCashiers = async (req, res) => {
    console.log(`CONSOLE: Entered getAllCashiers function`);
    res.send('SEND: getAllCashiers function running');
    try{
      const users = await User.find({ role: 'CASHIER' });
      res.status(200).json(users);
    }catch(error){
      res.status(400).json({message: 'Error fetching cashiers', error });
    }
  };
  
  // Function to get ALL ACCOUNTANTS
  export const getAllAccountants = async (req, res) => {
    console.log(`CONSOLE: Entered getAllAccountants function`);
    res.send('SEND: getAllAccountants function running');
    try{
      const users = await User.find({ role: 'ACCOUNTANT' });
      res.status(200).json(users);
    }catch(error){
      res.status(400).json({message: 'Error fetching cashiers', error });
    }
  };
  
  // Function to get ALL ADMINS
  export const getAllAdmins = async (req, res) => {
    console.log(`CONSOLE: Entered getAllAdmins function`);
    res.send('SEND: getAllAdmins function running');
    try{
      const users = await User.find({ role: 'ADMIN' });
      res.status(200).json(users);
    }catch(error){
      res.status(400).json({message: 'Error fetching admins', error });
    }
  };
/////////////////////////  

// Function to assign a role to a user
export const assignRole = async (req, res) => {
    try {
        const { email, role } = req.body;

        // If user is not authenticated or does not have 'admin' or 'developer' role
        if (!req.user || !['admin', 'developer'].includes(req.user.role)) {
            console.log("Sending 403 - Unauthorized user");
            return res.status(403).json({ message: 'Unauthorized user. Must have rights' });
        }

        // RULE: only a developer can assign the developer role
        if (role === 'developer' && req.user.role !== 'developer') {
            return res.status(403).json({ message: 'Only a developer can assign the developer role.' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        user.role = role;
        await user.save();

        return res.status(200).json({ message: `Role ${role} assigned successfully to ${email}.` });

    } catch (error) {
        res.status(500).json({ message: 'Error assigning role.', error: error.message });
    }
};

// Function to LOG user activity
export const logUserActivity = async (userId, activity, details) => {
    try {
        const log = new UserActivity({
            userId,
            activity,
            details,
            timestamp: new Date()
        });

        await log.save();
    } catch (error) {
        console.error('Failed to log user activity:', error);
    }
};

  // Function to GET user activity history
  export const getActivityHistory = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const logs = await UserActivityLog.find({ userId }).sort('-timestamp');
      
      res.status(200).json(logs);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving activity history.', error: error.message });
    }
  };