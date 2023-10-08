// dashboard.controller.js
import { config } from 'dotenv';
import User from '../models/User.js';
import Order from '../models/Order.js';

config();

const dashboardController = {

  fetchDashboardData: async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      switch (user.role) {
          case 'Developer':
              return dashboardController.developer.fetchDeveloperDashboard(req, res, user);
          case 'Admin':
              return dashboardController.admin.fetchAdminDashboard(req, res, user);
          case 'Accountant':
              return dashboardController.accountant.fetchAccountantDashboard(req, res, user);
          case 'Cashier':
              return dashboardController.cashier.fetchCashierDashboard(req, res, user);
          case 'Waiter':
              return dashboardController.waiter.fetchWaiterDashboard(req, res, user);
          default:
              return res.status(400).json({ message: 'Invalid role' });
      }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
  },

  developer: {
    fetchDeveloperDashboard: async (req, res, user) => {
      // ...
    }
    // ... other developer-specific functions
  },

  admin: {
    fetchAdminDashboard: async (req, res, user) => {
      // ...
    }
    // ... other admin-specific functions
  },

  accountant: {
    fetchAccountantDashboard: async (req, res, user) => {
      // ...
    },
    fetchAccountantDetails: async (req, res) => {
      // Your logic to fetch cashier details
      // ...
    }
    // ... other accountant-specific functions
  },

  cashier: {
    fetchCashierDashboard: async (req, res, user) => {
      const orders = await Order.find({ cashierId: user._id });
      // ... Fetch or calculate other necessary data for Cashier Dashboard
      res.status(200).json({ orders /*, other Cashier Dashboard Data */ });
    },
    fetchCashierDetails: async (req, res) => {
      // Your logic to fetch cashier details
      // ...
    },
    updateCashHolding: async (req, res) => {
      // Your logic to update cash holding
      // ...
    },
    notifyAccountant: async (req, res) => {
      // Your logic to notify the accountant
      // ...
    }
    // ... other cashier-specific functions
  },

  waiter: {
    fetchWaiterDashboard: async (req, res, user) => {
      // ...
    }
    // ... other waiter-specific functions
  }

};

export default dashboardController;
