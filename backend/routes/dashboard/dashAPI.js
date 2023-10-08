// File: /backend/routes/dashboard/dashAPI.js

import express from 'express';
import dashboardController from '../../controllers/dashboard.controller.js';

const router = express.Router();

// --> ALL PURPOSE ROUTES <--
// Route for fetching dashboard data
router.get('/data', dashboardController.fetchDashboardData);

// <<< WAITER ROUTES >>>

// <<< CASHIER ROUTES >>>
router.get('/cashier/details', dashboardController.cashier.fetchCashierDetails);
router.post('/cashier/update-cash-holding', dashboardController.cashier.updateCashHolding);
router.post('/cashier/notify-accountant', dashboardController.cashier.notifyAccountant);

// <<< ACCOUNTANT ROUTES >>>
// Route for fetching accountant details
router.get('/acc/details', dashboardController.accountant.fetchAccountantDetails);


// <<< ADMIN ROUTES >>>

// <<< DEVELOPER ROUTES >>>


export default router;
